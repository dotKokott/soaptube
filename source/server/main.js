import { Meteor } from 'meteor/meteor';
import Video from '/imports/api/video';

Meteor.startup(() => {
  VideoStorage.allow({
    'insert': function () {
      // add custom authentication code here
      return true;
    }
  });
});
