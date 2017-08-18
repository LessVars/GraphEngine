import React from 'react'
import SvgMap from './SvgMap'

class TestComp extends React.Component {

    handleClick(e){
        console.log('click rect')
    }

    handleClick2(e){
        console.log('click circle')
    }

    render() {
      return (
        <g>
          <circle r="50" fill="teal" stroke="black" onClick={  this.handleClick2.bind(this) } ></circle>
          <rect height="100" width="100" fill="black" stroke="teal" onClick={ this.handleClick.bind(this) } ></rect>
        </g>
      );
    }
  }
  export default SvgMap(TestComp);