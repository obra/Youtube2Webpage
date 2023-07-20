/**
 * This file will automatically be loaded by webpack and run in the "renderer" context.
 * To learn more about the differences between the "main" and the "renderer" context in
 * Electron, visit:
 *
 * https://electronjs.org/docs/tutorial/application-architecture#main-and-renderer-processes
 *
 * By default, Node.js integration in this file is disabled. When enabling Node.js integration
 * in a renderer process, please be aware of potential security implications. You can read
 * more about security risks here:
 *
 * https://electronjs.org/docs/tutorial/security
 *
 * To enable Node.js integration in this file, open up `main.js` and enable the `nodeIntegration`
 * flag:
 *
 * ```
 *  // Create the browser window.
 *  mainWindow = new BrowserWindow({
 *    width: 800,
 *    height: 600,
 *    webPreferences: {
 *      nodeIntegration: true
 *    }
 *  });
 * ```
 */

import "./index.css";

console.log(
  '👋 This message is being logged by "renderer.js", included via webpack'
);

const btn = document.getElementById("downloadVideo");
const videoURLElement = document.getElementById("videoURL");

btn.addEventListener("click", async () => {
  console.log(videoURLElement.value);
  console.log(videoURLElement);
  const filePath = await window.electronAPI.downloadVideo(
    videoURLElement.value
  );
});

const extractSubtitlesBtn = document.getElementById("extractSubtitles");
extractSubtitlesBtn.addEventListener("click", async () => {
  const subtitles = await window.electronAPI.extractSubtitles();
  console.log(subtitles);
  document.getElementById("subtitles").innerHTML = "";
  subtitles.forEach((subtitle) => {
    var item = document.createElement("div");
    item.innerHTML = `<img class="thumbnail" src="data:${subtitle.thumbnail}"><span class="time">${subtitle.start}</span><span class="line">${subtitle.line}</span>`;
    console.log(item);
    document.getElementById("subtitles").appendChild(item);
  });
});