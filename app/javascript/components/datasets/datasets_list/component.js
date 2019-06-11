import React from 'react';
import Dataset from 'components/datasets/dataset/component';

import './styles.scss';

const DatasetsList = (props) => {
  const datasets = props.datasets.map(dataset => (
    <div key={dataset.id} className="dataset-box">
      <Dataset
        dataset={dataset}
        handleDelete={props.handleDelete}
        handleEdit={props.handleEdit}
        handlePublish={props.handlePublish}
        handleToggle={props.handleToggle}
      />
    </div>
  ));

  return (
    <div className="datasets-list">
      {datasets}
    </div>
  );
};

export default DatasetsList;
