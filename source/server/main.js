import { Meteor } from 'meteor/meteor';
import Links from '/imports/api/links';
import Video from '/imports/api/video';

function insertLink(title, url) {
  Links.insert({ title, url, createdAt: new Date() });
}

Meteor.startup(() => {
  // const vid = new Video('https://www.youtube.com/watch?v=mD66opUGI2o', 'Terence');
  // vid.download('downloads');
});
