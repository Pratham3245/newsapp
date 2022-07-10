import "./App.css";

import React, { Component } from "react";
import Navbar from "./components/Navbar";
import News from "./components/News";
import { BrowserRouter, Routes, Route } from "react-router-dom";

export default class App extends Component {
  render() {
    return (
      <div>
        <div style={{ top: "3pc", position: "relative" }}>
          <BrowserRouter>
            <Navbar />
            <Routes>
              <Route
                exact
                path="/"
                element={
                  <News
                    pageSize={9}
                    country="us"
                    category="technology"
                    key="home"
                  />
                }
              />
              <Route
                exact
                path="/sports"
                element={
                  <News
                    pageSize={9}
                    country="in"
                    category="sports"
                    key="sports"
                  />
                }
              />
              <Route
                exact
                path="/general"
                element={
                  <News
                    pageSize={9}
                    country="in"
                    category="general"
                    key="general"
                  />
                }
              />
              <Route
                exact
                path="/technology"
                element={
                  <News
                    pageSize={9}
                    country="in"
                    category="technology"
                    key="technology"
                  />
                }
              />
              <Route
                exact
                path="/science"
                element={
                  <News
                    pageSize={9}
                    country="in"
                    category="science"
                    key="science"
                  />
                }
              />
              <Route
                exact
                path="/health"
                element={
                  <News
                    pageSize={9}
                    country="in"
                    category="health"
                    key="health"
                  />
                }
              />
              <Route
                exact
                path="/entertainment"
                element={
                  <News
                    pageSize={9}
                    country="in"
                    category="entertainment"
                    key="entertainment"
                  />
                }
              />
              <Route
                exact
                path="/business"
                element={
                  <News
                    pageSize={9}
                    country="in"
                    category="business"
                    key="business"
                  />
                }
              />
            </Routes>
          </BrowserRouter>
        </div>
      </div>
    );
  }
}
