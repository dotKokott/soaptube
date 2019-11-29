# soaptube
Spin the decks of spoken word! Tool for mixing &amp; archiving (youtube?) videos.

## Roadmap

### Version 0.1 - Video Archive Manager (VAM)

**Wishlist**

* Archive youtube videos (+captions)
* Watch archived videos (+captions)
* Tag videos
* Search by tags
* Search by captions
* Manage archive (delete, update etc.)

### TODO (v0.1)

#### Setup
* Web! ~~Desktop?~~
* ~~What backend stack? (Node! ~~django? C#?~~)~~
* ~~What frontend stack? (Vue? React?....)~~
* Lets try Meteor.js!

  `meteor create --react app_name`

On first impression Meteor seems like a decent pick to learn the new chops of a full stack js web app.
The simple todo app tutorial was relatively intuitive. I guess most importantly to just pick something now that works & run with it.

**Decision:** I will go with Meteor for now, including MongoDB for storage.

#### Tasks

* ~~How to make a **download folder** outside of~~
~~`/Users/dotkokott/Desktop/Code/soaptube/source/.meteor/local/build/programs/server`~~~

  Video archive folder is now at `~/soaptube_videos`

* Delete video from temporary `downloads` location after moving it to VideoStorage

* Watch video (+ subtitles)