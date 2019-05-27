import React from 'react';

class Dataset extends React.Component {
  render() {
    const showPublishButton = this.props.dataset.status === 'unpublished';

    return (
      <div>
        <div className="status-row">
          <div className="status">
            {this.props.dataset.status}
          </div>
          <div className="publish-icon"></div>
        </div>

        <p className="name">{this.props.dataset.name}</p>

        <div className="actions">
          <button className="action-button"
                  onClick={() => this.props.handleEdit(this.props.dataset.id)}>
            Edit
          </button>
          <button className="action-button"
                  onClick={() => this.props.handleDelete(this.props.dataset.id)}>
            Delete
          </button>

          { showPublishButton &&
            <button
              className="action-button publish-button"
              onClick={() => this.props.handlePublish(this.props.dataset)}
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
