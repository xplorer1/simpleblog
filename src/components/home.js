import React from 'react';
import {Link} from "react-router-dom";
import store from "store";

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

	validmail: function (email) {
        let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
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
		)
	},

	footer: function () {
		return (
			<footer>
				<div className="container-fluid">
					<div className="row">
						<div className="col-lg-8 col-md-10 mx-auto">
						  <p className="copyright text-muted">Copyright &copy; Chijioke 2019</p>
						</div>
					</div>
				</div>
			</footer>
		)
	},

	header: function (props) {
		return (													
			<header className="masthead" style={{backgroundImage: 'url(assets/img/' + props.image + '.jpg)'}}>
                <div className="overlay"></div>
                
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-lg-8 col-md-10 mx-auto">
                            <div className="page-heading">
                                <h1>{props.title}</h1>
                                <span className="subheading">{props.sub}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
		)
	}
}

class StatikComponent extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			showLoader: true,
			postsdata: []
		};
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

				<div className="container-fluid">
					<div className="row">
						<div className="col-lg-8 col-md-10 mx-auto">

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

  				<hr />

				<Utility.footer />

			</article>
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

		let Nav = Utility.nav;
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