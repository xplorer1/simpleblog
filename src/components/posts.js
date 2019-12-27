import React from 'react';
import {Link} from "react-router-dom";
import {Loader, Utility} from "./home";
import alertify from "alertifyjs";
import store from "store";
let Nav = Utility.nav;

class Posts extends React.Component {
	constructor() {
		super();

		this.state = {
			showLoader: true,
            ajaxloading: false,
            postsdata: []
		}
	}
	
	render() {
		return (
			<section>
				{this.state.showLoader === true && <Loader />}
				<nav className="navbar navbar-expand-lg navbar-light fixed-top" id="mainNav">
					<div className="container-fluid">
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
									<Link className="nav-link" to="/signup">Sign Up</Link>
								</li>

								<li className="nav-item">
									<a className="nav-link" data-toggle="modal" data-target="#myModal">Post to my blog?</a>
								</li>
							</ul>
						</div>
					</div>
				</nav>

				<header className="masthead" style={{backgroundImage: "url('img/about-bg.jpg')"}}>
					<div className="overlay"></div>

					<div className="container">
						<div className="row">
							<div className="col-lg-8 col-md-10 mx-auto">
								<div className="page-heading">
									<h1>All Posts</h1>
								</div>
							</div>
						</div>
					</div>
				</header>

				<div className="container">
					<div className="row">
						<div className="col-lg-8 col-md-10 mx-auto">

							{
								this.state.postsdata.map((post) => {

									return (
										<div className="row post-preview" key={post.postid} >

											<div className="col-sm-4 pstmd">
												<img src={post.postmedia} className="w-75" alt="Post image" />
											</div>

											<div className="col-sm-8">
												<Link to={"/post/:"+post.postid}>
													<h2 className="post-title">
														{post.posttitle}
													</h2>
													<h3 className="post-subtitle">
														{post.postbody.slice(0, 80)+ "..."}
													</h3>
												</Link>
												<p className="post-meta">Posted by
													<span href="#"> { post.owner } </span>
													on  { new Date(post.postedon).toDateString() }
												</p>
											</div>
											
										</div>
									)
								})
							}

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

			</section>
		)
	}

	componentDidMount() {

		fetch(Utility.baseurl + "allposts/", {
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json',
			}
		})
        .then((response) => {
            return response.json();
            this.setState({showLoader: false})
        })
        .then((response) => {

            store.set("posts", response.data);
            this.setState({postsdata: response.data});

            this.setState({showLoader: false})
        })
        .catch((error) => {
        	this.setState({showLoader: false})

            console.log("error: ", error);
        })

       alertify.set('notifier','position', 'top-bottom');
    }
}

export default Posts;