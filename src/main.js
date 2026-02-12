const { app, BrowserWindow, ipcMain } = require('electron');
const { exec } = require('child_process');

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 320, height: 180,
    transparent: true, frame: false, alwaysOnTop: true,
    webPreferences: {
      // Forge Webpack uses this specific constant:
      preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY,
      contextIsolation: true,
      nodeIntegration: false
    }
  });
  mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);
}

ipcMain.on('media-control', (event, command) => {
  // Confirm back to the index.html that we received the click
  event.reply('terminal-log', `Sent: ${command}`);

  let key;
  if (command === 'play-pause') key = 179;
  if (command === 'next') key = 176;
  if (command === 'prev') key = 177;

  if (key) {
    // This command forces a Virtual Key press at the Windows OS level
    const psCommand = `powershell -Command "$wshell = New-Object -ComObject WScript.Shell; $wshell.SendKeys([char]${key})"`;
    exec(psCommand);
  }
});

app.whenReady().then(createWindow);