import ReactDOM from 'react-dom';
import React, { Component } from 'react';

// this is the wrong html, is missing in repo
import htmlFile from '../../bower_components/google-code-prettify/styles/index.html';

import './smartContract.css';
import '../../bower_components/google-code-prettify/styles/sunburst.css';
import sunburst from './sunburst.js';

class SmartContract extends Component {
  constructor(props) {
    super(props);
    this.state = {
      toggle: false
    }
  }
  componentDidMount() {
    setTimeout(() => {
      this.setState({
        toggle: !this.state.toggle
      })
    }, 5000)
    sunburst();
  }


  render() {
    console.log('the state', this.state.toggle)
    return(
      
      <div id="documentation">
        <div className="smart-contract" dangerouslySetInnerHTML={{__html:htmlFile}}/>
      </div> 
    )
  }
}


export default SmartContract

