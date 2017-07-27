import React, { Component } from 'react';

class PriceChart extends Component {
  constructor(){
    super();
    this.state = {
      count: 0
    }
    this.renderEthPrice = this.renderEthPrice.bind(this);
  }
  renderEthPrice(){
    console.log('you are here!');
    // this.state.count++;
    let state = this;
    console.log('this is the count', this.state.count);
    if(this.state.count === 0){
      let baseUrl = "https://widgets.cryptocompare.com/";
      let scripts = document.getElementsByTagName("script");
      let embedder = scripts[ scripts.length - 1 ];
      (function (){
      let appName = encodeURIComponent(window.location.hostname);
      if(appName==""){appName="local";}
      let s = document.createElement("script");
      s.type = "text/javascript";
      s.async = true;
      let theUrl = baseUrl+'serve/v2/coin/chart?fsym=ETH&tsym=USD&period=3M';
      s.src = theUrl + ( theUrl.indexOf("?") >= 0 ? "&" : "?") + "app=" + appName;
      console.log(embedder.parentNode.firstChild.nextSibling.firstChild.nodeName);
      embedder.parentNode.appendChild(s);
      state.state.count++;
      })();
    }
  }
  render(){
    return(
      <div>
        {this.renderEthPrice()}
      </div>
    )
  }
}
export default PriceChart;