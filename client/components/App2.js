import React, { Component } from 'react';

// Material ui
import Grid from 'material-ui/Grid';
import Paper from 'material-ui/Paper';

import ViewController from './ViewController';
import MainView from './MainView';
import ProfilePage from './ProfilePage';
import ColorBar from './ColorBar';
import TreeView from './TreeView';
import LandingView from './LandingView'

export default class App2 extends Component {
  constructor(props) {
    super(props);
    this.state= {colour: "init"};
    this.state= {page: "landing"};

  }

  // Override base syles on body
  componentDidMount() {
    document.body.style.margin = 0;
  } 
  
  changestate(){
    if (this.state.page == "main"){
      this.setState({page: "profile"})
    }else if (this.state.page == "landing") {
      this.setState({page: "main"})
    } else {
      this.setState({page: "main"})
    }
    
  }
  
  updateColour(colour){
    this.setState({colour: colour})
  }
  render() {
    console.log("Colour: ", this.state);
    return (
      <div>

        <Grid container spacing={0}>
          <Grid item xs={12}>
            <h1><TreeView/></h1>
            <p>|</p>
            <p>|</p>
            
            <button 
              content='Click Here'
              onClick={this.changestate.bind(this)}
            />
            <p>|</p>
            <p>|</p>         
          </Grid>
        </Grid>
        <Grid container spacing={24}>
          <Grid item xs={12}>
              <ColorBar colour={this.state.colour} updateColour={this.updateColour.bind(this)}/>
              <ViewController page = {this.state.page} colour = {this.state.colour} updateColour={this.updateColour.bind(this)}/>
              
          </Grid>
        </Grid>

      	{this.props.children}
      	{/*{this.props.children}
      		<ProfilePage />for profile page */}


      </div>
    )
  }
}
