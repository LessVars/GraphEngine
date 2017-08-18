import React from 'react'
import PropTypes from 'prop-types'
import Node from './Node'
import tile from '../images/tile.png'
import { ContextMenu, MenuItem, ContextMenuTrigger } from "react-contextmenu";
import { ReactSVGPanZoom, TOOL_NONE, TOOL_AUTO, TOOL_PAN, TOOL_ZOOM_IN, TOOL_ZOOM_OUT} from 'react-svg-pan-zoom'
import { AutoSizer } from 'react-virtualized'


const svgStyle = {
    // background: '#333',
    // color: '#fff',
    // textAlign: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
    backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 7px, rgba(0, 0, 0, 0.2) 1px, transparent 8px), repeating-linear-gradient(90deg, transparent, transparent 7px, rgba(0, 0, 0, 0.2) 1px, transparent 8px)',
    backgroundSize: '8px 8px',
    margin: 0,
    padding: '8px'
}

export default class Scene extends React.Component{

    static propTypes = {
        height: PropTypes.number.isRequired,
        width : PropTypes.number.isRequired
    }

    constructor(){
        super()

        this.state = {
            components : []
        }

        // console.log(this.state)
        this.handleClick = this.handleClick.bind(this)
    }

    handleClick(e, data) {
        // console.log(`Mouse nativeEvent Offset: (${e.nativeEvent.offsetX}, ${e.nativeEvent.offsetY})`)
        // console.log(`Mouse Position: (${e.screenX}, ${e.screenY})`)
        let tempComps = Array.from(this.state.components)
        tempComps.push(<Node key={ Date.now() } x={ e.screenX } y={ e.screenY } />)
        this.setState({components: tempComps})
    }

    render(){
        return(
            <div>
                <ContextMenuTrigger id="some_unique_identifier" holdToDisplay={ -1 }>
                    <ReactSVGPanZoom  width={this.props.width} height={this.props.height}>

                        <svg 
                            height = { 800 } 
                            width  = { 1440  } 
                            style  = { svgStyle }>

                            <defs>
                                <pattern id="tile" patternUnits="userSpaceOnUse" width="17" height="17">
                                    <image xlinkHref={ tile } x="0" y="0" width="17" height="17" />
                                </pattern>
                            </defs>

                            <rect width="100%" height="100%" fill="url(#tile)" />
                            { this.state.components.map(component => { return component } ) }
                        </svg>
                    </ReactSVGPanZoom>
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
        )
    }
}