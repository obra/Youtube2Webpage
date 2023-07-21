const fs = require("fs");
const os = require("os");
const path = require("path");
const process = require("process");
const { execFileSync } = require("node:child_process");
import { nativeImage } from "electron";

let tmpDir;
let videoFile = "video.webm";
const appPrefix = "yt2page";

export const downloadVideo = (url) => {
  console.log("Dowloading " + url + " to " + tmpDir);
  process.chdir(tmpDir);
  const args = [
    "--write-auto-subs",
    "--write-subs",
    "--no-simulate",
    "--force-overwrites",
    "--paths",
    tmpDir,
    "--print",
    "filename",
    "-o",
    "video.%(ext)s",
    url,
  ];
  console.log(args);
  const filename = execFileSync("yt-dlp", args);
  console.log("done");
  let file = filename.toString().trim();
  videoFile = file;
  return videoFile;
};

export const extractSubtitles = (filename) => {
  process.chdir(tmpDir);

  console.log("in extract subtitles for " + filename);
  const input = fs.readFileSync(filename, "utf8");
  console.log("Input is ");
  console.log(input);
  const segmentDuration = 10; // default to 10
  const startOffset = 0; // Starting MPEG TS offset to be used in timestamp map, default 900000
  try {
    const parsed = parseVTT(input);

    console.log(parsed);
    return parsed;
  } catch (error) {
    console.log(error);
    return ["error", error];
  }
};

export const setupDownloader = () => {
  try {
    console.log("in setupDownloader");
    tmpDir = path.join(os.tmpdir(), appPrefix);
    fs.mkdirSync(tmpDir); // todo - check for existence
    process.chdir(tmpDir);
    console.log("Our temp dir is " + tmpDir);
  } catch (e) {
    console.log(e);
    process.chdir(tmpDir);

    // handle error
  } finally {
    try {
      if (tmpDir) {
        //fs.rmSync(tmpDir, { recursive: true });
      }
    } catch (e) {
      console.error(
        `An error has occurred while removing the temp folder at ${tmpDir}. Please remove it manually. Error: ${e}`
      );
    }
  }
};
//download('https://www.youtube.com/watch?v=jNQXAC9IVRw');
//    extract_subtitles('video.en.vtt');

function parseVTT(vtt) {
  const lines = vtt.trim().split(/\r?\n/);
  const captions = [];

  let caption = {};
  let captionText = "";
  let inHeader = true;
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    console.log("Line is: " + line);
    if (line === "") {
      // Skip blank lines
      continue;
    }
    if (inHeader) {
      if (line.match(/^\d{2}:\d{2}:\d{2}/)) {
        inHeader = false;
      } else {
        continue;
      }
    }
    if (
      /^\d{2}:\d{2}:\d{2}\.\d{3}\s+-->\s+\d{2}:\d{2}:\d{2}\.\d{3}$/.test(line)
    ) {
      // Start of a new caption
      if (Object.keys(caption).length > 0) {
        caption.line = captionText.trim();
        captions.push(caption);
        caption = {};
        captionText = "";
      }
      caption.start = line.split(" --> ")[0];
      caption.seconds = convertTimestampToSeconds(caption.start);
    } else {
      // Caption text
      captionText += line + " ";
    }
  }

  // Add the last caption to the list
  if (Object.keys(caption).length > 0) {
    caption.line = captionText.trim();
    captions.push(caption);
  }

  // Convert captions to JSON
  const json = captions.map((caption, index) => ({
    start: caption.start,
    line: caption.line,
    seconds: caption.seconds,
    thumbnail: getThumbnail(caption.start),
    filename: `images/${caption.start
      .replace(/:/g, "-")
      .replace(".", ",")}.jpg`,
  }));

  return json;
}

const getThumbnail = (timestamp) => {
  timestamp.replace(/:/g, "-");

  const image = execFileSync("ffmpeg", [
    "-ss",
    timestamp,
    "-nostdin",
    "-i",
    videoFile,

    "-frames:v",
    "1",
    "-q:v",
    "2",
    "-vf",
    "scale=1024:-1",
    "-f",
    "image2pipe",
    "-",
  ]);
  const jpeg = nativeImage.createFromBuffer(image).toJPEG(80);
  return nativeImage.createFromBuffer(jpeg).toDataURL();
};

function convertTimestampToSeconds(timestamp) {
  const parts = timestamp.split(/[:.]/).map(parseFloat);
  return parts[0] * 3600 + parts[1] * 60 + parts[2] + parts[3] / 1000;
}
