import React from 'react';
//import $ from 'jquery';
import Data from './data';

export default class App extends React.Component {
  render() {
    return (
      <div className="app">
        <div className="header">
          <div className="num-spots">
            <div className="num-spots-title">Total Spots</div>
            <div className="num-spots">{Data.totalSpots}</div>
          </div>
          <div className="num-spots">
            <div className="num-spots-title">Total Spend</div>
            <div className="num-spots">${Data.totalSpend}</div>
          </div>
          <div className="num-spots">
            <div className="num-spots-title">Total Views</div>
            <div className="num-spots">{Data.totalViews}</div>
          </div>
        </div>
        <div className="by-creative">
          <div>BY CREATIVE</div>
          {Object.values(Data.creatives).map((creative) => {
            return (
              <div className="by-creative-row">
                <div>{creative.name}</div>
                <div>${creative.totalSpend}</div>
                <div>{creative.totalViews}</div>
                <div>{creative.CPV}</div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  componentDidMount() {
    console.log(Data);
  }
}
