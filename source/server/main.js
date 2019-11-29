import { Meteor } from 'meteor/meteor';
import Links from '/imports/api/links';
const youtubedl = require('youtube-dl')

function insertLink(title, url) {
  Links.insert({ title, url, createdAt: new Date() });
}

Meteor.startup(() => {
  
});
