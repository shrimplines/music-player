const { app, BrowserWindow, ipcMain } = require('electron');
const { exec } = require('child_process');

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 320, height: 180,
    transparent: true, frame: false, alwaysOnTop: true,
    webPreferences: {
      preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY,
      contextIsolation: true,
      nodeIntegration: false
    }
  });
  mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);
}

ipcMain.on('media-control', (event, command) => {
  event.reply('terminal-log', `Sent: ${command}`);

  let key;
  if (command === 'play-pause') key = 179;
  if (command === 'next') key = 176;
  if (command === 'prev') key = 177;

  if (key) {
    const psCommand = `powershell -Command "$wshell = New-Object -ComObject WScript.Shell; $wshell.SendKeys([char]${key})"`;
    exec(psCommand);
  }
});

app.whenReady().then(createWindow);
