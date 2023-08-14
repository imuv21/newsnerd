import React, { Component } from 'react'
import Newsitem from './Newsitem'
import Spinner from './Spinner';
import { PropTypes } from 'prop-types';

export class News extends Component {

  static defaultProps =  {
    country : 'in', 
    pageSize : 6,
    category : 'general',
  }
  static propTypes = {
    country : PropTypes.string,
    pageSize : PropTypes.number,
    category : PropTypes.string
  }

  constructor() {
    super();
    console.log("this is cons from news");
    this.state = {
      articles: [],
      loading: false,
      page: 1
    }
  }
  async componentDidMount() {
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=d6d7e77a37e34db4904deef1faf0e067&pageSize=${this.props.pageSize}`;
    this.setState({loading: true});
    let data = await fetch( url );
    let parsedData = await data.json()
    console.log( parsedData );
    this.setState({ articles: parsedData.articles, totalResults: parsedData.totalResults, loading: false })
  }
  prev = async () => {
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=d6d7e77a37e34db4904deef1faf0e067&page=
    ${this.state.page - 1}&pageSize=${this.props.pageSize}`;
    this.setState({ loading: true });
    let data = await fetch(url);
    let parsedData = await data.json()
    console.log(parsedData);
    this.setState({
      page: this.state.page + 1,
      articles: parsedData.articles,
      loading: false
    })
  }
  next = async () => {
    if (!(this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize))) {
      let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=d6d7e77a37e34db4904deef1faf0e067&page=
      ${this.state.page + 1}&pageSize=${this.props.pageSize}`;
      this.setState({ loading: true });
      let data = await fetch(url);
      let parsedData = await data.json()
      console.log(parsedData);
      this.setState({
        page: this.state.page + 1,
        articles: parsedData.articles,
        loading: false
      })
    }
  }
  render() {
    return (
      <div className='container my-3'>
        <h2 className='text-center ' style={{margin: '35px 0px;'}}>Top Headlines</h2>
        {this.state.loading && <Spinner />}
        <div className="row">
          { !this.state.loading && this.state.articles.map((element) => {
            return <div key={element.url} className="col-md-4">
              <Newsitem title={element.title ? element.title.slice(0, 38) : ""}
                description={element.description ? element.description.slice(0, 88) : ""}
                imgUrl={element.urlToImage} newsUrl={element.url} />
            </div>
          })}
        </div>
        <div className="container d-flex justify-content-between">
          <button disabled={this.state.page <= 1} type="button" className="btn btn-dark" onClick={this.prev}>&larr; Prev</button>
          <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)} type="button" className="btn btn-dark" onClick={this.next}>Next &rarr;</button>
        </div>
      </div>
    )
  }
}

export default News