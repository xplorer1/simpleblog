import React from 'react';
import {Link} from "react-router-dom";

class Login extends React.Component {
	constructor() {
		super();
	}

	render() {
		return (
			<article>
                <div className="limiter">
                    <div className="container-login100">
                        <div className="wrap-login100">
                            <form className="login100-form validate-form">
                                <span className="login100-form-title p-b-34">
                                    Account Login
                                </span>
                                
                                <div className="wrap-input100 rs1-wrap-input100 validate-input m-b-20" data-validate="Type user name">
                                    <input id="first-name" className="input100" type="text" name="username" placeholder="User name" />
                                    <span className="focus-input100"></span>
                                </div>
                                <div className="wrap-input100 rs2-wrap-input100 validate-input m-b-20" data-validate="Type password" >
                                    <input className="input100" type="password" name="pass" placeholder="Password" />
                                    <span className="focus-input100"></span>
                                </div>
                                
                                <div className="container-login100-form-btn">
                                    <button className="login100-form-btn">
                                        Sign in
                                    </button>
                                </div>

                                <div className="w-full text-center p-t-27 p-b-239">
                                    <span className="txt1">
                                        Forgot
                                    </span>

                                    <a href="#" className="txt2">
                                        User name / password?
                                    </a>
                                </div>
                            </form>

                            <div className="login100-more" style={{backgroundImage: "url('assets/img/bg-01.jpg')"}}></div>
                        </div>
                    </div>
                </div>
                
			</article>
		)
	}
}

export default Login;