import React from 'react';
import TextField from 'material-ui/TextField';


export default class SearchBar extends Component {
  

  render() {
    var search;
    return(  
      <div>
        <TextField
          hintText="Search for organism"
          
        />
      </div>
    )
  }
}
