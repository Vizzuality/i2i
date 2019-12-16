import React, { Fragment, useState } from 'react';
import classnames from 'classnames';
import Icon from 'components/icon';
import videos from './constants';


import './styles.scss';

const List = () => {
  const [video, setState] = useState({
    src: '',
    title: '',
    id: '',
    active: false
  });

  const handleClick = (id) => {
    const { src, title } = videos[id];

    setState({
      ...video,
      src,
      title,
      id,
      active: true
    });
  };

  const closeModal = () => {
    setState({
      ...video,
      active: false
    });
  };

  return (
    <Fragment>
      <div className={classnames(
        'video-overlay', { '-hidden': !video.active }
      )}
      >
        <button className="modal-close" onClick={closeModal} id="close-button">x</button>

        {video.title && <iframe
          title={videos[video.id].title}
          src={videos[video.id].src}
          frameBorder="0"
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      }

      </div>
      <div className="c-header-list">
        <h1>Do you want to know more?</h1>
        <ul>
          <li className="list-item">

            <Icon
              name="play"
              className="-small"
            />
            <button onClick={() => handleClick('Financial service providers')}>
              Financial service providers
            </button>
          </li>
          <li className="list-item">
            <Icon
              name="play"
              className="-small"
            />
            <button onClick={() => handleClick('Regulators')}>
              Regulators
            </button>
          </li>

          <li className="list-item">
            <Icon
              name="play"
              className="-small"
            />
            <button onClick={() => handleClick('Insurance')}>
              Insurance
            </button>
          </li>
        </ul>
      </div>
    </Fragment>
  );
};

export default List;
