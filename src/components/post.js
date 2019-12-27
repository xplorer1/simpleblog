import React from 'react';
import {Link, useParams} from "react-router-dom";
import store from "store";

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
                                <a className="nav-link" data-toggle="modal" data-target="#myModal">Post to my blog?</a>
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
                                    <a href="#"> {this.state.postdata.owner} </a>
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

            {/* Footer */}
            <footer>
                <div className="container-fluid">
                    <div className="row">

                        <div className="col-lg-8 col-md-10 mx-auto">

                            <Link className="nav-link" to="/posts">Back to posts</Link>

                            {/*<ul className="list-inline text-center">

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
                            </ul>*/}

                        <p className="copyright text-muted">Copyright &copy; Chijioke 2019</p>
                        </div>
                    </div>
                </div>
            </footer>

            <div id="myModal" className="modal fade" role="dialog">
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
            
        </article>
		)
	}

    componentDidMount() {
        const { match: { params } } = this.props;

        let postid = params.postid.slice(1);   

        let targetpost = store.get("posts").find((post) => {
            return post.postid === postid;
        });

        this.setState({
            postdata: targetpost
        })
    }
}

export default Post;