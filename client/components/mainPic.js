import React, { Component } from 'react';

class MainPic extends Component {
  constructor(props) {
    super(props);  
    console.log('Pic', this.props);      
  }

  getProfile(t) {
  	
    var id2 = this.props.pic.species
    this.props.getProfile(id2 );
  }

/*<img src={picture.picture}  onClick =  { this.getProfile.bind(this)} />*/
 render(){

 	 return(
 	 	<img src={this.props.pic.picture}  onClick =  { this.getProfile.bind(this)} />
 	 )
 }
}
export default (MainPic);