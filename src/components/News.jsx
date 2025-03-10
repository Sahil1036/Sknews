import React, { Component } from "react";
import NewsBox from "./NewsBox";
import Spin from "./Spin";
export default class News extends Component {
  articles = [];

  constructor(props) {
    super(props);
    this.state = {
      articles: this.articles,
      loading: true,
      page: 1,
      pagesize: 12,
      country: "in",
      totalResults: 100,
      category: this.props.category,
      query: this.props.query,
     
    };
  }

  async updateapi() {
    this.props.setProgress(10);
    let url = `https://real-time-news-data.p.rapidapi.com/search?query=${this.state.category}&limit=${this.state.totalResults}&time_published=anytime&country=${this.state.country}&lang=en`;
    if (this.state.query) {
      console.log("aa");
      url = `https://real-time-news-data.p.rapidapi.com/search?query=${this.state.query}&limit=${this.state.totalResults}&time_published=anytime&country=${this.state.country}&lang=en`;
    }
    console.log(this.state.query, this.state.category, 1);
    console.log(url);
    const options = {
      method: "GET",
      headers: {
        "x-rapidapi-key": process.env.key,
        "x-rapidapi-host": "real-time-news-data.p.rapidapi.com",
      },
    };
    let data = await fetch(url, options);
    this.props.setProgress(30);
    let usedata = await data.json();
    this.props.setProgress(70);
    this.setState({
      articles: usedata.data,
      loading: false,
    });

    this.props.setProgress(100);
  }

  async componentDidMount() {
    this.updateapi();
  }

  render() {
    return (
      <div style={{ marginTop: "70px" }}>
        <h1 className="text-center">
          SKnews{" "}
          <p className="text-capitalize">
            Top headlines on {this.state.category}
            {this.state.query}
          </p>
        </h1>

        {this.state.loading && <Spin />}

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            margin: "10px",
          }}
        >
          {this.state.articles &&
            this.state.articles.map((e) => {
              return (
                e.source_publication_id && (
                  <div key={e.url}>
                    <NewsBox
                      title={e.title}
                      imageurl={e.photo_url}
                      description={e.snippet}
                      link={e.link}
                      publishedAt={e.published_datetime_utc}
                      name={e.source_name}
                    />
                  </div>
                )
              );
            })}
        </div>
      </div>
    );
  }
}
