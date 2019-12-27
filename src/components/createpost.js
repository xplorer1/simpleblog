import React from 'react';
import {Link, withRouter} from "react-router-dom";
import {Loader, Utility} from "./home";
import alertify from "alertifyjs";
import store from "store";

class CreatePost extends React.Component {
	constructor() {
		super();

        this.state = {
            posttitle: "",
            postmedia: "",
            postbody: "",
            showLoader: true,
            ajaxloading: false,
            tocreatepost: false,
            inputkey: ""
        }

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleInput = this.handleInput.bind(this);
        this.handleInputClear = this.handleInputClear.bind(this);
        this.handleFileUpload = this.handleFileUpload.bind(this);
	}

    handleSubmit(e) {

        e.preventDefault();

        if(!this.state.posttitle) {
            alertify.warning("Your post needs a title. Please provide one.")
        }
        else if(!this.state.postbody) {
            alertify.warning("What do you want to talk about in this post? Please provide it.")
        }
        else {
            let userdata = store.get("userdata");

            let data = {
                posttitle: this.state.posttitle,
                postbody: this.state.postbody,
                postmedia: this.state.postmedia,
                token: userdata.token,
                postowner: userdata.name
            }

            this.setState({ ajaxloading: true }, () => {

                fetch(Utility.baseurl + "savepost", {
                        method: 'POST', 
                        body: JSON.stringify(data),
                        headers: {
                          'Accept': 'application/json',
                          'Content-Type': 'application/json',
                        },
                    })
                    .then((response) => {
                        this.setState({ajaxloading: false});
                        return response.json();
                    })
                    .then((response) => {
                        this.setState({ajaxloading: false});

                        switch (response.data) {
                            case "token-required" || "token-expired" :

                                alertify.notify("Ooop! Such error. Please let us know if this is still you.", "warning", 5, 
                                    function() {
                                        this.props.history.push('/login');
                                    }.bind(this)
                                )
                            break;

                            case "posttitle-required":
                                alertify.warning("Ouch! Looks like you didn't supply a post title.")
                            break;

                            case "postbody-required":
                                alertify.warning("Ooops! Looks like the body of your post is empty...")
                            break;

                            case "user-notfound":
                                alertify.notify("Wow! We are having trouble identifying you. Please sign in or write to us.", 
                                    "warning", 2, function () {
                                        this.props.history.push('/login');
                                    }.bind(this)
                                )
                            break;

                            case "post-saved": 
                                alertify.notify('Post has been successfully saved.', 'success', 5, 
                                    function () {     
                                        this.handleInputClear();
                                    }.bind(this)
                                );

                            break;
                            case "unknown-error":
                                alertify.warning("Oops! We are having some internal problems. Please try  again later.")
                            break;
                        }                         
                    })
                    .catch((error) => {
                        alertify.warning("Oops! We are having some internal problems. Please try  again later.")
                        this.setState({ajaxloading: false});
                        console.log("erro: ", error);
                    }) 
                })
            }
    };

    handleInput(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
    };

    handleFileUpload(e) {

        let file = e.target.files[0];
        let reader = new FileReader();

        reader.readAsDataURL (file);

        reader.onloadend = function() {
            this.setState({
                postmedia: reader.result
            });
        }.bind(this);
    }

    handleInputClear(e) {

        this.setState({
            posttitle: "",
            postmedia: "",
            postbody: "",
            inputkey: Math.random().toString(10)
        });
    }

	render() {
		return (
			<article>

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

                                <li className="nav-item">
                                    <Link className="nav-link" to="/posts" style={{color: "black"}}>Posts</Link>
                                </li>

                            </ul>
                        </div>
                    </div>
                </nav>

				<div className="container pt-5 mt-5">
                    <div className="row">
                        
                        <div className="col-md-8 col-md-offset-2" style={{margin: "0 auto"}}>
                            
                            <h2>Create post</h2>
                            
                            <form method="POST">
                                
                                <div className="form-group">
                                    <label htmlFor="posttitle">Title <span className="require">*</span></label>
                                    <input type="text" className="form-control" name="posttitle" onChange={this.handleInput} value={this.state.posttitle} />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="exampleFormControlFile1">Upload media</label>
                                    <input type="file" className="form-control-file" name="postmedia" key={this.state.inputkey || ""} onChange={this.handleFileUpload}/>
                                </div>
                                
                                <div className="form-group">
                                    <label htmlFor="description">Compose post</label>
                                    <textarea rows="5" className="form-control" name="description" name="postbody" onChange={this.handleInput} value={this.state.postbody}></textarea>
                                </div>
                                
                                <div className="form-group d-flex">
                                    <button type="submit" className="btn btn-primary"  onClick={this.handleSubmit}>
                                        Create
                                    </button>
                                    {this.state.ajaxloading ? Utility.ajaxloader() : <div></div>}

                                    <button className="ml-3 btn btn-default" onClick={this.handleInputClear}>
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

    componentWillMount() {
        let user = store.get("userdata");

        if(!user) {
            alertify.notify("Oooops! Looks like session time has expired. Please sign in again.", "warning", 5, 
                function() {
                    this.props.history.push('/login');
                }.bind(this)
            )
        }
    }
}

export default withRouter(CreatePost);