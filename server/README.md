# Server med REST-API för produkter 

Projektet implementerar en server på _localhost_ port _3000_.

Installera dependencies: 

    npm install 
    
Kör servern:

    node server.js

[Gå till produktlistan](http://localhost:3000/products) 



## REST-API

### Hämta produktlista
GET "/products" ger hela [produktlistan](data/products.json) 

### Hämta produkt
GET "/products/4711" ger angiven produkt med id="4711"

### Checkout
Beställning/order görs med "checkout" som förväntar sig en beställningslista med där varje objekt har två attribut; 
"productId" och "quantity".

POST "/checkout" 
Tex med följande JSON body:
<pre>
[
    {
        "productId": "1",
        "quantity": 10
    },
    {
        "productId": "2",
        "quantity": 10
    }
]
</pre> 

Response innehåller:
<pre>
{
"receipt": "Receipt-4711",
"totalPrice": 5500,
"confirmed": [
    {
        "productId": "1",
        "quantity": 10
    },
    {
        "productId": "2",
        "quantity": 10
    }
]}
</pre> 
-"receipt" : Ett kvitto
-"totalPrice" : Totalpris
-"confirmed" : En lista med objekt som har "produktId" och "quantity" som blev faktiskt blev beställda.
-"failed" : En lista med objekt som har "produktId" och "quantity" som inte gick att beställa.

Fn är checkout gjord så att produkt med id = "5" ("Swedish Strawberry") inte går att beställa och servern svarar med ett fel (HTTP 406) i detta fall.


Vill du modifiera servern så ta en till på unit-testerna också. Dessa finns i product-service-test.js

