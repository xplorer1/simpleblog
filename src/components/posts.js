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
									<Link className="nav-link" to="/login">Post to my blog?</Link>
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
						<div className="mx-auto">

							{
								this.state.postsdata.map((post) => {

									return (
										<div className="row post-preview" key={post.postid} >

											<div className="col-sm-4 pstmd mb-3">
												<img src={post.postmedia} className="w-75" alt="Post image" />
											</div>

											<div className="col-sm-8">
												<Link to={"/post/:"+post.postid}>
													<h2 className="post-title">
														{post.posttitle}
													</h2>
													<div className="post-subtitle">
														{post.postbody.slice(0, 80)+ "..."}
													</div>
												</Link>
												<p className="post-meta">Posted by
													<span href="#"> { post.ownername } </span>
													on  { new Date(post.postedon).toDateString() }
												</p>
												<hr />
											</div>
											
										</div>
									)
								})
							}

							{/*<div className="clearfix">
								<a className="btn btn-primary float-right" href="#">Older Posts &rarr;</a>
							</div>*/}
						</div>
					</div>
				</div>

				<Utility.footer />

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

        	let sortedposts = response.data.sort(function (obj1, obj2) {
                return new Date(obj1.postedon) - new Date(obj2.postedon);
            });

            store.set("posts", sortedposts);

            this.setState({postsdata: sortedposts});

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