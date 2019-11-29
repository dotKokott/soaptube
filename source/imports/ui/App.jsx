import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { withTracker } from 'meteor/react-meteor-data';
import Videos from '/imports/api/video';
import VideoUI from './Video.jsx';

class App extends Component {
  constructor(props) {
      super(props);
  }

  handleSubmit(event) {
    event.preventDefault();
        
    // Find the text field via the React ref
    const text = ReactDOM.findDOMNode(this.refs.textInput).value.trim();

    Meteor.call('video.download', text);
    // Clear form
    ReactDOM.findDOMNode(this.refs.textInput).value = '';    
  }

  renderVideos() {
    return this.props.videos.map((video) => (
      <VideoUI key={video._id} video={video} />
    ));
  }

  render() {
    return (
      <div className="container">
        <header>
          <h1>SoapTube!</h1>
            <form className="new-video" onSubmit={this.handleSubmit.bind(this)} >
                <input
                type="text"
                ref="textInput"
                placeholder="Type to add new tasks"
                />
            </form>
        </header>
        <ul>
          {this.renderVideos()}
        </ul>
      </div>
    );
  }
}

export default withTracker(() => {
    return {
        videos: Videos.find({}).fetch(),
        // incompleteCount: Tasks.find({ checked: { $ne: true } }).count(),
    };
})(App); 

