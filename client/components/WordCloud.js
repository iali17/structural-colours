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
        this.props.dispatch(fetchAuthor(this.props.id))
    }
    render(){
        var data=[]
        var authors=[]
        var counts=[]
        if (this.props.fetched){
            const info = this.props.author
            for (var i = 0; i < info.length; i++) {
                var author_list = info[i].author
                for (var j = 0; j < author_list.length; j++){
                    var name = author_list[j].name;
                    var loc = authors.indexOf(name);
                    if (loc != -1){
                        counts[loc] = counts[loc] + 1
                        console.log(counts)
                    } else {
                        counts.push(1)
                        authors.push(author_list[j].name);
                    }
                }
            }
            console.log(authors)
            for (var k = 0; k < authors.length; k++){
                data.push({value: authors[k], count: (counts[k])});
            }
        }
        return(
        <TagCloud
                minSize={15}
                maxSize={35}
                tags={data}
                onClick={tag => alert(`'${tag.count}' was selected!`)} />);
    }
}


