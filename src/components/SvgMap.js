import React from 'react'
import PropTypes from 'prop-types'
import tile from '../images/tile.png'

// https://blog.komand.com/building-svg-maps-with-react

export default (ComposedComponent) => {

    class SvgMap extends React.Component {
    
        constructor(props) {
            super(props);
            this.state = {
                matrix: [1, 0, 0, 1, 0, 0],
                cursor: "default",
                dragging: false,
            };
        }
      
        onDragStart(e) {
            if (e.nativeEvent.which !== 3 ) return;

            // Find start position of drag based on touch/mouse coordinates.
            const startX = typeof e.clientX === 'undefined' ? e.changedTouches[0].clientX : e.clientX;
            const startY = typeof e.clientY === 'undefined' ? e.changedTouches[0].clientY : e.clientY;
        
            // Update state with above coordinates, and set dragging to true.
            const state = {
                cursor: "-webkit-grab",
                dragging: true,
                startX,
                startY,
            };
        
            this.setState(state);
        }
      
        onDragMove(e) {
            if (e.nativeEvent.which !== 3 ) return;

            // First check if the state is dragging, if not we can just return
            // so we do not move unless the user wants to move
            if (!this.state.dragging) {
                return;
            }
        
            // Get the new x coordinates
            const x = typeof e.clientX === 'undefined' ? e.changedTouches[0].clientX : e.clientX;
            const y = typeof e.clientY === 'undefined' ? e.changedTouches[0].clientY : e.clientY;
        
            // Take the delta where we are minus where we came from.
            const dx = x - this.state.startX;
            const dy = y - this.state.startY;
        
            // Pan using the deltas
            this.pan(dx, dy);
        
            // Update the state
            this.setState({
                startX: x,
                startY: y,
            });
        }
      
        onDragEnd() {
            // if (e.nativeEvent.which !== 3 ) return;
            console.log('ooooops.')
            this.setState({ dragging: false});
        }
        
        onWheel(e) {
            if (e.deltaY < 0) {
                this.zoom(1.05);
            } else {
                this.zoom(0.95);
            }
        }
      
        pan(dx, dy) {
            const m = this.state.matrix;
            m[4] += dx;
            m[5] += dy;
            this.setState({ matrix: m });
        }
      
        zoom(scale) {
            const m = this.state.matrix;
            const len = m.length;
            for (let i = 0; i < len; i++) {
                m[i] *= scale;
            }
            m[4] += (1 - scale) * this.props.width / 2;
            m[5] += (1 - scale) * this.props.height / 2;
            this.setState({ matrix: m });
        }

        render() {
          const { height, width, ...other} = this.props;
          return (
                <svg
                    //onContextMenu ={ (e)=>{ e.preventDefault() } }
                    height        = { height }
                    width         = { width }
                    onMouseDown   = { this.onDragStart.bind(this) }
                    onTouchStart  = { this.onDragStart.bind(this)}
                    onMouseMove   = { this.onDragMove.bind(this) }
                    onTouchMove   = { this.onDragMove.bind(this) }
                    onMouseUp     = { this.onDragEnd.bind(this) }
                    onTouchEnd    = { this.onDragEnd.bind(this) }
                    onWheel       = { this.onWheel.bind(this) } 
                    cursor        = { this.state.cursor }>
                    <defs>
                        <pattern id="tile" patternUnits="userSpaceOnUse" width="17" height="17">
                            <image xlinkHref={ tile } x="0" y="0" width="17" height="17" />
                        </pattern>
                    </defs>

                    <rect width="100%" height="100%" fill="url(#tile)" />

                    <g transform={`matrix(${this.state.matrix.join(' ')})`}>
                        <ComposedComponent
                        {...other}
                        pan={this.pan}
                        zoom={this.zoom}
                        ></ComposedComponent>
                    </g>
                </svg>
          );
        }
      }
      
      SvgMap.propTypes = {
        width: PropTypes.number.isRequired,
        height: PropTypes.number.isRequired,
      };
      
      return SvgMap;
}