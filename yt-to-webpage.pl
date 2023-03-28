#!/usr/bin/perl

use warnings;
use strict;
use autodie;
my $slug = shift @ARGV; 
my $url = shift @ARGV;

if (!$url || $url !~ m|^https://www.youtube.com|) {
	print STDERR "Usage:\n";
	print STDERR "$0 project-name https://www.youtube.com/watch?v=jNQXAC9IVRw\n";
	exit 1;
}


mkdir($slug);
chdir($slug);
my $video_file = `yt-dlp --write-auto-subs --write-subs "$url" --print filename --no-simulate`;
chomp($video_file);
my $vtt = `ls *.vtt`;
chomp($vtt);
open(my $fh, "<", $vtt);
my $this_start = 0;
my $last_text_line = '';
my @timestamps;
my $out = "index.html";
-d  'images' || mkdir('images');

system("cp", "../styles.css", ".");

open (my $outfile, ">", $out); 
print $outfile <<EOF;
<html>
<head>
 <link rel="stylesheet" type="text/css" href="styles.css" />
 </head>
<body>


<h1>Youtube transcript</h1>
Source: <a href="@{[$url]}" target="_blank">@{[$url]}</a>

<ul>
EOF


my $timestamp_seen = 0;

while (my $line = <$fh>) {
	chomp $line;
	if (!$timestamp_seen) {
		if(  $line =~ /^\d\d:\d\d/ ) {
				$timestamp_seen = 1;
			} else {
			next;
		}
	}


		if ($line =~ /^\s*$/) { next}
		if ($line =~ /<\/c>$/) { next }
	if ($line =~ /(\d\d:\d\d:\d\d\.\d\d\d) --> (\d\d:\d\d:\d\d\.\d\d\d).*$/) {
		$this_start = $1;
		next;
	}
	if ($line eq $last_text_line) {
		next;
	}
	push @timestamps, $this_start;
	my $ts_filename = $this_start;
	$ts_filename =~ s/:/-/g;
	my $seconds;
	if ($this_start =~ /^(\d+):(\d+):(\d+)/) {
		my $hours = $1;
		my $minutes = $2;
		$seconds = $3;
		$seconds += $minutes  *60;
		$seconds += $hours * 3600;
	}

	print $outfile "<li>
	<div class=\"grab\"><img src=\"images/$ts_filename.jpg\" /></div><div class=\"subtitle\"><span id=\"$this_start\">$line</span>
<a href=\"@{[$url]}\&t=@{[$seconds]}\" target=\"blank\" class=\"videolink\">#</a>
	</div></li>\n";
	$last_text_line = $line;
}

print $outfile "
</ul>
</body>
</html>";


gen_images (@timestamps);

sub gen_images {
	my @timestamps = @_;	

	foreach my $timestamp (@timestamps) {
	my $ts_filename = $timestamp;
	$ts_filename =~ s/:/-/g;
		`ffmpeg -ss "$timestamp" -nostdin -i "$video_file"  -frames:v 1 -q:v "2" -vf scale=1024:-1  "images/$ts_filename.jpg"`;
	}

}
