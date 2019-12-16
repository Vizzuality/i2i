import React, { Fragment, useState } from 'react';
import classnames from 'classnames';
import Icon from 'components/icon';
import videos from './constants';


import './styles.scss';

const List = () => {
  const [video, setState] = useState({
    src: '',
    id: '',
    isActive: true
  });

  const handleClick = (item) => {
    const { src, id } = item;
    setState({
      src,
      id,
      active: true
    });
  };

  const closeModal = () => {
    setState({ active: false });
  };

  return (
    <Fragment>
      <div className={classnames(
        'video-overlay', { '-hidden': !video.active }
      )}
      >
        <button className="modal-close" onClick={closeModal} id="close-button">x</button>

        {video && <iframe
          title={video.id}
          src={video.src}
          frameBorder="0"
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
        }

      </div>
      <div className="c-header-list">
        <h1>Do you want to know more?</h1>
        <ul>
          {videos.map(item => (
            <li className="list-item">
              <Icon
                name="play"
                className="-small"
              />
              <button onClick={() => handleClick(item)}>
                {item.id}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </Fragment>
  );
};

export default List;
