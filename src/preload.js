// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts

const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('noiseFilter', {
  start: () => ipcRenderer.invoke('noise-filter:start'),
  stop: () => ipcRenderer.invoke('noise-filter:stop'),
  openExternal: (url) => ipcRenderer.invoke('open-external', url),
});
