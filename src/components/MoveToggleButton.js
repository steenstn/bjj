import React from 'react';

const styles = {
  display: 'inline-block',
  borderRadius: '8px',
  margin: '0.2rem',
  padding: '0.1rem 0.4rem 0.1rem 0.4rem',
  backgroundColor: '#e6e6e6',
  fontSize: '0.9rem',
};

function MoveToggleButton(props) {
  return <div style={styles}>{props.movement.name}</div>;
}

export default MoveToggleButton;
