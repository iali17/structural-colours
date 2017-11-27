import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import * as d3 from 'd3';
import { connect } from 'react-redux';
import { TagCloud } from "react-tagcloud";

import {
    fetchAuthor,
} from '../actions/detailActions';

@connect((store) => {
    return {
        author: store.wordCloud.author,
        fetching: store.wordCloud.fetching,
        fetched: store.wordCloud.fetched
    };
})

export default class WordCloud extends Component {
    constructor(props) {
        super(props);

    }
    componentWillMount() {
        console.log("MOUNT")
        this.props.dispatch(fetchAuthor(this.props.id))
    }
    render(){
        var data=[]
        var authors=[]
        if (this.props.fetched){
            const info = this.props.author
            for (var i = 0; i < info.length; i++) {
                console.log("LENGTH: " + info.length)
                var author_list = info[i].author
                for (var j = 0; j < author_list.length; j++){
                    var name = author_list[j].name;
                    var loc = authors.indexOf(name);
                    console.log("INDEX: " + loc);
                    if (loc != -1){
                        var element = authors[loc];
                        console.log(element)
                        element[1] = element[1] + 1
                        authors[loc] = element
                    } else {
                        var temp = [];
                        temp.push(author_list[j].name, 5);
                        authors.push(temp);
                    }
                }
                console.log(data)
            }
            for (var k = 0; k < authors.length; k++){
                data.push({value: authors[k][0], count: (20 + authors[k][1])});
            }
        }
        return(
        <TagCloud
                minSize={12}
                maxSize={35}
                tags={data}
                onClick={tag => alert(`'${tag.value}' was selected!`)} />);
    }
}


