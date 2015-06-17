assert = require('assert');
require('sugar'); // Extends Object, Array etc with sweet methods

var products = [
    {
        "id": "1",
        "name": "Banana",
        "price": 40
    },
    {
        "id": "2",
        "name": "Tomato",
        "price": 25
    },
    {
        "id": "5",
        "name": "Swedish Strawberry",
        "price": 100
    }
];

var productService = require("./product-service")(products);

var order = [
	{ productId: "1", quantity: 5 },
	{ productId: "2", quantity: 10 },
	{ productId: "5", quantity: 15 }  // This Id="5" will not be accepted but failed by server
];

var result = productService.checkout(order);

assert(result, "checkout result undefined");
assert.equal(2, result.confirmed.length, "2 should be confirmed");
assert.equal(1, result.failed.length, "1 should be failed");
assert.equal("5", result.failed[0].id, "failed should be id=5");
assert.equal(5*40+10*25, result.totalPrice, "totalPrice is wrong");

assert(result.receipt, "receipt should exist");
assert.equal("Receipt-1", result.receipt, "receipt #1 is wrong:"+result.receipt);

