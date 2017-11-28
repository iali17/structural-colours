import React, { Component } from 'react'
import ReactDOM, { findDOMNode } from 'react-dom'
import * as d3 from 'd3';
import PropTypes from 'prop-types'
import{ withStyles } from 'material-ui/styles';
import Popover from 'material-ui/Popover';
import { connect } from 'react-redux';
import { TagCloud } from "react-tagcloud";
import Input, { InputLabel } from 'material-ui/Input';
import Typography from 'material-ui/Typography';

import {
    fetchAuthor,
    fetchArticle,
} from '../actions/detailActions';

@connect((store) => {
    return {
        author: store.wordCloud.author,
        fetching: store.wordCloud.fetching,
        fetched: store.wordCloud.fetched,
        article: store.wordCloud.article,
        article_fetching: store.wordCloud.article_fetching,
        article_fetched: store.wordCloud.article_fetched,
    };
})


export default class WordCloud extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            anchorEl: null,
            anchorOriginVertical: 'bottom',
            anchorOriginHorizontal: 'center',
            transformOriginVertical: 'top',
            transformOriginHorizontal: 'center',
            positionTop: 200, // Just so the popover can be spotted more easily
            positionLeft: 400, // Same as above
            anchorReference: 'anchorEl',
            textProp: 'TEST',
        };
        this.styles = theme => ({
            typography: {
                margin: theme.spacing.unit * 2,
            },
        });

        this.handleClickButton = (name, obj) => {
            this.props.dispatch(fetchArticle(name.value));

            this.setState({
                open: true,
                anchorEl: findDOMNode(obj),
                textProp: 'loading...',
            });
            console.log(name)
        };

        this.handleRequestClose = () => {
            this.setState({
                open: false,
            });
        };
    }

    componentWillMount() {
        this.props.dispatch(fetchAuthor(this.props.id))
    }
    render(){
        const { classes } = this.props;
        const {
            open,
            anchorEl,
            anchorOriginVertical,
            anchorOriginHorizontal,
            transformOriginVertical,
            transformOriginHorizontal,
            positionTop,
            positionLeft,
            anchorReference,
        } = this.state;
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
                    } else {
                        counts.push(1)
                        authors.push(author_list[j].name);
                    }
                }
            }
            for (var k = 0; k < authors.length; k++){
                data.push({value: authors[k], count: (counts[k])});
            }
        }
        if (this.props.article_fetched){
            var articles = this.props.article;
            this.textProp = "";
            this.textProp = this.textProp + articles[0].title;
            this.textProp = this.textProp + '\n' + articles[0].abstract;
        }
        return(
            <div>
                <TagCloud
                    minSize={15}
                    maxSize={35}
                    tags={data}
                    onClick={tag => this.handleClickButton(tag)} />
                <Popover
                    open={open}
                    anchorEl={anchorEl}
                    // anchorReference={anchorReference}
                    // anchorPosition={{ top: positionTop, left: positionLeft }}
                    onRequestClose={this.handleRequestClose}
                    anchorOrigin={{
                      vertical: anchorOriginVertical,
                      horizontal: anchorOriginHorizontal,
                    }}
                    transformOrigin={{
                      vertical: transformOriginVertical,
                      horizontal: transformOriginHorizontal,
                    }}
                >
                    <Typography className={this.styles.typography}>{this.textProp}</Typography>
                </Popover>
            </div>

                        );
    }
}
