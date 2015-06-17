'use strict';

describe('main page', function () {

    beforeEach(function () {
        browser.get('http://localhost:9001');
    });

    it('should display the application name', function () {
        var appName = element(by.css('.jumbotron h1'));

        expect(appName.getText()).toEqual('Cygni AngularJS');
    });

});
