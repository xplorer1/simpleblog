import React from 'react';
import {Link, withRouter} from "react-router-dom";
import {Loader, Utility} from "./home";
import axios from "axios";

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
        }

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleInput = this.handleInput.bind(this);
        this.handleInputClear = this.handleInputClear.bind(this);
        this.handleFileUpload = this.handleFileUpload.bind(this);
	}

    handleSubmit(e) {

        e.preventDefault();

        if(!this.state.posttitle) {
            alert("Please provide post title.");
        }
        else if(!this.state.postbody) {
            alert("Please provide the post.");
        }
        else {

            let data = {
                posttitle: this.state.posttitle,
                postbody: this.state.postbody,
                postmedia: this.state.postmedia
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

                        /*switch (response.data) {
                            case "email-required":
                                alertify.warning("Please enter your email address.")
                            break;

                            case "password-required":
                                alertify.warning("Please enter your password.")
                            break;

                            case "signup_successful": 
                                this.setState(() => ({
                                    tocreatepost: true
                                }))

                                alertify.notify('Sign up was successfull.', 'success', 5, 
                                    function () {     

                                        if (this.state.tocreatepost === true) {
                                            console.log("statedata: ", this.state);
                                            this.props.history.push('/createpost')
                                        }
                                    }.bind(this)
                                );

                            break;
                            case "user-exists":
                                console.log("tu: ", this.state);
                                alertify.warning("Oops! Looks like your email address is already registered. Please check it or login if you already registered.")
                            break;
                        }  */                        
                    })
                    .catch((error) => {
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

    handleInputClear() {
        this.setState({
            posttitle: "",
            postmedia: "",
            postbody: ""
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

                            </ul>
                        </div>
                    </div>
                </nav>

				<div className="container pt-5 mt-5">
                    <div className="row">
                        
                        <div className="col-md-8 col-md-offset-2" style={{margin: "0 auto"}}>
                            
                            <h2>Create post</h2>
                            
                            <form action="" method="POST">
                                
                                <div className="form-group">
                                    <label htmlFor="posttitle">Title <span className="require">*</span></label>
                                    <input type="text" className="form-control" name="posttitle" onChange={this.handleInput} value={this.state.posttitle} />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="exampleFormControlFile1">Upload media</label>
                                    <input type="file" className="form-control-file" name="postmedia" onChange={this.handleFileUpload}/>
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

                                    <button className="btn btn-default" onClick={this.handleInputClear}>
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

export default withRouter(CreatePost);