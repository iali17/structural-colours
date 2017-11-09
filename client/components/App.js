import React, { Component } from 'react';
import { connect } from 'react-redux';

// Material ui
import Grid from 'material-ui/Grid';
import Paper from 'material-ui/Paper';
import Drawer from 'material-ui/Drawer'


import ViewController from './ViewController';
import MainView from './MainView';
import ProfilePage from './ProfilePage';
import ColorBar from './ColorBar';
import Icicle from './Icicle';
import LandingView from './LandingView'
import Main from '../routes.js'

import {
  fetchPicture,
} from '../actions/pictureActions';

@connect((store) => {
  return {
    picture: store.profileView.picture.results,
    fetching: store.profileView.fetching,
    fetched: store.profileView.fetched
  };
})



export default class App extends Component {
  constructor(props) {
    super(props);
    this.state= {id: "init"};
    this.state= {colour: "init"};
    this.state= {page: "landing"};
    

  }
    // Override base syles on body
  componentDidMount() {
    document.body.style.margin = 0;
  } 
  
  changestate(){
    /*if (this.state.page == "main"){
      this.setState({page: "profile"})
    }else if (this.state.page == "landing") {
      this.setState({page: "main"})
    } else {
      this.setState({page: "main"})
    }*/
    this.setState({page:'main'})
    
  }
  
  updateColour(colour){
    this.setState({colour: colour})
    this.props.dispatch(fetchPicture(colour))
  }
  getProfile(id){
      this.setState({id: id})
      this.setState({page: "profile"})
  }


  render() {
    
    return (
      <div>
        <Grid container spacing={0}>
          <Grid item xs={12}>
            <h1>DTSC | Dynamic Taxonomy of Structural Colour in Life-forms</h1>
            <Icicle />     
            <button 
              content='Click Here'
              color="#841584"
              onClick={this.changestate.bind(this)}
            />        
          </Grid>
        </Grid>
        <Grid container spacing={24}>
          <Grid item xs={2} sm = {1}>
            <ColorBar colour={this.state.colour} updateColour={this.updateColour.bind(this)}/>
          </Grid>
          <Grid item xs={12}>
            <ViewController page = {this.state.page} colour = {this.state.colour} updateColour={this.updateColour.bind(this)} id={this.state.id} getProfile={this.getProfile.bind(this)}/>
          </Grid>
        </Grid>

        {this.props.children}
        {/*{this.props.children}
          <ProfilePage />for profile page */}
      </div>
    )
  }
}
