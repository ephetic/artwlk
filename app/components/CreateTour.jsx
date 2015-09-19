import React from 'react';
import {Draggable, Droppable} from 'react-drag-and-drop';
import {addTour} from '../utils/tours';

export default class CreateTour extends React.Component {
  constructor(props) {
    super(props);
    this.onDrop = this.onDrop.bind(this);
    this.save = this.save.bind(this);
    this.selectSites = this.selectSites.bind(this);
  }

  onDrop(targetId, {site: droppedId}) {
    const sites = this.props.selectedSites.slice();
    const droppedIndex = sites.findIndex(site => site.id === droppedId);
    const [dropped] = sites.splice(droppedIndex, 1);
    const targetIndex = sites.findIndex(site => site.id === targetId);
    sites.splice(targetIndex === droppedIndex ? targetIndex + 1 : targetIndex, 0, dropped);
    this.props.reorderSites(sites);
  }

  save() {
    addTour({
      title: this.refs.title.getDOMNode().value,
      descriptions: this.refs.description.getDOMNode().value,
      sites: this.props.selectedSites,
    }).then(() => {
      this.props.saveTourFormData({
        title: '',
        description: '',
      });

      this.props.selectSites([]);
      this.refs.title.getDOMNode().value = '';
      this.refs.description.getDOMNode().value = '';
      this.context.router.transitionTo('tours');
    });
  }

  selectSites() {
    this.props.saveTourFormData({
      title: this.refs.title.getDOMNode().value,
      description: this.refs.description.getDOMNode().value,
    });

    this.context.router.transitionTo('create-tour-site-selector');
  }

  render() {
    const list = this.props.selectedSites.map(n => {
      return (
        <div>
          <Droppable
              types={['site']}
              onDrop={this.onDrop.bind(null, n.id)}>
              <Draggable type="site" data={n.id}><li>{n.name}</li></Draggable>
          </Droppable>
        </div>
      );
    });

    return (
      <div>
        <h1>Create Tour</h1>
        <label>
          Title
          <input type="text" ref="title" defaultValue={this.props.tourFormData && this.props.tourFormData.title} />
        </label>
        <label>
          Description
          <input type="text" ref="description" defaultValue={this.props.tourFormData && this.props.tourFormData.description} />
        </label>
        <ul>
          {list}
        </ul>
        <button onClick={this.selectSites}>Select Sites</button>
        <button onClick={this.save}>Save</button>
      </div>
    );
  }
}

CreateTour.contextTypes = {
  router: React.PropTypes.func.isRequired,
};

CreateTour.propTypes = {
  selectedSites: React.PropTypes.array.isRequired,
  reorderSites: React.PropTypes.func.isRequired,
  saveTourFormData: React.PropTypes.func.isRequired,
  tourFormData: React.PropTypes.object.isRequired,
  selectSites: React.PropTypes.func.isRequired,
};
