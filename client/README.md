# AngularJS med Yeoman  

Ett [AngularJS](https://angularjs.org/)-projekt skapat med [Yeoman](http://yeoman.io/)
och [generator-angular](https://github.com/yeoman/generator-angular).

Projektet är förkonfigurerat med [grunt-connect-proxy](https://github.com/drewzboto/grunt-connect-proxy)
för anrop på _/api_ att gå mot en server på _localhost_ port _3000_.

För att det ska vara enklare att komma igång med end-to-end-testning är
[grunt-protractor-runner](https://github.com/teerapap/grunt-protractor-runner)
uppsatt att köra e2e-tester under *test/e2e*.

Installera *Grunt*, *Bower* och *Yeoman*:

    npm install -g grunt-cli bower yo
    
Installera applikationen:

    npm install
    bower install

Starta lokal server:
_(Öppnar applikationen i en webbläsare och laddar automatiskt om applikationen när filerna ändras.)_
    
    grunt serve

Kör tester: (kräver inte server)

    grunt test
    
End-to-end-tester: (kräver "node server.js")
  
    grunt test-e2e
    
Installera *generator-angular*, skapa en ny *route* och börja koda:
_(För fler kommandon se: [generator-angular](https://github.com/yeoman/generator-angular))_

    npm install -g generator-angular
    yo angular:route products

## Verktyg
Nedan är några av de verktyg som använts för att skapa detta projekt beskrivna samt detaljer hur detta är gjort.

### [Webstorm](http://www.jetbrains.com/webstorm/)
IDE från Jetbrains med bra stöd för Javascript, Html och AngularJS. 30 dagar fri.
IntelliJ har samma funktionalitet förutsatt rätt plugins har installerats.  

### [Node.js](http://nodejs.org/)
Det går självklart att leverera er angular-app från valfri web-server men tillsammans med verktygen nedan går det
förhållandevis snabbt och smidigt att sätta upp och utveckla en helt ny app.
Följ till exempel instruktionerna på [https://github.com/cygni/cygni-competence-nodejs-helloworld](https://github.com/cygni/cygni-competence-nodejs-helloworld) för att installera
och verifiera din installation av node.

### [Yeoman](http://yeoman.io/)
Verktyg för att generera node-projekt (scaffolding).

Installera globalt i Node.js tillsammans med Grunt och Bower:

    npm install -g grunt-cli bower yo

Installera [angular-generatorn](https://github.com/yeoman/generator-angular) och skapa ett projekt:

    npm install -g generator-angular
    mkdir app-name
    cd app-name
    yo angular [app-name]

### [Grunt](http://gruntjs.com/)
Yeoman-generatorn som beskrivs ovan kommer generera ett projekt som kan byggas och köras med hjälp av grunt.

Grunt installeras med Yeoman. För att manuellt installera grunt-cli:

    npm install -g grunt-cli

För att köra projektet ovan:

    grunt serve
    
#### Konfigurera en proxy med grunt connect
Grunt-konfigurationen genererad av Yeoman-generatorn sätter upp en enkel web-server, grunt connect.
Eftersom webbläsare normalt sett inte tillåter anrop mellan 'domäner' kan man enkelt gå runt detta genom att sätta upp
en proxy med grunt connect. Följande instruktion sätter upp en proxy under _/api_ mot en server på _localhost_ port _3000_.
Eftersom den genererade grunt-filen *Gruntfile.js* kan variera beroende på version av yeoman-generatorn kan det se aningens annorlunda ut.

- Installera [grunt-connect-proxy](https://github.com/drewzboto/grunt-connect-proxy) och spara som dev-beroende:

<pre>npm install grunt-connect-proxy --save-dev</pre>

- Lägg till en proxies sektion till connect-definitionen:

<pre>
connect: {
    options: {
        port: 9000,
        // Change this to '0.0.0.0' to access the server from outside.
        hostname: 'localhost',
        livereload: 35729
    },
<strong>
    proxies: [
        {
            context: '/api',
            host: 'localhost',
            port: 3000,
            rewrite: {
               '^/api': ''
            }
        }
    ],
</strong>
</pre>        

- Lägg till 'middleware'-anropet under connect -> livereload -> options:

<pre>
livereload: {
    options: {
        open: true,
        middleware: function (connect) {
            return [
                connect.static('.tmp'),
                connect().use(
                    '/bower_components',
                    connect.static('./bower_components')
                ),
                connect.static(appConfig.app),
                <strong>require('grunt-connect-proxy/lib/utils').proxyRequest</strong>
            ];
        }
    }
},
</pre>

- Lägg till configureProxies task till server task:

<pre>
grunt.registerTask('serve', 'Compile then start a connect web server', function (target) {
    if (target === 'dist') {
        return grunt.task.run(['build', 'connect:dist:keepalive']);
    }

    grunt.task.run([
        'clean:server',
        'wiredep',
        'concurrent:server',
        'autoprefixer',
        <strong>'configureProxies',</strong>
        'connect:livereload',
        'watch'
    ]);
});
</pre>

### [Protractor](http://angular.github.io/protractor/#/)

- Installera [generator-protractor](https://github.com/andresdominguez/generator-protractor) och kör generatorn: 

<pre>
npm install -g generator-protractor
yo protractor
</pre>    

- Installera [grunt-protractor-runner](https://github.com/teerapap/grunt-protractor-runner):

<pre>npm install grunt-protractor-runner --save-dev</pre>

- Ändra den genererade *protractor.conf.js*:

<pre>
// The address of a running selenium server.
<strong>// seleniumAddress: 'http://localhost:4444/wd/hub',</strong>

// Spec patterns are relative to the location of this config.
specs: [
<strong>    'test/e2e/**/*.js'</strong>
],
</pre>

- Konfigurera *Gruntfile.js* för att köra e2e-tester med Protractor:

    Under initConfig:

<pre>
protractor: {
  options: {
    configFile: 'protractor.conf.js', //your protractor config file
    keepAlive: true, // If false, the grunt process stops when the test fails.
    noColor: false, // If true, protractor will not use colors in its output.
    args: {
      // Arguments passed to the command
    }
  },
  chrome: {
    options: {
      args: {
        browser: 'chrome'
      }
    }
  },
  firefox: {
    options: {
      args: {
        browser: 'firefox'
      }
    }
  }
}
</pre>

* Registrera en task i *Gruntfile.js* som startar en test-server och kör e2e-testerna:

<pre>
grunt.registerTask('test-e2e', [
  'clean:server',
  'concurrent:test',
  'autoprefixer',
  'connect:test',
  'protractor:chrome'
]);
</pre>



