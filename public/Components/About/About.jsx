import React, { Component } from 'react';
import Paragraph from './Paragraph.jsx';
import info from './about.js';
import './about.css';

const About = (props) => {
  
  let paragraphs = info.map((section, idx) => (
    <Paragraph title={section.title} text={section.text}/>
  ));

  return (
    <div id="about">
      {paragraphs}
    </div>
  );
};

module.exports = About;
