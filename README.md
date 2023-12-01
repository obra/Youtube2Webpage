# Youtube-to-Webpage

Youtube-to-Webpage is a Perl script to create a webpage from a Youtube video with a transcript generated from the video's closed captions paired with screenshots of the video.

```./yt-to-webpage.pl project-name "videoURL"```

## Dependencies

The project is built upon:

* [Perl](https://www.perl.org/) (duh)
* [yt-dlp](https://github.com/yt-dlp/yt-dlp)
* [ffmpeg](https://ffmpeg.org/)

**Check you have those installed, and they're updated (especially yt-dlp thanks to Youtube's API changes).**

If you don't have any Perl interpreter, feel free to check the portable version of [Strawberry Perl](https://strawberryperl.com/) as recommended on the [official Perl's download page](https://www.perl.org/get.html).

## Using

No installation needed. To use, run the Perl script with a name for the folder to create, and the video URL. For example:

```./yt-to-webpage.pl project-name "https://www.youtube.com/watch?v=jNQXAC9IVRw"```

**As of now, the script seems to only work under UNIX environments. We'd be happy to receive help for a port to Windows.**

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
