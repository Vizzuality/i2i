import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import DatasetsList from 'components/datasets_list/component';
import NewDataset from 'components/datasets/form/component';

import './styles.scss';


class SidebarComponent extends PureComponent {
  static propTypes = {
    open: PropTypes.bool.isRequired,
    active: PropTypes.bool.isRequired
  }

  constructor(props) {
    super(props);
    this.state = {
      datasets: this.props.datasets,
      editMode: false,
      editableDataset: null
    };
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.addNewDataset = this.addNewDataset.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.deleteFruit = this.deleteFruit.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
    this.handleMultipartUpdate = this.handleMultipartUpdate.bind(this);
    this.updateDataset = this.updateDataset.bind(this);
    this.handleBackButton = this.handleBackButton.bind(this);
  }

  handleDelete(id) {
    const csrf = document.querySelector("meta[name='csrf-token']").getAttribute("content");

    fetch(`/datasets/${id}`,
    { method: 'DELETE', headers: { 'Content-Type': 'application/json', 'X-CSRF-Token': csrf } })
      .then((response) => { this.deleteFruit(id); });
  }

  handleUpdate(dataset) {
    const csrf = document.querySelector("meta[name='csrf-token']").getAttribute("content");

    fetch(`/datasets/${dataset.id}`,
      {
        method: 'PUT',
        body: JSON.stringify({ dataset: dataset }),
        headers: { 'Content-Type': 'application/json', 'X-CSRF-Token': csrf }
      }).then((response) => {
      this.updateDataset(dataset);
      this.setState({editMode: !this.state.editMode});
    });
  }

  handleMultipartUpdate(dataset, id) {
    const csrf = document.querySelector("meta[name='csrf-token']").getAttribute("content");

    fetch(`/datasets/${id}`,
      {
        method: 'PUT',
        headers: { 'X-CSRF-Token': csrf },
        body: dataset
      }).then((response) => {
      this.updateDataset(dataset);
      this.setState({ editMode: !this.state.editMode });
    });
  }

  updateDataset(dataset){
    const datasetsList = this.state.datasets.filter(ds => ds.id !== dataset.id);
    datasetsList.push(dataset);

    this.setState({ datasets: datasetsList });
  }

  handleEdit(id) {
    const editableDataset = this.state.datasets.find(dataset => dataset.id === id);

    this.setState({ editMode: !this.state.editMode, editableDataset });
  }

  deleteFruit(id) {
    const datasetsList = this.state.datasets.filter((dataset) => dataset.id !== id);
    this.setState({ datasets: datasetsList });
  }



  handleFormSubmit(datasetData) {
    console.log(datasetData);

    // const body = JSON.stringify({ dataset: { ...datasetData } });
    const body = datasetData;
    const csrf = document.querySelector("meta[name='csrf-token']").getAttribute('content');

    fetch('/datasets', {
      method: 'POST',
      headers: { 'X-CSRF-Token': csrf },
      body
    }).then((response) => { return response.json(); })
      .then((dataset) => {
        this.addNewDataset(dataset);
        this.setState({editMode: !this.state.editMode});
      });
  }

  handleBackButton() {
    this.setState({ editMode: false, editableDataset: null });
  }

  addNewDataset(dataset) {
    console.log(dataset)
    this.setState({ datasets: this.state.datasets.concat(dataset) });
  }

  componentDidMount() {
    fetch('/datasets.json')
      .then((response) => { return response.json(); })
      .then((data) => { this.setState({ datasets: data }); });
  }

  onToggleSidebar = () => {
    const { open } = this.props;

    // setOpenSidebar(!open);
  }

  toggleEditMode = () => {
    this.setState({ editMode: !this.state.editMode });
  }

  render() {
    const { open, active } = this.props;
    const classNames = classnames({
      'c-sidebar': true,
      '-open': !!open
    });

    return (
      <div className={classNames}>
        <div className="overflow-container">
          {!this.state.editMode &&
            <p className="description">
              Click on a dataset to preview data on the map.<br/>
              Publish a dataset to send it for review. After approval, it will be shown on country page.
            </p>
          }

          {!this.state.editMode &&
            <DatasetsList datasets={this.state.datasets} handleEdit={this.handleEdit} handleDelete={this.handleDelete} />
          }

          {!this.state.editMode &&
            <button onClick={this.toggleEditMode} className="c-button -big">
              Upload dataset
            </button>
          }


          {this.state.editMode &&
            <NewDataset handleFormSubmit={this.handleFormSubmit} handleBackButton={this.handleBackButton} handleMultipartUpdate={this.handleMultipartUpdate} handleUpdate={this.handleUpdate} editMode={this.state.editMode} categories={this.props.categories} countries={this.props.countries} dataset={this.state.editMode ? this.state.editableDataset : undefined}/>
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
