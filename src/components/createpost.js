import React from 'react';
import {Link} from "react-router-dom";

class CreatePost extends React.Component {
	constructor() {
		super();
	}

	render() {
		return (
			<article style={{background: "#f8f8f8"}}>
                <nav className="navbar navbar-expand-lg navbar-light fixed-top" id="mainNav">
                    <div className="" style={{display: "flex", width: "100%"}}>
                        <Link className="navbar-brand" to="/" style={{color: "black"}}>My Blog</Link>
                        <button className="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
                            Menu
                            <i className="fas fa-bars"></i>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarResponsive">
                            <ul className="navbar-nav ml-auto">

                                <li className="nav-item">
                                    <Link className="nav-link" to="/about" style={{color: "black"}}>About</Link>
                                </li>

                                <li className="nav-item">
                                    <Link className="nav-link" to="/contactme" style={{color: "black"}}>Contact</Link>
                                </li>

                            </ul>
                        </div>
                    </div>
                </nav>

				<div className="cont">
                    <div className="row">
                        
                        <div className="col-md-8 col-md-offset-2" style={{margin: "0 auto"}}>
                            
                            <h1>Create post</h1>
                            
                            <form action="" method="POST">
                                
                                <div className="form-group">
                                    <label htmlFor="title">Title <span className="require">*</span></label>
                                    <input type="text" className="form-control" name="title" />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="exampleFormControlFile1">Upload media</label>
                                    <input type="file" className="form-control-file" id="exampleFormControlFile1" />
                                </div>
                                
                                <div className="form-group">
                                    <label htmlFor="description">Compose post</label>
                                    <textarea rows="5" className="form-control" name="description" ></textarea>
                                </div>
                                
                                <div className="form-group">
                                    <Link type="submit" className="btn btn-primary" to="/post">
                                        Create
                                    </Link>
                                    <button className="btn btn-default">
                                        Cancel
                                    </button>
                                </div>
                                
                            </form>
                        </div>
                        
                    </div>
                </div>
			</article>
		)
	}
}

export default CreatePost;