import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import DatasetsList from 'components/datasets/datasets_list/component';
import DatasetForm from 'components/datasets/form/component';

import './styles.scss';


class SidebarComponent extends PureComponent {
  static propTypes = {
    open: PropTypes.bool.isRequired,
    datasets: PropTypes.array.isRequired,
    categories: PropTypes.array.isRequired,
    countries: PropTypes.array.isRequired,
    currentLayer: PropTypes.object,
    removeCurrentLayer: PropTypes.func,
    fetchGeoJSON: PropTypes.func,
    setDatasets: PropTypes.func
  };

  static defaultProps = {
    currentLayer: null,
    removeCurrentLayer: () => null,
    setDatasets: () => null,
    fetchGeoJSON: () => null
  };

  constructor(props) {
    super(props);
    this.state = {
      editMode: false,
      editableDataset: null,
      open: this.props.open,
      loading: false
    };
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.addNewDataset = this.addNewDataset.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
    this.handlePublish = this.handlePublish.bind(this);
    this.handleMultipartUpdate = this.handleMultipartUpdate.bind(this);
    this.updateDataset = this.updateDataset.bind(this);
    this.handleBackButton = this.handleBackButton.bind(this);
  }

  onToggleSidebar = () => {
    this.setState({ open: !this.state.open });
  };

  handleDelete(id) {
    this.setState({ loading: true });
    const csrf = document.querySelector("meta[name='csrf-token']").getAttribute('content');

    fetch(
      `/datasets/${id}`,
      {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json', 'X-CSRF-Token': csrf }
      }
    )
      .then(() => {
        this.deleteItem(id);
        this.setState({ loading: false });
      })
      .catch(() => this.setState({ loading: false }));
  }

  handleUpdate(dataset) {
    this.setState({ loading: true });
    const csrf = document.querySelector("meta[name='csrf-token']").getAttribute('content');

    fetch(
      `/datasets/${dataset.id}`,
      {
        method: 'PUT',
        body: JSON.stringify({ dataset }),
        headers: { 'Content-Type': 'application/json', 'X-CSRF-Token': csrf }
      }
    )
      .then(response => response.json())
      .then((data) => {
        this.updateDataset(data);
        this.setState({ editMode: !this.state.editMode, editableDataset: null, loading: false });
      })
      .catch(() => this.setState({ loading: false }));
  }

  handlePublish(dataset) {
    this.setState({ loading: true });
    const csrf = document.querySelector("meta[name='csrf-token']").getAttribute('content');

    fetch(`/datasets/${dataset.id}/publish`,
      {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', 'X-CSRF-Token': csrf }
      })
      .then(response => response.json())
      .then((data) => {
        this.updateDataset(data);
        this.setState({ loading: false });
      })
      .catch(() => this.setState({ loading: false }));
  }

  handleMultipartUpdate(dataset, id) {
    this.setState({ loading: true });
    const csrf = document.querySelector("meta[name='csrf-token']").getAttribute('content');

    fetch(
      `/datasets/${id}`,
      {
        method: 'PUT',
        headers: { 'X-CSRF-Token': csrf },
        body: dataset
      }
    )
      .then(response => response.json())
      .then((data) => {
        this.updateDataset(data);
        this.setState({ editMode: !this.state.editMode, editableDataset: null, loading: false });
      })
      .catch(() => this.setState({ loading: false }));
  }

  updateDataset(dataset) {
    const { setDatasets, datasets } = this.props;
    const datasetsList = datasets.map((item) => {
      if (item.id === dataset.id) {
        return dataset;
      }
      return item;
    });

    setDatasets(datasetsList);
  }

  handleEdit(id) {
    const editableDataset = this.props.datasets.find(dataset => dataset.id === id);
    this.setState({ editMode: !this.state.editMode, editableDataset });
  }

  deleteItem(id) {
    const { setDatasets } = this.props;
    const datasetsList = this.props.datasets.filter(dataset => dataset.id !== id);
    setDatasets(datasetsList);
  }

  handleFormSubmit(datasetData) {
    const body = datasetData;
    const csrf = document.querySelector("meta[name='csrf-token']").getAttribute('content');

    this.setState({ loading: true });

    fetch(
      '/datasets',
      {
        method: 'POST',
        headers: { 'X-CSRF-Token': csrf },
        body
      }
    )
      .then(response => response.json())
      .then((dataset) => {
        this.addNewDataset(dataset);
        this.setState({ editMode: !this.state.editMode, loading: false });
      })
      .catch(() => this.setState({ loading: false }));
  }

  addNewDataset(dataset) {
    const { setDatasets, datasets } = this.props;
    setDatasets(datasets.concat(dataset));
  }

  handleBackButton() {
    this.setState({ editMode: false, editableDataset: null });
  }

  toggleEditMode = () => {
    this.setState({ editMode: !this.state.editMode });
  }

  handleToggle = (dataset) => {
    const { currentLayer, removeCurrentLayer, fetchGeoJSON } = this.props;
    console.log(currentLayer)
    if (currentLayer && currentLayer.id.toString() === dataset.id.toString()) {
      removeCurrentLayer();
    } else {
      fetchGeoJSON(dataset);
    }
  }

  render() {
    const { currentLayer, datasets } = this.props;
    const { open, loading } = this.state;
    const classNames = classnames({
      'c-datasets-sidebar': true,
      '-open': !!open,
      'c-spinning-loader': !!loading
    });

    return (
      <div className={classNames}>
        <div className="overflow-container">
          <h3 className="title-header">My datasets</h3>

          {!this.state.editMode && !loading && !datasets.length &&
            <p className="description">
              Publish a dataset to send it for review.
              After approval, it will be shown on country page.
            </p>
          }

          {!this.state.editMode && !loading && datasets.length &&
            <p className="description">
              Click on a dataset to preview data on the map.
            </p>
          }

          {!this.state.editMode && !loading &&
            <DatasetsList
              datasets={datasets}
              handleEdit={this.handleEdit}
              handleDelete={this.handleDelete}
              handlePublish={this.handlePublish}
              handleToggle={this.handleToggle}
              currentLayer={currentLayer}
            />
          }

          {!this.state.editMode && !loading &&
            <button onClick={this.toggleEditMode} className="c-button -big">
              Upload dataset
            </button>
          }


          {this.state.editMode && !loading &&
            <DatasetForm
              handleFormSubmit={this.handleFormSubmit}
              handleBackButton={this.handleBackButton}
              handleMultipartUpdate={this.handleMultipartUpdate}
              handleUpdate={this.handleUpdate}
              editMode={this.state.editMode}
              categories={this.props.categories}
              countries={this.props.countries}
              dataset={this.state.editMode ? this.state.editableDataset : undefined}
            />
          }
        </div>

        <button
          className="toggle-btn"
          onClick={this.onToggleSidebar}
        >
          <span className="arrow" />
        </button>
      </div>
    );
  }
}

export default SidebarComponent;
