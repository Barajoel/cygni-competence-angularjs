Kompetensutveckling - AngularJS
===============================


Denna övning går ut på att lära sig [AngularJS](http://angularjs.org/) genom att bygga en enkel webbshop med fokus på kundvagnen.

För att komma igång med uppgiften rekommenderas följande arbetssätt:

* Skapa ett konto på GitHub, registrera SSH-nycklar
* Installera git
* Fork:a detta repo
* Läs instruktionerna nedan
* Lös uppgiften ;)

## Funktionella krav
Bygg en enkel SPA (single page app) webbshop med produkter som man kan lägga i en kundvagn.  

* Produktlista
    * Lista - Hämta produkter från server och presentera lista
    * Filtrera - Filtrera listan av produkter på produktkategori
* Produktdetaljer
    * Visa - Hämta produkt-detaljer från server och presentera
    * Lägg till - Lägga en produkt i kundvagnen med angiven kvantitet
* Kundvagn
    * Visa - Lista produkter, kvantitet, pris och slutsumma
    * Redigera - Lägg till ta bort produkter från kundvagn
    * Checka ut - Kvitto på beställning samt möjlighet att hantera server-fel
    * Status - Totalt antal produkter och totalsumma skall vara synlig i övriga vyer 
* Bokmärken - Lägga till bokmärken för enskilda produkter och vyer
* Historik - Navigera mellan vyer med 'back' och 'forward'


## Övriga krav
* Enhetstester - Kvalitetssäkra controllers och services samt all icke-trivial kod.
* Integrationstester - För de centrala delarna av applikationen bör end-to-end-tester finnas på plats.
* Html/Templates - Använd directives, controllers och services för logik. Html-filer bör endast innehålla enkel direkt vy-relaterad logik.
* Komponenter - Implementera återanvändbara komponenter som directives för att undvika kod-duplicering.


Vi levererar en enkel serverimplementation med REST-API du kan använda. Se "Server" nedan.

- produktlista som hämtas via REST-API "/products" från en server
- -dvs beställa via en REST-AIP "/checkout"


## Extrauppgifter

* Sök produkt
* Lägg till funktion för att produkter tar slut - dvs blir ett fel vid checkout
* Uppdatera produktinfomation i realtid Socket.io....

## Komma igång
_Node package manager (npm) ska normalt sett inte kräva **sudo** ._
_Gör en snabb sökning på internet om så är fallet, alternativ lägg till **sudo** för paket som ska installeras globalt._

Installera och starta server:

    cd server
    npm install
    node server.js

Installera Grunt och Bower globalt:

    sudo npm install -g grunt-cli
    sudo npm install -g bower

Installera och starta det förkonfigurerade skelettprojektet:

    cd client
    npm install
    bower install
    grunt serve

### Applikationen
Vi har generarat ett skelettprojekt, [AngularJS med Yeoman](client/README.md) under mappen client som man kan utgå ifrån. Det är generat mha Yeoman som ger en vettig bas att stå på.

### Test
Tanken är att lära sig koda testdrivet och AngularJS gör testning enkelt och kul. Dependency injection är ju inget nytt för back-end-utvecklare och med AngularJS som finns detta med från grunden med bra teststöd.
För unit tester används förslagsvis [Karma](https://github.com/karma-runner/karma) som kan köras i bakgrunden och köra om tester när ändringar görs. Testerna skrivs i [Jasmine](http://jasmine.github.io/).
End-to-end (e2e) kallas de tester som simulerar och testar scriptad interaktion med appen i en browser. För AngularJS så är det [Protractor](https://github.com/angular/protractor) som gäller.

Tänk också på att använda ett bra IDE med bra javascriptstöd. jshint är också bra som checker för slarvfel (grunt jshint körs som del av grunt test).

### Server
[Server för webbshopp](server/README.md)

### Övrigt
[Batarang - AngularJS-aware chrome plugin](https://chrome.google.com/webstore/detail/angularjs-batarang/ighdmehidhipcmcojjgiloacoafjmpfk?hl=en)

[Debugging-AngularJS](https://www.ng-book.com/p/Debugging-AngularJS/)

[Protractor with yeoman](http://www.codeorbits.com/blog/2014/01/26/angularjs-end-to-end-testing-with-protractor-easy-set-up-with-yeoman/)

[Practical End-to-End Testing with Protractor](http://www.ng-newsletter.com/posts/practical-protractor.html)

## Läsning
Cygni har tillgång till [Safari](https://sites.google.com/a/cygni.se/wiki/Home/teknik/oreilly---safari)

* [AngularJS - O'Reilly](https://www.safaribooksonline.com/library/view/angularjs/9781449355852/) - Bra bok att börja med.
