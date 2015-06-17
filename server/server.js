var express = require('express');
var bodyParser = require('body-parser');
var app = express();
app.use(bodyParser.json());

require('sugar'); // Extends Object, Array etc with sweet methods
var products = require('./data/products');
var productService = require("./product-service")(products);

app.get('/products', function(req, res) {
    res.type('application/json');
    res.send(productService.getAll());
});

app.get('/products/:id', function(req, res) {
	var id = req.params.id;
    res.type('application/json');
    var product = productService.getProductById(id);
    if (!product) {
		res.status(404).send({message: 'Can not find product with id '+id});
	} else {
		res.send(productService.getProductById(id));
	}
});

app.post('/checkout', function(req, res){
    console.log('checkout: body:'+JSON.stringify(req.body));
	res.type('application/json');
	var result = productService.checkout(req.body);
    if (result.failed.length > 0) {
		res.status(406); // HTTP Not Accepted
	}
	res.send(result);
});

var server = app.listen(3000, function () {
    console.log('Listening on port %d', server.address().port);
});
