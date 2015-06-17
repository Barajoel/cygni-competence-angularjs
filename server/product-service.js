'use strict';

module.exports = function(products) {

	var productsMap = {};
	products.each(function(e){ productsMap[e.id] = e; });
    var orderCount = 0;
    
    var isProductAvailable = function(p) {
		if (!p) { return false; }
		if (p.id === "5") { return false; }
		return true;
	};

	return {
		getAll : function() { 
			return products;
		},
		// Return the list keyed with the id like a "map"
		getProductById : function(id) {
			return productsMap[id];
		},
		checkout : function(cart) {
			var result = { confirmed:[], failed:[], totalPrice:0 };
			cart.each(function(e){
				var resultItem = {id:e.productId};
				var product = productsMap[e.productId];
				if (isProductAvailable(product)) {
					resultItem.quantity = e.quantity;
					result.confirmed.push(resultItem);
					result.totalPrice += product.price * e.quantity;
				} else {
					resultItem.quantity = 0;
					result.failed.push(resultItem);
				}
			}); 
			result.receipt = "Receipt-"+(++orderCount);
			return result;
		}
	};
};
