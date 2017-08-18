import React from 'react'
import SvgMap from './SvgMap'
import PropTypes from 'prop-types'

class Graph extends React.Component {

    render() {
      return (
            <g>
                { this.props.nodes.map(node => { return node } ) }
            </g>
      );
    }
  }
  export default SvgMap(Graph);