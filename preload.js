const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  sendControl: (command) => ipcRenderer.send('media-control', command),
  // Placeholder so your HTML script doesn't crash
  onSpotifyData: (callback) => {}, 
  onProgressTick: (callback) => {}
});
