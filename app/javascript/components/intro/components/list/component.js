import React, { Fragment } from 'react';
import Icon from 'components/icon';


import './styles.scss';

const List = () => (
  <Fragment>
    <div className="c-header-list">
      <h1>Do you want to know more?</h1>
      <ul>
        <li className="list-item">
          <Icon
            name="play"
            className="-small"
          />
          <a href="https://www.youtube.com/watch?v=BbNzIzmpRXg" target="_blank" rel="noopener noreferrer">
            Financial service providers
          </a>
        </li>

        <li className="list-item">
          <Icon
            name="play"
            className="-small"
          />
          <a href="https://www.youtube.com/watch?v=pH9nwDL3Tfg&t=67s" target="_blank" rel="noopener noreferrer">
            Regulators
          </a>
        </li>

        <li className="list-item">
          <Icon
            name="play"
            className="-small"
          />
          <a href="https://www.youtube.com/watch?v=K-0rCW0ijII&t=91s" target="_blank" rel="noopener noreferrer">
            Insurance
          </a>
        </li>
      </ul>
    </div>
  </Fragment>
);


export default List;
