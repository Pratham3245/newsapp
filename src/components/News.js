import React, { Component } from "react";
import Newsitem from "./Newsitem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";

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
  constructor() {
    super();
    this.state = {
      loading: false,
      articles: [],
      page: 1,
    };
  }

  async componentDidMount() {
    let apiurl = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=af1bf5009fa14d988b5aa049bb3a7606&pageSize=${this.props.pageSize}`;
    this.setState({ loading: true });

    let data = await fetch(apiurl);
    let parsedData = await data.json();
    this.setState({
      articles: parsedData.articles,
      totalResult: parsedData.totalResult,
      loading: false,
    });
  }

  previousclick = async () => {
    let apiurl = `https://newsapi.org/v2/top-headlines?country=${
      this.props.country
    }&category=${
      this.props.category
    }&apiKey=af1bf5009fa14d988b5aa049bb3a7606&page=${
      this.state.page - 1
    }&pageSize=${this.props.pageSize}`;
    this.setState({ loading: true });

    let data = await fetch(apiurl);
    let parsedData = await data.json();
    this.setState({
      page: this.state.page - 1,
      articles: parsedData.articles,
      loading: false,
    });
  };

  nextclick = async () => {
    if (
      this.state.page + 1 >
      Math.ceil(this.state.totalResult / this.props.pageSize)
    ) {
    } else {
      let apiurl = `https://newsapi.org/v2/top-headlines?country=${
        this.props.country
      }&category=${
        this.props.category
      }&apiKey=af1bf5009fa14d988b5aa049bb3a7606&page=${
        this.state.page + 1
      }&pageSize=${this.props.pageSize}`;
      this.setState({ loading: true });

      let data = await fetch(apiurl);
      let parsedData = await data.json();
      this.setState({
        page: this.state.page + 1,
        articles: parsedData.articles,
        loading: false,
      });
    }
  };

  render() {
    return (
      <>
        <div className="container my-4 ">
          <h2 className="text-center" style={{ margin: "35px 0px" }}>
            News
          </h2>
          {this.state.loading && <Spinner />}
          <br />
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
          <div className="container my-5">
            <div className="d-flex justify-content-around">
              <button
                type="button"
                className="btn btn-dark"
                onClick={this.previousclick}
                disabled={this.state.page <= 1}
              >
                &larr; Previous
              </button>
              <button
                type="button"
                className="btn btn-dark"
                onClick={this.nextclick}
                disabled={
                  this.state.page + 1 >
                  Math.ceil(this.state.totalResult / this.props.pageSize)
                }
              >
                Next &rarr;
              </button>
            </div>
          </div>
        </div>
      </>
    );
  }
}
