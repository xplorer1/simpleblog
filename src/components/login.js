import React from 'react';
import {Link} from "react-router-dom";
import {Loader, Utility} from "./home";
import alertify from "alertifyjs";
import store from "store";

class Login extends React.Component {
	constructor() {
        super();

        this.state = {
            email: "",
            password: "",
            showLoader: true,
            ajaxloading: false,
        }

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleInput = this.handleInput.bind(this);
    }

    handleSubmit(e) {

        e.preventDefault();

        if(!this.state.email) {
            alertify.warning("Hi, please enter your email address. Let us know who to log in.")
        }
        else if (!this.state.password) {
            alertify.warning("Uhmmm. We also need you to enter your email address. We need to be sure it's really you.")
        }
        else {

            let data = {
                email: this.state.email,
                password: this.state.password
            }

            this.setState({ ajaxloading: true }, () => {

                fetch(Utility.baseurl + "login", {
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
                        console.log("response: ", response);

                        switch (response.data) {
                            case "email-required":
                                alertify.warning("Please enter your email address.")
                            break;

                            case "password-required":
                                alertify.warning("Please enter your password.")
                            break;

                            case "login-successful": 
                                this.setState({
                                    email: "",
                                    password: ""
                                })

                                store.set("userdata", response.user);

                                alertify.notify('Login in was successfull.', 'success', 2, 
                                    function () {     
                                        this.props.history.push('/createpost')
                                    }.bind(this)
                                );
                            break;

                            case "user-notfound":
                                alertify.error("Oops! Looks like your email address or password is wrong. Please check it or register if you don't have an account.")
                            break;
                        }                          
                    })
                    .catch((error) => {
                        this.setState({ajaxloading: false});
						alertify.warning("Sorry. There has been a problem. Please try again later.")
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
                            </div>

                            <div className="signin-form">
                                <h2 className="form-title">Sign in</h2>
                                <form className="register-form" id="login-form">
                                    <div className="form-group">
                                        <label htmlFor="email"><i className="zmdi zmdi-email material-icons-email"></i></label>
                                        <input type="text" name="email" id="email" placeholder="Your email address"  onChange={this.handleInput} value={this.state.email}/>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="your_pass"><i className="zmdi zmdi-lock"></i></label>
                                        <input type="password" name="password" id="your_pass" placeholder="Password" onChange={this.handleInput} value={this.state.password}/>
                                    </div>
                                    <div className="form-group">
                                        <input type="checkbox" name="remember-me" id="remember-me" className="agree-term" />
                                        <label htmlFor="remember-me" className="label-agree-term"><span><span></span></span>Remember me</label>
                                    </div>
                                    <div className="form-group form-button">
                                        <button type="submit" name="signin" id="signin" className="border-0 form-submit" onClick={this.handleSubmit}>Log in</button>
                                        {this.state.ajaxloading ? Utility.ajaxloader() : <div></div>}
                                    </div>

                                    <Link to="/signup" className="text-justify signup-image-link">Create an account</Link>
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
            this.setState({showLoader: false})
            alertify.set('notifier','position', 'top-bottom');

            store.remove("userdata");
            
        }.bind(this), 1000, this.state.showLoader);
    }
}

export default Login;