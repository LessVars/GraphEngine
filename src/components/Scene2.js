import React from 'react'
import Graph from './Graph'
import PropTypes from 'prop-types'
import Node from './Node'
import { ContextMenu, MenuItem, ContextMenuTrigger } from "react-contextmenu";

class Scene2 extends React.Component {

    static propTypes = {
        height: PropTypes.number.isRequired,
        width : PropTypes.number.isRequired
    }

    constructor(){
        super()

        this.state = {
            nodes : []
        }

        // console.log(this.state)
        this.handleClick = this.handleClick.bind(this)
    }

    handleClick(e, data) {
        console.log('mou hahahahahha')
        // console.log(`Mouse nativeEvent Offset: (${e.nativeEvent.offsetX}, ${e.nativeEvent.offsetY})`)
        // console.log(`Mouse Position: (${e.screenX}, ${e.screenY})`)
        let tempNodes = Array.from(this.state.nodes)
        tempNodes.push(<Node key={ Date.now() } x={ e.screenX } y={ e.screenY } />)
        this.setState({ nodes: tempNodes})
    }

    render() {
      return (
        <div>
            <ContextMenuTrigger id="some_unique_identifier" holdToDisplay={ -1 }>
                <Graph height={ this.props.height } width={ this.props.width } nodes={ this.state.nodes }/>
            </ContextMenuTrigger>
        
            <ContextMenu id="some_unique_identifier">
                <MenuItem data={ { hello: 'world' } } onClick={this.handleClick}>
                    Create New Node
                </MenuItem>
                <MenuItem data={ { hello: 'world' } } onClick={this.handleClick}>
                    ContextMenu Item 2
                </MenuItem>
                <MenuItem divider />
                <MenuItem data={ { hello: 'world' } } onClick={this.handleClick}>
                    ContextMenu Item 3
                </MenuItem>
            </ContextMenu>
        </div>
      );
    }
  }
  export default Scene2;