import React from 'react';
import PhotoUpload from './PhotoUpload';
import {uploadImage} from '../utils/photo';
import {addSite} from '../utils/sites';

// styles
import '../styles/components/CreateSection';

export default class CreateSection extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      imageData: null,
    };
    this._submit = this._submit.bind(this);
    this._setImageData = this._setImageData.bind(this);
    this.selectLocationHandler = this.selectLocationHandler.bind(this);
  }
  _setImageData(imageData, userLocation) {
    this.setState({imageData, userLocation});
  }
  _submit(event) {
    event.preventDefault();
    if (!this.state.imageData) throw new Error('imageData is null');
    uploadImage(this.state.imageData)
    .then(imageUrl => {
      const {latitude, longitude} = this.props.childMapPosition || this.state.userLocation.coords;
      const siteInfo = {
        coords: {latitude, longitude},
        name: this.refs.name.getDOMNode().value,
        artist: this.refs.artist.getDOMNode().value,
        category: {
          streetArt: this.refs.streetArt.getDOMNode().checked,
          architecture: this.refs.architecture.getDOMNode().checked,
        },
        tags: this.refs.tags.getDOMNode().value.split(' '),
        description: this.refs.description.getDOMNode().value,
        imageUrl,
      };
      return addSite(siteInfo).then(() => {
        this.context.router.transitionTo('map');
      });
    })
    .catch(error => console.error(error)); // eslint-disable-line no-console
  }

  selectLocationHandler() {
    this.context.router.transitionTo('create-locationselector');
  }

  render() {
    return (
      <div className="CreateSection">
        <h2>Create Site Here</h2>
        <form onSubmit={this._submit}>
          <PhotoUpload setImageData={this._setImageData}/>
          <h1 className="CreateSection__selectLocationBtn" onClick={this.selectLocationHandler}>Select Location</h1>
          <label>Name
            <input type="text" name="name" ref="name" />
          </label>
          <label>Artist
            <input type="text" name="artist" ref="artist"/>
          </label>
          <label>Category</label>
          <input type="checkbox" name="category" value="Street Art" ref="streetArt"/>Street Art
          <input type="checkbox" name="category" value="Architecture" ref="architecture"/>Architecture
          <label>Tags
            <input type="text" name="tags" ref="tags"/>
          </label>
          <label>Description
            <input type="text" name="description" ref="description"/>
          </label>
          <input type="submit" />
        </form>
      </div>
    );
  }
}

CreateSection.propTypes = {
  location: React.PropTypes.object,
  childMapPosition: React.PropTypes.object,
};
CreateSection.contextTypes = {
  router: React.PropTypes.func.isRequired,
};
