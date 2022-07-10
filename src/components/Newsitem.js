import React, { Component } from "react";

export class Newsitem extends Component {
  render() {
    let { title, description, imageUrl, newsurl, source } = this.props;
    return (
      <div className="card">
        <div className="card-header text-center">
          <b>{source}</b>
        </div>
        <img src={imageUrl} className="card-img-top" alt="..." />
        <div className="card-body">
          <h5 className="card-title">{title}....</h5>

          <p className="card-text">{description}....</p>
          <a
            href={newsurl}
            target="_blank"
            className="btn btn-sm btn-dark"
            rel="noreferrer"
          >
            Read more
          </a>
        </div>
      </div>
    );
  }
}

export default Newsitem;
