const {app, BrowserWindow} = require('electron');
let win;

// Browser Window Creation and Loading
function createWindow() {

  // Create window
  win = new BrowserWindow({
    backgroundColor: '#ffffff',
    icon: `file://${__dirname}/dist/angular-electron/assets/logo.png`,

  });


  win.maximize();

  // Uncomment if want to open Chromium DevTools during Development
  win.webContents.openDevTools();

  // Load window
  win.loadURL(`file://${__dirname}/dist/angular-electron/index.html`);

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
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

//
app.on('activate', function () {

  // macOS specific : Open new window if no window available
  if (win === null) {
    createWindow();
  }
});
