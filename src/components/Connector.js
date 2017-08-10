import React from 'react'
import PropTypes from 'prop-types'

export default class Connector extends React.Component {

    static propTypes = {
        x: PropTypes.number.isRequired,
        y: PropTypes.number.isRequired
    }

    constructor(){
        super()

        this.state = { x : 0, y : 0, stroke: 'black' }
    }

    handleMouseOver(e){
        this.setState({ stroke: 'yellow'})
    }

    handleMouseLeave(e){
        this.setState({ stroke: 'black' })
    }

    handleClick(e){
        console.log(e)
    }

    render(){
        return(
            <circle cx={ this.props.x }  cy={ this.props.y } 
                r="8" 
                stroke={ this.state.stroke } strokeWidth="1" fill="red"
                onMouseOver ={ this.handleMouseOver.bind(this) }
                onMouseLeave={ this.handleMouseLeave.bind(this) }
                onClick     ={ this.handleClick.bind(this) } />
        )
    }
}