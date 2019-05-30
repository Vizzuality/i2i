import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

class Dataset extends PureComponent {
  static propTypes = {
    dataset: PropTypes.shape({
      id: PropTypes.number.isRequired,
      status: PropTypes.oneOf(['unpublished', 'pending', 'published']).isRequired,
      name: PropTypes.string.isRequired,
      csv_is_valid: PropTypes.bool.isRequired,
      csv_errors: PropTypes.string
    }).isRequired,
    handleEdit: PropTypes.func.isRequired,
    handleDelete: PropTypes.func.isRequired,
    handlePublish: PropTypes.func.isRequired,
    handleToggle: PropTypes.func.isRequired,
    currentLayer: PropTypes.object
  };

  static defaultProps = { currentLayer: null };

  handleEdit = () => this.props.handleEdit(this.props.dataset.id);

  handleDelete = () => this.props.handleDelete(this.props.dataset.id);

  handlePublish = () => this.props.handlePublish(this.props.dataset);

  handleToggle = () => this.props.handleToggle(this.props.dataset);

  render() {
    const showPublishButton = this.props.dataset.status === 'unpublished' && this.props.dataset.csv_is_valid;
    const { currentLayer, dataset } = this.props;

    return (
      <div>
        <div className="status-row">
          <div className="status">
            {dataset.status}
          </div>
          <button className="" onClick={this.handleToggle}>
            {currentLayer && currentLayer.id.toString() === dataset.id.toString() ? 'disable' : 'enable'}
          </button>
        </div>

        <p className="name">{this.props.dataset.name}</p>

        { this.props.dataset.csv_errors &&
          <p className="errors">{this.props.dataset.csv_errors}</p>
        }

        <div className="actions">
          <button
            className="action-button"
            onClick={this.handleEdit}
          >
            Edit
          </button>
          <button
            className="action-button"
            onClick={this.handleDelete}
          >
            Delete
          </button>

          { showPublishButton &&
            <button
              className="action-button publish-button"
              onClick={this.handlePublish}
            >
              Publish
            </button>
          }
        </div>
      </div>
    );
  }
}

export default Dataset;
