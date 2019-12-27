import React from 'react';
import {Link} from "react-router-dom";
import store from "store";
import {Loader, Utility} from "./home";

class Post extends React.Component {
	constructor() {
		super();

        this.state = {
            postdata: {}
        }
	}

	render() {
		return (
			<article>
            {/* Navigation */}
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
                                <Link className="nav-link" to="/login">Post to my blog?</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>

            {/* Page Header */}
            <header className="masthead" style={{backgroundImage: 'url(' + this.state.postdata.postmedia + ')' }}>
                <div className="overlay"></div>

                <div className="container-fluid">
                    <div className="row">
                        <div className="col-lg-8 col-md-10 mx-auto">
                            <div className="post-heading">
                                <h1>{this.state.postdata.posttitle}</h1>
                                <span className="meta">Posted by
                                    <a href="#"> {this.state.postdata.ownername} </a>
                                on {new Date(this.state.postdata.postedon).toDateString()}.</span>
                            </div>
                        </div>
                    </div>
                </div>

            </header>

            {/* Post Content */}
            <article>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-lg-8 col-md-10 mx-auto">
                            {this.state.postdata.postbody}
                        </div>
                    </div>
                </div>
            </article>

            <hr />

            <Utility.footer />
        </article>
		)
	}

    componentDidMount() {
        const { match: { params } } = this.props;

        let postid = params.postid.slice(1);

        if(!postid) this.props.history.push('/posts')

        let targetpost = store.get("posts").find((post) => {
            return post.postid === postid;
        });

        this.setState({
            postdata: targetpost
        })
    }
}

export default Post;