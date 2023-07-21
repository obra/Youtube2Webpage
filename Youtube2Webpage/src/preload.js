// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts
const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("electronAPI", {
  downloadVideo: (url) => ipcRenderer.invoke("downloadVideo", url),
  extractSubtitles: () => ipcRenderer.invoke("extractSubtitles"),
  savePage: () => ipcRenderer.invoke("savePage"),
});

console.log("done with preload");
