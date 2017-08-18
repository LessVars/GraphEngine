import React, { Component } from 'react';
import './App.css'
// import Graph from './components/Graph'
import Outliner from './components/Outliner'
import Scene2 from './components/Scene2'
import TestComp from './components/TestComp'
import Properties from './components/Properties'

class App extends Component {

    constructor(){
        super()

        this.state = {
            height: window.innerHeight,
            width : window.innerWidth
        }
        this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
    }

    componentDidMount() {
        this.updateWindowDimensions();
        window.addEventListener('resize', this.updateWindowDimensions);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.updateWindowDimensions);
    }

    updateWindowDimensions() {
        this.setState({ 
            height: window.innerHeight,
            width : window.innerWidth });
    }

    render() {
        // console.log(this.state)
        return (
            <div>
                { /**<Outliner /> */}
                <Scene2 height={ this.state.height -5 } width={ this.state.width } /> 
                
                { /**<TestComp height={ this.state.height -5 } width={ this.state.width }/>*/}
                { /** <Properties /> */}
            </div>
        );
    }
}

export default App;
