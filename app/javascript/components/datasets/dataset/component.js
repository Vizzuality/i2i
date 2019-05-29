import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

class Dataset extends PureComponent {
  static propTypes = {
    dataset: PropTypes.shape({
      id: PropTypes.number.isRequired,
      status: PropTypes.oneOf(['unpublished', 'pending', 'published']).isRequired,
      name: PropTypes.string.isRequired
    }).isRequired,
    handleEdit: PropTypes.func.isRequired,
    handleDelete: PropTypes.func.isRequired,
    handlePublish: PropTypes.func.isRequired,
    handleToggle: PropTypes.func.isRequired,
  };

  handleEdit = () => this.props.handleEdit(this.props.dataset.id);

  handleDelete = () => this.props.handleDelete(this.props.dataset.id);

  handlePublish = () => this.props.handlePublish(this.props.dataset);

  handleToggle = () => this.props.handleToggle(this.props.dataset);

  render() {
    const showPublishButton = this.props.dataset.status === 'unpublished';

    return (
      <div>
        <div className="status-row">
          <div className="status">
            {this.props.dataset.status}
          </div>
          <button onClick={this.handleToggle}>enable</button>
        </div>

        <p className="name">{this.props.dataset.name}</p>

        <div className="actions">
          <button
            className="action-button"
            onClick={this.handleEditle}
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
