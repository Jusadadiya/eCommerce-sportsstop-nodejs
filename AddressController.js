const db = require("./db.js");
const mongoist = require('mongoist');

//ADDRESS POST ADD ADDRESS
module.exports.add = async function (request, response) {
    try {
        let status = false;
        let message = "";
        let user = await db.conn.Users.findOne({ _id: mongoist.ObjectId(request.session.user) });
        let newAddress = request.body;

        //validation
        if (newAddress.hasOwnProperty('address1') && !isEmpty(newAddress.address1) &&
            newAddress.hasOwnProperty('postal') && !isEmpty(newAddress.postal) &&
            newAddress.hasOwnProperty('city') && !isEmpty(newAddress.city) &&
            newAddress.hasOwnProperty('province') && !isEmpty(newAddress.province) &&
            newAddress.hasOwnProperty('country') && !isEmpty(newAddress.country)) {
            if (user) {
                var address = {
                    id: newAddress.id,
                    address1: newAddress.address1,
                    address2: isEmpty(newAddress.address2) ? "" : newAddress.address2,
                    postal: newAddress.postal,
                    city: newAddress.city,
                    province: newAddress.province,
                    country: newAddress.country
                };
                user.addresses.push(address);
                await db.conn.Users.save(user);
                status = true;
                message = "Added successfully";
            } else {
                status = false;
                message = "User not found";
            }
        } else {
            status = false;
            message = "Insuffient amount of data provided.";
        }
        response.json({ status: status, message: message });
    } catch (e) {
        response.json({ status: false, message: e.message });
    }
};

//ADDRESS DELETE ADDRESS
module.exports.delete = async function (request, response) {
    try {
        let status = false;
        let message = "";
        let user = await db.conn.Users.findOne({ _id: mongoist.ObjectId(request.session.user) });

        if (user && request.params.id) {
            var filteredAddresses = user.addresses.filter(a => a.id !== parseInt(request.params.id));
            if (user.addresses.length > filteredAddresses.length) {
                user.addresses = filteredAddresses;
                await db.conn.Users.save(user);
                status = true;
                message = "Deleted successfully";
            } else {
                status = false;
                message = "Invalid address ID";
            }
        } else {
            status = false;
            message = "User or Address ID not found";
        }
        response.json({ status: status, message: message });
    } catch (e) {
        response.json({ status: false, message: e.message });
    }
};

//ADDRESS - PUT ADDRESS UPDATE
module.exports.update = async function (request, response) {
    try {
        let status = false;
        let message = "";
        let user = await db.conn.Users.findOne({ _id: mongoist.ObjectId(request.session.user) });
        let newAddress = request.body;

        if (newAddress.hasOwnProperty('address1') && !isEmpty(newAddress.address1) &&
            newAddress.hasOwnProperty('postal') && !isEmpty(newAddress.postal) &&
            newAddress.hasOwnProperty('city') && !isEmpty(newAddress.city) &&
            newAddress.hasOwnProperty('province') && !isEmpty(newAddress.province) &&
            newAddress.hasOwnProperty('country') && !isEmpty(newAddress.country)) {

            if (user) {
                var withOutAddresses = user.addresses.filter(a => a.id !== parseInt(request.params.id));
                var withAddresses = user.addresses.filter(a => a.id === parseInt(request.params.id));
                if (user.addresses.length >= withOutAddresses.length) {
                    var address = {
                        id: withAddresses[0].id,
                        address1: newAddress.address1,
                        address2: isEmpty(newAddress.address2) ? "" : newAddress.address2,
                        postal: newAddress.postal,
                        city: newAddress.city,
                        province: newAddress.province,
                        country: newAddress.country
                    };
                    withOutAddresses.push(address);
                    user.addresses = withOutAddresses;
                }
                await db.conn.Users.save(user);
                status = true;
                message = "Updated successfully";
            } else {
                status = false;
                message = "User not found";
            }
        } else {
            status = false;
            message = "Insuffient amount of data provided.";
        }
        response.json({ status: status, message: message });
    } catch (e) {
        response.json({ status: false, message: e.message });
    }
};

module.exports.getAll = async function (request, response) {
    try {
        let status = false;
        let message = "";
        let data = [];
        let user = await db.conn.Users.findOne({ _id: mongoist.ObjectId(request.session.user) });

        if (user) {
            if (user.addresses.length > 0) {
                status = true;
                message = "retrieved all successfully";
                data = user.addresses;
            } else {
                status = false;
                message = "Invalid address ID";
                data = [];
            }
        } else {
            status = false;
            message = "User or Address ID not found";
            data = [];
        }
        response.json({ status: status, message: message, data: data });
    } catch (e) {
        response.json({ status: false, message: e.message });
    }
};

function isEmpty(value) {
    return typeof value == 'string' && !value.trim() || typeof value == 'undefined' || value === null;
}
