import React, { Component } from 'react';
//import { Videos } from '../api/video.js';

export default class VideoUI extends Component {
    // toggleChecked() {
    //     // Set the checked property to the opposite of its current value
    //     Tasks.update(this.props.task._id, {
    //       $set: { checked: !this.props.task.checked },
    //     });
    //   }
    
    delete() {  
        Meteor.call('video.delete', this.props.video._id); 
    }

    render() {
        //const taskClassName = this.props.task.checked ? 'checked' : '';

        return (
        <li>
            <button className="delete" onClick={this.delete.bind(this)}>
            &times;
            </button>
            <span className="text">{this.props.video.url} => {this.props.video.local_path}</span>
        </li>
        );
  }
}