import React from 'react';
import PhotoUpload from './PhotoUpload';
import {uploadImage} from '../utils/photo';
import {addSite} from '../utils/sites';
import {isLoggedIn} from '../utils/auth';
import parseHashtags from 'parse-hashtags';
import Modal from 'react-modal';

// styles
import '../styles/components/CreateSection';

const appElement = document.getElementById('app');
Modal.setAppElement(appElement);
Modal.injectCSS();

export default class CreateSection extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalIsOpen: false,
      modalContent: false,
    };
    this.submit = this.submit.bind(this);
    this.selectLocationHandler = this.selectLocationHandler.bind(this);
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  componentWillMount() {
    this.props.setTopBar({
      title: 'Create',
    });
  }

  openModal() {
    if (!this.props.imageData) {
      this.setState({modalContent: (
        <div>
          <h1>Please upload a photo!</h1>
          <button onClick={this.closeModal}>Close</button>
        </div>
      )});
    } else if (!this.props.createFormLocation) {
      this.setState({modalContent: (
        <div>
          <h1>Please add a location!</h1>
          <button onClick={this.closeModal}>Close</button>
        </div>
      )});
    }
    this.setState({modalIsOpen: true});
  }

  closeModal() {
    this.setState({modalIsOpen: false});
  }

  submit(event) {
    event.preventDefault();
    if (!this.props.imageData) {
      this.openModal();
      throw new Error('imageData is null');
    }
    if (!this.props.userLocation && !this.props.childMapPosition) {
      this.openModal();
      throw new Error('No location selected');
    }
    uploadImage(this.props.imageData)
    .then(imageUrl => {
      const {latitude, longitude} = this.props.childMapPosition || this.props.userLocation;

      const siteInfo = {
        authData: isLoggedIn(),
        coords: {latitude, longitude},
        name: this.refs.name.getDOMNode().value,
        artist: this.refs.artist.getDOMNode().value,
        category: {
          streetArt: this.refs.streetArt.getDOMNode().checked,
          architecture: this.refs.architecture.getDOMNode().checked,
          sculpture: this.refs.sculpture.getDOMNode().checked,
          mural: this.refs.mural.getDOMNode().checked,
        },
        tags: parseHashtags(this.refs.tags.getDOMNode().value),
        description: this.refs.description.getDOMNode().value,
        imageUrl,
      };
      return addSite(siteInfo).then(() => {
        this.context.router.transitionTo('map');
        this.props.resetCreateSiteForm();
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
        <form onSubmit={this.submit}>
          <PhotoUpload {...this.props} />
          <h1 className="CreateSection__selectLocationBtn" onClick={this.selectLocationHandler}>Location: {this.props.createFormLocation ? 'Update Location' : 'Select Location'}</h1>
          <h3>{this.props.address}</h3>
          <label>Name
            <input type="text" data-name="name" ref="name" onChange={this.props.handleCreateSiteFormInputChange} value={this.props.createForm.name} />
          </label>
          <label>Artist
            <input type="text" data-name="artist" ref="artist" onChange={this.props.handleCreateSiteFormInputChange} value={this.props.createForm.artist} defaultValue="Unknown" />
          </label>
          <label>Category</label>
          <input type="checkbox" data-name="category" onChange={this.props.handleCreateSiteFormInputChange} value={this.props.createForm.streetArt} ref="streetArt"/>Street Art
          <input type="checkbox" data-name="category" onChange={this.props.handleCreateSiteFormInputChange} value={this.props.createForm.architecture} ref="architecture"/>Architecture
          <input type="checkbox" data-name="category" onChange={this.props.handleCreateSiteFormInputChange} value={this.props.createForm.sculpture} ref="sculpture"/>Sculpture
          <input type="checkbox" data-name="category" onChange={this.props.handleCreateSiteFormInputChange} value={this.props.createForm.mural} ref="mural"/>Mural
          <label>Hash Tags
            <input type="text" data-name="tags" ref="tags" onChange={this.props.handleCreateSiteFormInputChange} value={this.props.createForm.tags} />
          </label>
          <label>Description
            <input type="text" data-name="description" ref="description" onChange={this.props.handleCreateSiteFormInputChange} value={this.props.createForm.description} />
          </label>
          <input type="submit" />
        </form>
        <Modal
          isOpen={this.state.modalIsOpen}
          onRequestClose={this.closeModal}
          className="CreateSection__Modal"
        >
          {this.state.modalContent}
        </Modal>
      </div>
    );
  }
}

CreateSection.propTypes = {
  setTopBar: React.PropTypes.func.isRequired,
  location: React.PropTypes.object,
  childMapPosition: React.PropTypes.object,
  handleCreateSiteFormInputChange: React.PropTypes.func,
  createForm: React.PropTypes.object,
  createFormLocation: React.PropTypes.object,
  convertToAddress: React.PropTypes.func,
  resetCreateSiteForm: React.PropTypes.func,
  address: React.PropTypes.string,
  imageData: React.PropTypes.string,
  userLocation: React.PropTypes.object,
};

CreateSection.contextTypes = {
  router: React.PropTypes.func.isRequired,
};
