import React from 'react';
import Dataset from 'components/datasets/dataset/component';

const DatasetsList = (props) => {
  const datasets = props.datasets.map((dataset) => {
    return (
      <div key={dataset.id} className="dataset-box">
        <Dataset
          dataset={dataset}
          handleDelete={props.handleDelete}
          handleEdit={props.handleEdit}
          handlePublish={props.handlePublish}
        />
      </div>
    );
  });

  return (
    <div className="datasets-list">
      {datasets}
    </div>
  );
};

export default DatasetsList;
