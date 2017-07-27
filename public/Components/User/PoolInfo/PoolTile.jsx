import React from 'react';

const PoolTile = (props) => {
  let glyph = props.glyph
  let button = null
  let rowDetail = `${props.rowNum}-detail`
  if(props.title === "Your Dividend") {
    rowDetail = `${props.rowNum}-revdetail`
    button = <button className="collectButton" onClick={props.getDiv}>Collect</button>
  }
  
  if(props.title === "Your Dividend" && props.detail.slice(0,2) === '0 ' ) {
    rowDetail = `${props.rowNum}-zerodetail`
    button = null
  }
  if(props.glyph === 'fa fa-line-chart') {
    glyph = 'linechart'
  }
  const rowItem = `${props.rowNum}-item`
  const rowTitle = `${props.rowNum}-title`

  return (
  <div className={rowItem} >
    <i className={props.glyph} id={glyph} aria-hidden="true"></i>
    <span className={rowTitle}>{props.title}</span>
    <span className={rowDetail}>{props.detail}</span>
    {button}
  </div>
  );
};

export default PoolTile;