import React from 'react';

class Dataset extends React.Component {
  render() {
    return (
      <div>
        <div className="status-row">
          <div className="status">
            Unpublished
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
          <button className="action-button publish-button"
                  onClick={() => console.log("Publish button clicked")}>
            Publish
          </button>
        </div>

      </div>
    );
  }
}

export default Dataset;
