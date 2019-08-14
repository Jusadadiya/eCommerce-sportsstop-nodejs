const db = require("./db.js");
const mongoist = require('mongoist');
const shortId = require("shortid");

//ORDER POST ADD ORDER
module.exports.add = async function (request, response) {
    try {
        let status = false;
        let message = "";
        let req = request.body;
        let user = await db.conn.Users.findOne({ _id: mongoist.ObjectId(request.session.user) });
        let shippedAddress = user.addresses.filter(a => a.id == req.shippingAddressId);
        var hash = shortId.generate();

        if (user) {
            if (user.cart.products.length > 0) {
                if (shippedAddress.length > 0) {
                    var order = {
                        _id: hash,
                        userId : mongoist.ObjectId(request.session.user),
                        user: user,
                        shippingAddress: shippedAddress
                    };
                    await db.conn.Orders.insert(order);
                    user.cart.subTotal = 0;
                    user.cart.totalTax = 0;
                    user.cart.totalShippingCost = 0;
                    user.cart.totalPrice = 0;
                    user.cart.products = [];

                    await db.conn.Users.save(user);
                    status = true;
                    message = "Added successfully";
                } else {
                    status = false;
                    message = "Please provide valid shipping address";
                }
            } else {
                message = "Please add products to cart before ordering";
                status = false;
            }
        } else {
            status = false;
            message = "User not found";
        }
        response.json({ status: status, message: message });
        return response;
    } catch (e) {
        response.json({ status: false, message: e.message });
    }
};

//ORDER GET ALL ORDERS
module.exports.getAll = async function (request, response) {
    try {
        let status = false;
        let message = "";
        let data = [];
        let orders = await db.conn.Orders.find({ userId: mongoist.ObjectId(request.session.user) });
        
        if (orders) {
            if (orders.length > 0) {
                status = true;
                message = "retrieved all successfully";
                console.log(orders);
                data = orders;
            } else {
                status = false;
                message = "No Orders found";
                data = [];
            }
        } else {
            status = false;
            message = "Order not found";
            data = [];
        }
        response.json({ status: status, message: message, data: data });
        return response;
    } catch (e) {
        response.json({ status: false, message: e.message });
    }
}
