const {app, BrowserWindow} = require('electron');
let path = require('path');
let url = require('url');

let win, serve;


// Get process arguments
const args = process.argv.slice(1);
serve = process.env.EXEC_METHOD === 'serve';

// Browser Window Creation and Loading
function createWindow() {

  // Create window
  win = new BrowserWindow({
    backgroundColor: '#ffffff',
    icon: `file://${__dirname}/dist/assets/logo.png`,
  });

  win.maximize();

  // Load window
  // win.loadURL(`file://${__dirname}/dist/index.html`);
  if (serve) {

    // Reload app on changes
    require('electron-reload')(__dirname, {
      electron: require(`${__dirname}/../node_modules/electron`),
    });

    // Load Angular serve URL
    win.loadURL('http://localhost:4201');

  } else {

    // Load already built index.html
    win.loadURL(url.format({
      pathname: path.join(__dirname, 'public/index.html'),
      protocol: 'file:',
      slashes: true
    }));
  }

  // Uncomment if want to open Chromium DevTools during Development
  win.webContents.openDevTools();

  // Event when window is closed
  win.on('closed', function () {
    win = null;
  });

}

// Initialize window when electron app is ready
app.on('ready', createWindow);

// Quit when all windows are closed
app.on('window-all-closed', function () {
  // macOS specific : if not macOS close process (macOS does not quit app if closed all windows)
  // if (process.platform !== 'darwin') {
  //   app.quit();
  // }
  app.quit();
});

//
app.on('activate', function () {

  // macOS specific : Open new window if no window available
  if (win === null) {
    createWindow();
  }
});
