import { Mongo } from 'meteor/mongo';


export default Videos = new Mongo.Collection('videos');

VideoStorage = new FS.Collection("videos", {
    stores: [new FS.Store.FileSystem("videos", {path: "~/soaptube_videos"})]
});

Meteor.methods({
    'video.download'(url) {
      let vid = new Video(url);
      vid.download('downloads');
    },

    'video.delete'(id) {
        Videos.remove(id);
    }
});



class Video {
    constructor(url) {
        this.url = url;
        this.db_id = Videos.insert({'url': url});
    }

    download(destPath) {
        const youtubedl = require('youtube-dl');
        const fs = require('fs');

        const video = youtubedl(this.url,
            ['--format=18'],
            {cwd: process.env.PWD }
        )
        let parent = this;
        //console.log(destPath);
        video.on('info', Meteor.bindEnvironment(function(info) {
            console.log('Download started')
            console.log('filename: ' + info._filename)
            console.log('size: ' + info.size)

            parent.video_info = info;
            Videos.update(parent.db_id, { $set: { video_info: parent.video_info }})
            video.pipe(fs.createWriteStream(destPath + '/' + info._filename))            
        }));

        video.on('error', function error(err) {
            console.log('error 2:', err)
        })   
        
        video.on('end', Meteor.bindEnvironment(function() {
            console.log('finished downloading!')

            let end_path = destPath + '/' + parent.video_info._filename
            VideoStorage.insert(end_path);            
            Videos.update(parent.db_id, { $set: { local_path: end_path }})
            parent.downloadSubs(destPath);
        }))
    }

    downloadSubs(destPath) {
        const youtubedl = require('youtube-dl');

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
            
            if (files.length > 0) {
                console.log('subtitle files downloaded:', files)
                VideoStorage.insert(options.cwd + '/' + files[0]);                
            }
          })
    }
}