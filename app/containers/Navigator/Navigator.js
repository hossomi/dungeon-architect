import React from 'react';
import PropTypes from 'prop-types';
import './style.scss';

class Navigator extends React.Component {
  renderRoom = (room) => (
    <a key={room.id}>{room.name} <span style={{ float: 'right' }}>#{room.id}</span></a>
  )

  render() {
    const { rooms } = this.props;
    return (
      <div className="navigator">
        <h1>Dungeon Architect</h1>
        <h2>Rooms</h2>
        {rooms.map(this.renderRoom)}
      </div>
    );
  }
}

Navigator.propTypes = {
  rooms: PropTypes.array
};

Navigator.defaultProps = {
  rooms: []
};

export default Navigator;
