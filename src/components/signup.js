import React from 'react';
import {Link, Redirect} from "react-router-dom";
import {Loader, Utility} from "./home";
import alertify from "alertifyjs";
import store from "store";

class SignUp extends React.Component {
	constructor() {
		super();

        this.state = {
            email: "",
            username: "",
            password: "",
            agreeterm: "",
            re_password: "",
            showLoader: true,
            ajaxloading: false,
            tocreatepost: false,
        }

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleInput = this.handleInput.bind(this);
	}

    handleSubmit = (e) => {

        e.preventDefault();

        if(!this.state.email) {
            alertify.warning("How will we have that feel that is only you? Please enter your email address. We promise not to spam you.")
        }
        else if(!Utility.validmail(this.state.email)) {
            alertify.warning("Hmm. Not to cast slur on you, but it doesn't quite look your email address is correct. Please confirm.")
        }
        else if(!this.state.username) {
            alertify.warning("Hi, we need a name to call you. Please enter your name.")
        }
        else if (!this.state.password) {
            alertify.warning("Sorry. A strong password is needed to secure your account.")
        }
        else if (this.state.password.length < 8) {
            alertify.warning("Hmmm...That password is easy to guess. It needs to exceed 8 characters.")
        }
        else if(!this.state.re_password) {
            alertify.warning("You need to let us know you are sure what your password is. Please confirm your password.")
        }
        else if(this.state.password.toString() !== this.state.re_password.toString()) {
            alertify.warning("Wow! Such error. It appears your passwords don't match.")
        }
        else if (!this.state.agreeterm) {
            alertify.warning("You have to agree to our terms before you can proceed.")
        }
        else {

            let data = {
                email: this.state.email,
                password: this.state.password,
                username: this.state.username
            }

            this.setState({ ajaxloading: true }, () => {

                fetch(Utility.baseurl + "signup", {
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
                            case "email-required":
                                alertify.warning("Please enter your email address.")
                            break;

                            case "name-required":
                                alertify.warning("Please enter your name.")
                            break;

                            case "password-required":
                                alertify.warning("Please enter your password.")
                            break;

                            case "signup-successful": 

                                store.set("userdata", response.user);

                                alertify.notify('Sign up was successfull.', 'success', 2, 
                                    function () {
                                        this.props.history.push('/createpost')
                                    }.bind(this)
                                );

                                return this.handleInputClear();

                            break;
                            case "user-exists":
                                alertify.warning("Oops! Looks like your email address is already registered. Please check it or login if you already registered.")
                                return this.handleInputClear();
                            break;
                        }                          
                    })
                    .catch((error) => {
                        this.setState({ajaxloading: false});

                        alertify.warning("We are truly sorry, there has been an error. Please try again later.")
                        console.log("erro: ", error);
                        return this.handleInputClear();
                    }) 
                })
            }
    }

    handleCheck = (e) => {

        this.setState({
            [e.target.name]: e.target.checked
        });
    }

    handleInput = (e) => {

        this.setState({
            [e.target.name]: e.target.value
        });
    }

    handleInputClear = () => {
        this.setState({
            email: "",
            username: "",
            password: "",
            agreeterm: false,
            re_password: ""
        })
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
                                    <div className="register-form" id="register-form">
                                        <div className="form-group">
                                            <label htmlFor="email"><i className="zmdi zmdi-email"></i></label>
                                            <input type="email" name="email" id="email" placeholder="Your Email" onChange={this.handleInput} value={this.state.email}/>
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="name"><i className="zmdi zmdi-person"></i></label>
                                            <input type="text" name="username" id="username" placeholder="Your name" onChange={this.handleInput} value={this.state.username}/>
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="pass"><i className="zmdi zmdi-lock"></i></label>
                                            <input type="password" name="password" id="pass" placeholder="Password" onChange={this.handleInput} value={this.state.password}/>
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="re-pass"><i className="zmdi zmdi-lock"></i></label>
                                            <input type="password" name="re_password" id="re_pass" placeholder="Repeat your password"onChange={this.handleInput} value={this.state.re_password}/>
                                        </div>
                                        <div className="form-group">
                                            <input type="checkbox" name="agreeterm" id="agreeterm" className="agreeterm" onChange={this.handleCheck} value={this.state.agreeterm}/>
                                            <label htmlFor="agreeterm" className="label-agree-term"><span><span></span></span>I agree to the 
                                            <a className="term-service" data-toggle="modal" data-target="#exampleModalLong"> terms of service</a></label>
                                        </div>
                                        <div className="form-group form-button">
                                            <input type="submit" name="signup" id="signup" className="form-submit" onClick={this.handleSubmit} />
                                            {this.state.ajaxloading ? Utility.ajaxloader() : <div></div>}
                                        </div>

                                        <Link to="/login" className="text-justify signup-image-link">I am already member</Link>
                                    </div>
                                </div>

                                <div className="signup-image">
                                    <figure><img src="assets/img/signup-image.jpg" alt="sign up image" /></figure>
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
            this.setState({showLoader: false})
            alertify.set('notifier','position', 'top-bottom');
            
            store.remove("userdata");
        }.bind(this), 1000, this.state.showLoader);
    }
}

export default SignUp;