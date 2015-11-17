///<reference path="typings/tsd.d.ts"/>

var app = require('app');  // Module to control application life.
var BrowserWindow = require('browser-window');  // Module to create native browser window.

// Report crashes to our server.
require('crash-reporter').start();

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
var mainWindow = null;

// Quit when all windows are closed.
app.on('window-all-closed', function () {
    app.quit();
});

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
app.on('ready', function () {
	mainWindow = new BrowserWindow({ width: 1000, height: 660 });

	mainWindow.loadUrl('file://' + __dirname + '/app/index.html');

	mainWindow.webContents.openDevTools({ detach: true });
});