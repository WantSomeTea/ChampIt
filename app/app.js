(function () {'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var os = require('os');
var electron = require('electron');
var jetpack = _interopDefault(require('fs-jetpack'));

// Simple wrapper exposing environment variables to rest of the code.

// The variables have been written to `env.json` by the build process.
var env = jetpack.cwd(__dirname).read('env.json', 'json')

// Here is the starting point for your application code.
// All stuff below is just to show you how it works. You can delete all of it.

// Use new ES6 modules syntax for everything.
// native node.js module
// native electron module
// module loaded from npm
// code authored by you in this project
console.log('Loaded environment variables:', env)

var app = electron.remote.app
var appDir = jetpack.cwd(app.getAppPath())

// Holy crap! This is browser window with HTML and stuff, but I can read
// here files like it is node.js! Welcome to Electron world :)
console.log('The author of this app is:', appDir.read('package.json', 'json').author)

// DB part
var Sequelize = require('sequelize');

// without password and options
var sequelize = new Sequelize('football_database', null, null, {
  // sqlite! now!
  dialect: 'sqlite',
  storage: 'db/football_database.sqlite'
})

var Tournament = sequelize.define('tournament', {
  name: {
    type: Sequelize.STRING
  },
  tournamentType: {
    type: Sequelize.STRING
  }
});

Tournament.sync({force: true}).then(() => {
  // Table created
  return Tournament.create({
    name: 'Championship',
    tournamentType: 'Group'
  });
});
}());
//# sourceMappingURL=app.js.map