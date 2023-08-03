# Youtube-to-Webpage

Youtube-to-Webpage is a Perl script to create a Webpage from a Youtube hosted video. The HTML webpage contains a transcript of the video from the closed captions, including a screenshot every 3 seconds or so.

```./yt-to-webpage.pl project-name videoURL```

## Using

To use, simply run the Perl script with a name for the folder to create, and the video URL such as:

```./yt-to-webpage.pl project-name https://www.youtube.com/watch?v=jNQXAC9IVRw```

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

* The images repository contains all the screenshots, named according to their timeframe ```hours-minutes-seconds-milliseconds.jpg```.
* The vtt file contains the captions.
* The webm file contains the video.
* The html file is the generated webpage one can open through a common browser.
* The css file, styles the webpage.

## Example

You can see an example at https://obra.github.io/Youtube2Webpage/example/
