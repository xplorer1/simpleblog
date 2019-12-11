import React from 'react';
import {Link} from "react-router-dom";
import {Loader} from "./home";

class Login extends React.Component {
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

                <section className="sign-in">
                    <div className="container">
                        <div className="signin-content">
                            <div className="signin-image">
                                <figure><img src="assets/img/signin-image.jpg" alt="sing up image" /></figure>
                                <Link to="/signup" className="signup-image-link">Create an account</Link>
                            </div>

                            <div className="signin-form">
                                <h2 className="form-title">Sign in</h2>
                                <form method="POST" className="register-form" id="login-form">
                                    <div className="form-group">
                                        <label htmlFor="your_name"><i className="zmdi zmdi-account material-icons-name"></i></label>
                                        <input type="text" name="your_name" id="your_name" placeholder="Your Name"/>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="your_pass"><i className="zmdi zmdi-lock"></i></label>
                                        <input type="password" name="your_pass" id="your_pass" placeholder="Password"/>
                                    </div>
                                    <div className="form-group">
                                        <input type="checkbox" name="remember-me" id="remember-me" className="agree-term" />
                                        <label htmlFor="remember-me" className="label-agree-term"><span><span></span></span>Remember me</label>
                                    </div>
                                    <div className="form-group form-button">
                                        <input type="submit" name="signin" id="signin" className="form-submit" value="Log in"/>
                                    </div>
                                </form>
                                <div className="social-login">
                                    <span className="social-label">Or login with</span>
                                    <ul className="socials">
                                        <li><a href="#"><i className="display-flex-center zmdi zmdi-facebook"></i></a></li>
                                        <li><a href="#"><i className="display-flex-center zmdi zmdi-twitter"></i></a></li>
                                        <li><a href="#"><i className="display-flex-center zmdi zmdi-google"></i></a></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

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

export default Login;