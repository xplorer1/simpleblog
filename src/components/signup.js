import React from 'react';
import {Link} from "react-router-dom";
import {Loader} from "./homecomponent";

class SignUp extends React.Component {
	constructor() {
		super();
        this.state = {showLoader: true};
	}

	render() {
		return (
			<article>
            {this.state.showLoader === true && <Loader />}
            <link href="assets/css/login.css" rel="stylesheet" />

            {/* Navigation */}
                <nav className="navbar navbar-expand-lg navbar-light fixed-top" id="mainNav" style={{position: "relative", marginBottom: "2rem"}}>
                    <div className="containerr" style={{display: "flex", width: "100%"}}>
                        <Link className="navbar-brand" to="/" id="nav1">My Blog</Link>
                        <button style={{position: "absolute", right: "1rem"}} className="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
                            Menu
                            <i className="fas fa-bars"></i>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarResponsive">

                            <ul className="navbar-nav ml-auto">
                                <li className="nav-item">
                                    <Link className="nav-link" to="/about" id="nav2">About</Link>
                                </li>

                                <li className="nav-item">
                                    <Link className="nav-link" to="/contactme" id="nav3">Contact</Link>
                                </li>

                            </ul>
                        </div>
                    </div>
                </nav>

                <div className="">

                    <section className="signup">
                        <div className="container">
                            <div className="signup-content">
                                <div className="signup-form">
                                    <h2 className="form-title">Sign up</h2>
                                    <form method="POST" className="register-form" id="register-form">
                                        <div className="form-group">
                                            <label htmlFor="name"><i className="zmdi zmdi-account material-icons-name" ></i></label>
                                            <input type="text" name="name" id="name" placeholder="Your Name" />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="email"><i className="zmdi zmdi-email"></i></label>
                                            <input type="email" name="email" id="email" placeholder="Your Email"/>
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="pass"><i className="zmdi zmdi-lock"></i></label>
                                            <input type="password" name="pass" id="pass" placeholder="Password"/>
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="re-pass"><i className="zmdi zmdi-lock-outline"></i></label>
                                            <input type="password" name="re_pass" id="re_pass" placeholder="Repeat your password"/>
                                        </div>
                                        <div className="form-group">
                                            <input type="checkbox" name="agree-term" id="agree-term" className="agree-term" />
                                            <label htmlFor="agree-term" className="label-agree-term"><span><span></span></span>I agree to the 
                                            <a className="term-service" data-toggle="modal" data-target="#exampleModalLong"> terms of service</a></label>
                                        </div>
                                        <div className="form-group form-button">
                                            <input type="submit" name="signup" id="signup" className="form-submit" value="Register"/>
                                        </div>
                                    </form>
                                </div>
                                <div className="signup-image">
                                    <figure><img src="assets/img/signup-image.jpg" alt="sign up image" /></figure>
                                    <Link to="/login" className="signup-image-link">I am already member</Link>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>

                <div className="modal fade" id="exampleModalLong" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLongTitle" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLongTitle">Terms of service</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <div>Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.

                                    Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor.
                                    Aenean lacinia bibendum nulla sed consectetur. Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Donec sed odio dui. Donec ullamcorper nulla non metus auctor fringilla.
                                    Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
                                    Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor.
                                    Aenean lacinia bibendum nulla sed consectetur. Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Donec sed odio dui. Donec ullamcorper nulla non metus auctor fringilla.
                                    Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
                                    Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor.
                                    Aenean lacinia bibendum nulla sed consectetur. Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Donec sed odio dui. Donec ullamcorper nulla non metus auctor fringilla.
                                    Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
                                    Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor.
                                    Aenean lacinia bibendum nulla sed consectetur. Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Donec sed odio dui. Donec ullamcorper nulla non metus auctor fringilla.
                                    Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
                                    Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor.
                                    Aenean lacinia bibendum nulla sed consectetur. Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Donec sed odio dui. Donec ullamcorper nulla non metus auctor fringilla.
                                    Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
                                    Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor.
                                    Aenean lacinia bibendum nulla sed consectetur. Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Donec sed odio dui. Donec ullamcorper nulla non metus auctor fringilla.</div>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                </div>
                        </div>
                    </div>
                </div>
			</article>
		)
	}

    componentDidMount() {

        setTimeout(function() {
            console.log("state: ", this.state)
            this.setState({showLoader: false})
            //this.state.showLoader=false;
        }.bind(this), 2000, this.state.showLoader);

        console.log("after state: ", this.state)
    }
}

export default SignUp;