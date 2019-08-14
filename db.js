//database
const mongoist = require('mongoist');
const connectionString = 'mongodb://localhost:27017/eCommerce';
const connectionOptions = { useNewUrlParser: true };
const bcrypt=require('bcryptjs');

//db collection names
const productCollectionName = "Products";
const userCollectionName = "Users";
const orderCollectionName = "Orders";

//this will create the database if it does not exist
const conn = mongoist(connectionString, connectionOptions);

module.exports.conn = conn;

module.exports.init = async function () {
  try {
    //create the collection if it does not exist
    let collectionNames = await conn.getCollectionNames();

    // these statements creates collections products, users, orders if they doesn't exist
    let collectionName = collectionNames.find(q => q == productCollectionName);
    if (!collectionName) {
      await conn.createCollection(productCollectionName);
      await conn.Products.insert(product1);
      await conn.Products.insert(product2);
      await conn.Products.insert(product3);
      await conn.Products.insert(product4);

    }

    collectionName = collectionNames.find(q => q == userCollectionName);
    if (!collectionName) {
      await conn.createCollection(userCollectionName);
      await conn.Users.insert(user1);
      await conn.Users.insert(user2);
      await conn.Users.insert(user3);
    }

    collectionName = collectionNames.find(q => q == orderCollectionName);
    if (!collectionName) {
      await conn.createCollection(orderCollectionName);
    }
  } catch (err) {
    console.log(err);
  }
}
var product1 = {
  id: 1,
  name : "Nike superflex",
  description : "Audi Superflexible shoes for runners",
  imagePath : "/images/1000.jpg",
  price : 60.50,
  tax : (60.50 * 0.13),
  shippingCost : (10),
  comments : [
      {
          rating: 10,
          comment: "Good Quality! Awesome Purchase",
          imagePath : "",
          productID : 1,
          userId : 1
      }
  ]
};


var product2 = {
  id: 2,
  name : "2019 Nike QT",
  description : "Awesome yoga shoes",
  imagePath : "/images/1001.jpg",
  price : 95.99	,
  tax : (95.99 * 0.13),
  shippingCost : (10),
  comments : [
      {
          rating: 7,
          comment: "too good",
          imagePath : "",
          productID : 2,
          userId : 3
      }
  ]
};


var product3 = {
  id: 3,
  name : "Reebok shoes",
  description : "RUnning shoes for athlete",
  imagePath : "images/1002.jpg",
  price : 199,
  tax : (199 * 0.13),
  shippingCost : (10),
  comments : [
      {
          rating: 9,
          comment: "Costly but Good product.",
          imagePath : "",
          productID : 3,
          userId : 3
      }
  ]
};


var product4 = {
  id: 4,
  name : "2019 Adidas football",
  description : "Manchester united official football",
  imagePath : "images/1003.jpg",
  price : 49.99,
  tax : (49.99 * 0.13),
  shippingCost : (10),
  comments : [
      {
          rating: 1,
          comment: "Bad Product absolutely hate it.",
          imagePath : "",
          productID : 4,
          userId : 1
      },
      {
          rating: 10,
          comment: "Amazing, well done.",
          imagePath : "",
          productID : 4,
          userId : 1
      }
  ]
};

var user1 = {
    id : 1,
    firstName : "Jay",
    lastName : "Usadadiya",
    email : "jay@gmail.com",
    phone : "3653661947",
    password : bcrypt.hashSync("123",bcrypt.genSaltSync()),
    defaultAddressId : 2,
    addresses : [
        {
          id : 1,
          address1 : "Madison Ave St.",
          address2 : "Unit 106",
          postal : "N2G 3L6",
          city : "Waterloo",
          province : "ON",
          country : "Canada"
        },
        {
          id : 2,
          address1 : "Cedar St.",
          address2 : "Unit 14",
          postal : "N2L 3L6",
          city : "Waterloo",
          province : "ON",
          country : "Canada"
        }
    ]
};

var user2 = {
  id : 2,
  firstName : "Himani",
  lastName : "PatelInniss",
  email : "himani@gmail.com",
  phone : "2263397942",
  password : bcrypt.hashSync("123",bcrypt.genSaltSync()),
  defaultAddressId : 1,
  addresses : [
      {
        id : 1,
        address1 : "300 Madison St.",
        address2 : "South",
        postal : "N2G 3Gl",
        city : "Waterloo",
        province : "ON",
        country : "Canada"
      },
      {
        id : 2,
        address1 : "China Town Av",
        address2 : "unit 56",
        postal : "M24 9J2",
        city : "Hamilton",
        province : "ON",
        country : "Canada"
      }
  ]
};

var user3 = {
  id : 3,
  firstName : "Adi",
  lastName : "jobaliya",
  email : "aditya@gmail.com",
  phone : "12345678",
  password : bcrypt.hashSync("123",bcrypt.genSaltSync()),
  defaultAddressId : 2,
  addresses : [
      {
        id : 1,
        address1 : "King St.",
        address2 : "North",
        postal : "N2J 4G3",
        city : "Waterloo",
        province : "ON",
        country : "Canada"
      },
      {
        id : 2,
        address1 : "122 Bill Gates Av",
        address2 : "C/O Daughter",
        postal : "G5H 5J2",
        city : "Toronto",
        province : "ON",
        country : "Canada"
      }
  ]
};
