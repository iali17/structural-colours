import React, { Component } from 'react'
import ReactDOM, { findDOMNode } from 'react-dom'
import * as d3 from 'd3';
import { connect } from 'react-redux';
import { TagCloud } from "react-tagcloud";
import Typography from 'material-ui/Typography';
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from 'material-ui/Dialog';
import Slide from 'material-ui/transitions/Slide';
import Button from 'material-ui/Button';

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
// TagCloud from https://www.npmjs.com/package/react-tagcloud
export default class WordCloud extends Component {
  // Set state and define handle functions.
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      next: false,
      articles: [],
      dialogTitle: 'loading...',
      dialogAbstract: 'loading...',
      dialogDetail: 'loading...',
      index: 0,
    };

    this.transition = (props) => {
      return <Slide direction="up" {...props} />;
    };

    // Close dialog when clicked away or press ok
    this.handleRequestClose = () => {
      this.setState({ open: false });
    };

    // Gets the next article and sets the state
    this.handleNext = () => {
      if (this.props.fetched){
        if (this.state.index < this.state.articles.length-1){
          this.setState({
            open: true,
            next: true,
            articles: this.state.articles,
            dialogTitle: this.state.articles[this.state.index].title,
            dialogAbstract: this.state.articles[this.state.index].abstract,
            dialogDetail: this.state.articles[this.state.index].detail,
            index: this.state.index+1,
          })
        } else {
          this.setState({
            open: true,
            next: false,
            index: 0,
          })
        }
      }
    }

    // Gets the articles related to the clicked author
    this.handleClickButton = (name, obj) => {

      this.props.dispatch(fetchArticle([name.value, this.props.id]));
      this.setState({
        open: true,
        dialogTitle: 'loading...',
        dialogAbstract: 'loading...',
        dialogDetail: 'loading...',
        index: 0,
      });
    };

    this.styles = theme => ({
      typography: {
        margin: theme.spacing.unit * 2,
      },
    });
  }

  // Gets all authors who wrote an article about the species
  componentWillMount() {
    this.props.dispatch(fetchAuthor(this.props.id))
  }

  render(){
    if (this.props.fetching) {
      return <LinearProgress color="primary" />
    } else if (this.props.fetched){
      // Compile the list of authors. Each article the author has on the species adds 1 to its weight (thus increasing its size in the wordcloud)
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

      // Get the article(s) for the clicked author
      if (this.props.article_fetched){
        this.state.articles = this.props.article;
        this.state.dialogTitle = this.state.articles[this.state.index].title;
        this.state.dialogAbstract = this.state.articles[this.state.index].abstract;
        this.state.dialogDetail = this.state.articles[this.state.index].detail;
        if (this.state.index < this.state.articles.length-1){
          this.state.next = true;
        } else {
          this.state.next = false;
        }
      }

      return(
        <div>
          <TagCloud
            minSize={15}
            maxSize={35}
            tags={data}
            onClick={tag => this.handleClickButton(tag)} />
          <Dialog
            open={this.state.open}
            transition={this.transition}
            keepMounted
            onRequestClose={this.handleRequestClose}
            >
            <DialogTitle>{this.state.dialogTitle}</DialogTitle>
            <DialogContent>
              <DialogContentText>
                {this.state.dialogAbstract}
              </DialogContentText>
              <hr/>
              <DialogContentText>
                {this.state.dialogDetail}
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={this.handleRequestClose} color="primary">
                OK
              </Button>
              <Button onClick={this.handleNext} disabled={!this.state.next} color="primary">
                Next Article
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      );
    } else {
      return <h2> WordCloud failed to load </h2>
    }
  }
}
