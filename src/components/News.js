import React, { Component } from "react";
import Newsitem from "./Newsitem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

export default class News extends Component {
  static defalut = {
    country: "in",
    pageSize: 9,
    category: "sports",
  };
  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
  };

  capitalize = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      articles: [],
      page: 1,
      totalResult: 0,
    };
    document.title = `News | ${this.capitalize(this.props.category)}`;
  }

  async updateNews() {
    let apiurl = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=af1bf5009fa14d988b5aa049bb3a7606&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    this.setState({ loading: true });
    let data = await fetch(apiurl);
    let parsedData = await data.json();
    this.setState({
      articles: parsedData.articles,
      totalResult: parsedData.totalResult,
      loading: false,
    });
  }

  async componentDidMount() {
    this.updateNews();
  }

  previousclick = async () => {
    this.setState({
      page: this.state.page - 1,
    });
    this.updateNews();
  };

  nextclick = async () => {
    this.setState({
      page: this.state.page + 1,
    });
    this.updateNews();
  };

  fetchMoreData = async () => {
    this.setState({
      page: this.state.page + 1,
    });
    const apiurl = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=af1bf5009fa14d988b5aa049bb3a7606&page=${this.state.page}&pageSize=${this.props.pageSize}`;

    let data = await fetch(apiurl);
    let parsedData = await data.json();
    this.setState({
      articles: this.state.articles.concat(parsedData.articles),
      totalResult: parsedData.totalResult,
    });
  };

  render() {
    return (
      <>
        <div className="container my-4 ">
          <h2 className="text-center" style={{ margin: "35px 0px" }}>
            News on {this.capitalize(this.props.category)} Category
          </h2>
          {this.state.loading && <Spinner />}
          <br />
          <InfiniteScroll
            dataLength={this.state.articles.length}
            next={this.fetchMoreData}
            hasMore={this.state.articles.length !== this.state.totalResult}
            loader={<Spinner />}
          >
            <div className="row row-cols-1 row-cols-md-3 g-4">
              {this.state.articles.map((element) => {
                return (
                  <div className="col-md-4" key={element.url}>
                    <Newsitem
                      title={element.title ? element.title.slice(0, 45) : ""}
                      description={
                        element.description
                          ? element.description.slice(0, 88)
                          : ""
                      }
                      imageUrl={
                        element.urlToImage
                          ? element.urlToImage
                          : "https://cdn.dribbble.com/users/671419/screenshots/2167477/browser_not_supported.png"
                      }
                      newsurl={element.url ? element.url : ""}
                      source={element.source.name ? element.source.name : ""}
                    />
                  </div>
                );
              })}
            </div>
          </InfiniteScroll>
        </div>
      </>
    );
  }
}
