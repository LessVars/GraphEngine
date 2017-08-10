import React from 'react'
import PropTypes from 'prop-types'

import Connector from './Connector'

const textStyle = {
    // textAnchor : 'middle',
    fill       : 'red'
}

export default class Node extends React.Component{

    static propTypes = {
        x: PropTypes.number.isRequired,
        y: PropTypes.number.isRequired,
    }

    constructor(){
        super()

        this.state = { 
            posX : 0, 
            posY : 0, 
            isDrag: false,
            content: 'New Node(新节点)',
            contentWidth: 100,
            contentHeight: 30,

            nodeStyle:{
                cursor: 'default'
            },

            rectStyle: {
                fill: 'yellow',
                fillOpacity: 0.5,
            }
        }
    }

    componentDidMount(){
        this.setState( {
                posX : this.props.x,
                posY : this.props.y
            }
        )
    }

    handleRectClick(e){
        this.setState({ rectStyle:{
                fill: 'yellow',
                fillOpacity: 0.5, 
                stroke: 'green', 
                strokeWidth: 2,
                strokeDasharray: '5 2' }})
    }

    handleMouseDown(e) {
        console.log('mouse down')
        this.setState({ isDrag: true })
    }

    handleCancleDnD(e){
        console.log('mouse up')
        this.setState({ isDrag: false })
    }

    handleMouseMove(e){
        if ( this.state.isDrag ) {
            // console.log(`Mouse move position(${e.screenX}, ${e.screenY} )`)
            this.setState({
                posX: e.screenX,
                posY: e.screenY
            })
        }
    }

    handleMouseOverNode(e){
        this.setState({ nodeStyle:{ cursor: 'move' }})
    }

    render(){
        return (
            <g  style={ this.state.nodeStyle } 
                onMouseOver = { this.handleMouseOverNode.bind(this) }>

                <Connector x    = { this.state.posX } y={ this.state.posY - 95 } />
                <rect 
                    x           = { this.state.posX } 
                    y           = { this.state.posY - 95 } 
                    width       = { this.state.contentWidth + 20 } 
                    height      = { this.state.contentHeight + 20}
                    style       = { this.state.rectStyle } 
                    onClick     = { this.handleRectClick.bind(this) }
                    onMouseDown = { this.handleMouseDown.bind(this) }
                    onMouseMove = { this.handleMouseMove.bind(this) }
                    onMouseUp   = { this.handleCancleDnD.bind(this) }
                    />

                <text
                    //ref={ (text) => { if(text){ let bbox = text.getBBox(); this.setState({ contentHeight: bbox.height, contentWidth: bbox.width })} }}
                    x           = { this.state.posX + 20 } 
                    y           = { this.state.posY - 70 } 
                    style       = { textStyle }> { this.state.content }
                </text>

                <Connector x={ this.state.posX + 120 } y={ this.state.posY - 70 } />
            </g>
        )
    }
}