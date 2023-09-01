# Youtube-to-Webpage

Youtube-to-Webpage is a Perl script to create a webpage from a Youtube video with a transcript generated from the video's closed captions paired with screenshots of the video.

```./yt-to-webpage.pl project-name "videoURL"```

## Dependencies

The project is built upon:

* [yt-dlp](https://github.com/yt-dlp/yt-dlp)
* [ffmpeg](https://ffmpeg.org/)

## Using

To use, run the Perl script with a name for the folder to create, and the video URL. For example:

```./yt-to-webpage.pl project-name "https://www.youtube.com/watch?v=jNQXAC9IVRw"```

## Output

Running the script create a repository according to the following structure:

```
project-name
├── images
│   └── (…).jpg
├── video.vtt
├── video.webm
├── index.html
└── styles.css
```

* The index.html file is the generated webpage.
* The images directory contains all the screenshots, named according to their timeframe ```hours-minutes-seconds-milliseconds.jpg```.
* The vtt file contains the captions.
* The webm file contains the video.
* The css file styles the webpage.

## Example

You can see an example at https://obra.github.io/Youtube2Webpage/example/
