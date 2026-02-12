const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  sendControl: (command) => ipcRenderer.send('media-control', command),

  onTerminalLog: (callback) => ipcRenderer.on('terminal-log', (event, msg) => callback(msg)),
  
  onSpotifyData: (callback) => ipcRenderer.on('spotify-data', (event, data) => callback(data)),
  onProgressTick: (callback) => ipcRenderer.on('progress-tick', (event, percent) => callback(percent))
});
