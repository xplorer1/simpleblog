import React from 'react';
import {Link} from "react-router-dom";

class StatikComponent extends React.Component {
	constructor(props) {
		super(props);

		this.handleBlur = this.handleBlur.bind(this);
		this.handleFocus = this.handleFocus.bind(this);
		this.handleInput = this.handleInput.bind(this);
	}

	handleBlur() {
		console.log("Yo man! I handle blur in this clutter of a site.")
	}

	handleFocus() {
		console.log("Yo man! I handle focus in this clutter of a site.")
	}

	handleInput() {
		console.log("Yo nigga! I handle all input in this clutter of a site.")
	}

	render() {
		return (
			<article>
				<nav className="navbar navbar-expand-lg navbar-light fixed-top" id="mainNav">
					<div className="container">
						<a className="navbar-brand" href="index.html">My Blog</a>
						<button className="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
							Menu
							<i className="fas fa-bars"></i>
						</button>
						<div className="collapse navbar-collapse" id="navbarResponsive">
							<ul className="navbar-nav ml-auto">
								<li className="nav-item">
									<Link className="nav-link" to="/about">About</Link>
								</li>
								<li className="nav-item">
									<Link className="nav-link" to="/contactme">Contact</Link>
								</li>
								<li className="nav-item">
									<Link className="nav-link" to="/login">Login</Link>
								</li>
							</ul>
						</div>
					</div>
				</nav>

				<header className="masthead" style={{backgroundImage: "url('assets/img/home-bg.jpg')"}}>
					<div className="overlay"></div>
					<div className="container">
						<div className="row">
							<div className="col-lg-8 col-md-10 mx-auto">
								<div className="site-heading">
									<h1>Welcome to my simple blog</h1>
									<span className="subheading">This is my first attempt at building something with React.Js.</span>
								</div>
							</div>
						</div>
					</div>
				</header>

				<div className="container">
					<div className="row">
						<div className="col-lg-8 col-md-10 mx-auto">
							<div className="post-preview">
								<a href="post.html">
									<h2 className="post-title">
										Man must explore, and this is exploration at its greatest
									</h2>
									<h3 className="post-subtitle">
										Problems look mighty small from 150 miles up
									</h3>
								</a>
								<p className="post-meta">Posted by
									<a href="#">Chijioke</a>
									on September 24, 2019
								</p>
							</div>

							<hr />

							<div className="post-preview">
								<a href="post.html">
									<h2 className="post-title">
									I believe every human has a finite number of heartbeats. I don't intend to waste any of mine.
									</h2>
								</a>
								<p className="post-meta">Posted by
									<a href="#">Start Bootstrap</a>
									on September 18, 2019
								</p>
							</div>

							<hr />

							<div className="post-preview">
								<a href="post.html">
									<h2 className="post-title">
										Science has not yet mastered prophecy
									</h2>
									<h3 className="post-subtitle">
										We predict too much for the next year and yet far too little for the next ten.
									</h3>
								</a>
								<p className="post-meta">Posted by
									<a href="#">Start Bootstrap</a>
									on August 24, 2019
								</p>
							</div>

							<hr />

							<div className="post-preview">
								<a href="post.html">
									<h2 className="post-title">
										Failure is not an option
									</h2>
									<h3 className="post-subtitle">
										Many say exploration is part of our destiny, but it’s actually our duty to future generations.
									</h3>
								</a>
								<p className="post-meta">Posted by
									<a href="#">Start Bootstrap</a>
									on July 8, 2019
								</p>
							</div>

							<hr />

							<div className="clearfix">
								<a className="btn btn-primary float-right" href="#">Older Posts &rarr;</a>
							</div>
						</div>
					</div>
				</div>

  				<hr />

  {/* Footer */}
  <footer>
    <div className="container">
      <div className="row">
        <div className="col-lg-8 col-md-10 mx-auto">
          <ul className="list-inline text-center">
            <li className="list-inline-item">
              <a href="#">
                <span className="fa-stack fa-lg">
                  <i className="fas fa-circle fa-stack-2x"></i>
                  <i className="fab fa-twitter fa-stack-1x fa-inverse"></i>
                </span>
              </a>
            </li>
            <li className="list-inline-item">
              <a href="#">
                <span className="fa-stack fa-lg">
                  <i className="fas fa-circle fa-stack-2x"></i>
                  <i className="fab fa-facebook-f fa-stack-1x fa-inverse"></i>
                </span>
              </a>
            </li>
            <li className="list-inline-item">
              <a href="#">
                <span className="fa-stack fa-lg">
                  <i className="fas fa-circle fa-stack-2x"></i>
                  <i className="fab fa-github fa-stack-1x fa-inverse"></i>
                </span>
              </a>
            </li>
          </ul>
          <p className="copyright text-muted">Copyright &copy; Chijioke 2019</p>
        </div>
      </div>
    </div>
  </footer>
			</article>
		)
	}
}

class Home extends React.Component {
	constructor (props) {
		super(props);
	}

	render() {
		return (
			<StatikComponent />
		)
	}
}

export {Home, StatikComponent};