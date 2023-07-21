const { app, BrowserWindow, ipcMain, dialog } = require("electron");
const path = require("path");
const {
  downloadVideo,
  setupDownloader,
  extractSubtitles,
} = require("./main_video_handling.js");
// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require("electron-squirrel-startup")) {
  app.quit();
}

async function handleVideoDownload(url) {
  console.log(url);
  downloadVideo(url);
  return "done";
}
async function handleExtractSubtitles() {
  console.log("in extract subtitles");
  return extractSubtitles("video.en.vtt");
}

const createWindow = () => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY,
    },
  });

  // and load the index.html of the app.
  mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);

  // Open the DevTools.
  mainWindow.webContents.openDevTools();
  console.log("Done with createwindow");
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  setupDownloader();

  ipcMain.handle("downloadVideo", async (event, ...args) => {
    console.log(...args);
    const result = await handleVideoDownload(...args);
    return result;
  });
  ipcMain.handle("extractSubtitles", async (event, ...args) => {
    const result = await handleExtractSubtitles(...args);
    return result;
  });
  ipcMain.handle("savePage", async (event, ...args) => {
    BrowserWindow.getAllWindows()
      .at(0)
      .webContents.savePage(`/Users/jesse/file.html`, `HTMLComplete`);
  });

  console.log("Done with setup");
  createWindow();
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
