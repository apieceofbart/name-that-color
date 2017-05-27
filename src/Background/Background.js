import React from 'react';
import './Background.css';

const Background = ({ color }) => {
  const styles = {
    backgroundColor: `#${color}`
  };

  return (
    <div className="background" style={styles} />
)};

export default Background;
