import React from 'react';
import {Link} from "react-router-dom";

function Loader() {
	return (
		<div id="preloader" >
	        <div id="status">
	        	<img src="assets/img/loadinganimation.gif" id="preloader_image" alt="loader" />
	        </div>
	    </div>
	)
}

const Utility = {
	baseurl: "http://localhost:8050/api/",

	ajaxloader: function() {
		return (
			<div className='spinner-grow' role='status'> 
				<span className='sr-only'>Loading...</span> 
			</div>
		)
	},

	pageloader: function() {
		return (
			<div id="preloader" >
		        <div id="status">
		        	<img src="assets/img/loadinganimation.gif" id="preloader_image" alt="loader" />
		        </div>
		    </div>
		)
	},

	nav: function() {
		return(
			<nav className="navbar navbar-expand-lg navbar-light fixed-top" id="mainNav">
				<div className="container">
					<Link className="navbar-brand" to="/">My Blog</Link>
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
								<Link className="nav-link" to="/signup">Sign Up</Link>
							</li>

							<li className="nav-item">
								<a className="nav-link" data-toggle="modal" data-target="#myModal">Post to my blog?</a>
							</li>
						</ul>
					</div>
				</div>
			</nav>
		)
	}
}

class StatikComponent extends React.Component {
	constructor(props) {
		super(props);
		this.state = {showLoader: true};
	}

	render() {
		return (
			<article>
				{this.state.showLoader === true && <Loader />}

				<Utility.nav />
			
				<header className="masthead" style={{backgroundImage: "url('assets/img/home-bg.jpg')"}}>
					<div className="overlay"></div>
					<div className="container">
						<div className="row">
							<div className="col-lg-8 col-md-10 mx-auto">
								<div className="site-heading">
									<h1>Welcome to my simple blog</h1>
									<span className="subheading">You can sign up and publish your posts here too. I like to share :). </span>
								</div>
							</div>
						</div>
					</div>
				</header>

				<div className="container">
					<div className="row">
						<div className="col-lg-8 col-md-10 mx-auto">
							<div className="post-preview">
								<Link to="/post">
									<h2 className="post-title">
										Man must explore, and this is exploration at its greatest
									</h2>
									<h3 className="post-subtitle">
										Problems look mighty small from 150 miles up
									</h3>
								</Link>
								<p className="post-meta">Posted by
									<a href="#">Chijioke</a>
									on September 24, 2019
								</p>
							</div>

							<hr />

							<div className="post-preview">
								<Link to="/post">
									<h2 className="post-title">
									I believe every human has a finite number of heartbeats. I don't intend to waste any of mine.
									</h2>
								</Link>
								<p className="post-meta">Posted by
									<a href="#">Start Bootstrap</a>
									on September 18, 2019
								</p>
							</div>

							<hr />

							<div className="post-preview">
								<Link to="/post">
									<h2 className="post-title">
										Science has not yet mastered prophecy
									</h2>
									<h3 className="post-subtitle">
										We predict too much for the next year and yet far too little for the next ten.
									</h3>
								</Link>
								<p className="post-meta">Posted by
									<a href="#">Start Bootstrap</a>
									on August 24, 2019
								</p>
							</div>

							<hr />

							<div className="post-preview">
								<Link to="/post">
									<h2 className="post-title">
										Failure is not an option
									</h2>
									<h3 className="post-subtitle">
										Many say exploration is part of our destiny, but it’s actually our duty to future generations.
									</h3>
								</Link>
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

  				<div id="myModal" className="modal fade">
					<div className="modal-dialog">

						<div className="modal-content">
							<div className="modal-header">
								<h5 className="modal-title" id="exampleModalLongTitle">Enter your password.</h5>
								<button type="button" className="close" data-dismiss="modal" aria-label="Close">
						          <span aria-hidden="true">&times;</span>
						        </button>
							</div>

							<div className="modal-body">
								<div className="">Are you registered? <br />Enter your password to write and publish.</div>

								<div className="form-group">
                                    <label htmlFor="your_pass"></label>
                                    <input type="password" name="your_pass" id="your_pass" placeholder="Password" className="cust-btn" />
                                </div>
							</div>

							<div className="modal-footer">
								<Link type="button" className="btn btn-primary" to="/createpost">Login</Link>
								<button type="button" className="btn btn-secondary" data-dismiss="modal">Cancel</button>
							</div>
						</div>
					</div>
				</div>

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

	componentDidMount() {

		setTimeout(function() {
			console.log("state: ", this.state)
			this.setState({showLoader: false})
			//this.state.showLoader=false;
		}.bind(this), 2000, this.state.showLoader);

		let Nav = Utility.nav;

		console.log("nav: ", Nav)

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

export {Home, StatikComponent, Loader, Utility};