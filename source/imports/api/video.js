import { Mongo } from 'meteor/mongo';

const fs = require('fs')
const path = require('path')
const youtubedl = require('youtube-dl');


export default class Video {
    constructor(url, name) {
        this.url = url;
        this.name = name;
    }

    download(destPath) {
        const video = youtubedl(this.url,
            ['--format=18'],
            {cwd: process.env.PWD }
        )
        let parent = this;
        //console.log(destPath);
        video.on('info', function(info) {
            console.log('Download started')
            console.log('filename: ' + info._filename)
            console.log('size: ' + info.size)

            parent.video_info = info;

            video.pipe(fs.createWriteStream(destPath + '/' + info._filename))
        })

        video.on('error', function error(err) {
            console.log('error 2:', err)
        })   
        
        video.on('end', function() {
            console.log('finished downloading!')
    
            parent.downloadSubs(destPath);
        })
    }

    downloadSubs(destPath) {
        const options = {
            // Write automatic subtitle file (youtube only)
            auto: true,
            // Downloads all the available subtitles.
            all: false,
            // Subtitle format. YouTube generated subtitles
            // are available ttml or vtt.
            format: 'vtt',
            // Languages of subtitles to download, separated by commas.
            lang: 'en',
            // The directory to save the downloaded files in.
            cwd: process.cwd() + '/' + destPath,
          }
          
          youtubedl.getSubs(this.url, options, function(err, files) {
            if (err) throw err
          
            console.log('subtitle files downloaded:', files)
          })
    }
}