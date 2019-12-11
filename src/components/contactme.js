import React from 'react';
import {Link} from "react-router-dom";

class ContactMe extends React.Component {
	constructor(props) {
		super(props);

		this.handleBlur = this.handleBlur.bind(this);
		this.handleFocus = this.handleFocus.bind(this);
		this.handleInput = this.handleInput.bind(this);
	}

	handleBlur() {
		console.log("Yo man! I handle blur in this clutter of a site.")
	}

	handleFocus() {
		console.log("Yo man! I handle focus in this clutter of a site.")
	}

	handleInput() {
		console.log("Yo nigga! I handle all input in this clutter of a site.")
	}

	render() {
		return (
			<article>
				{/* Navigation */}
  <nav className="navbar navbar-expand-lg navbar-light fixed-top" id="mainNav">
    <div className="container">
      <a className="navbar-brand" href="index.html">My Blog</a>
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
            <Link className="nav-link" to="/login">Login</Link>
          </li>

        </ul>
      </div>
    </div>
  </nav>

  {/* Page Header */}
  <header className="masthead" style={{backgroundImage: "url('assets/img/contact-bg.jpg')"}}>
    <div className="overlay"></div>
    <div className="container">
      <div className="row">
        <div className="col-lg-8 col-md-10 mx-auto">
          <div className="page-heading">
            <h1>Contact Me</h1>
            <span className="subheading">Have questions? I have answers.</span>
          </div>
        </div>
      </div>
    </div>
  </header>

  {/* Main Content */}
  <div className="container">
    <div className="row">
      <div className="col-lg-8 col-md-10 mx-auto">
        <p>Want to get in touch? Fill out the form below to send me a message and I will get back to you as soon as possible!</p>
        {/* Contact Form - Enter your email address on line 19 of the mail/contact_me.php file to make this form work. */}
        {/* WARNING: Some web hosts do not allow emails to be sent through forms to common mail hosts like Gmail or Yahoo. It's recommended that you use a private domain email address! */}
        {/* To use the contact form, your site must be on a live web host with PHP! The form will not work locally! */}
        <form name="sentMessage" id="contactForm" novalidate>
          <div className="control-group">
            <div className="form-group floating-label-form-group controls">
              <label>Name</label>
              <input type="text" className="form-control" placeholder="Name" 
              id="name" required data-validation-required-message="Please enter your name." />
              <p className="help-block text-danger"></p>
            </div>
          </div>
          <div className="control-group">
            <div className="form-group floating-label-form-group controls">
              <label>Email Address</label>
              <input type="email" className="form-control" placeholder="Email Address" 
              id="email" required data-validation-required-message="Please enter your email address." />
              <p className="help-block text-danger"></p>
            </div>
          </div>
          <div className="control-group">
            <div className="form-group col-xs-12 floating-label-form-group controls">
              <label>Phone Number</label>
              <input type="tel" className="form-control" placeholder="Phone Number" 
              id="phone" required data-validation-required-message="Please enter your phone number." />
              <p className="help-block text-danger"></p>
            </div>
          </div>
          <div className="control-group">
            <div className="form-group floating-label-form-group controls">
              <label>Message</label>
              <textarea rows="5" className="form-control" placeholder="Message" 
              id="message" required data-validation-required-message="Please enter a message."></textarea>
              <p className="help-block text-danger"></p>
            </div>
          </div>
          <br />
          <div id="success"></div>
          <div className="form-group">
            <button type="submit" className="btn btn-primary" id="sendMessageButton">Send</button>
          </div>
        </form>
      </div>
    </div>
  </div>

  <hr />

  {/* Footer */}
  <footer>
    <div className="container">
      <div className="row">
        <div className="col-lg-8 col-md-10 mx-auto">
          <ul className="list-inline text-center">
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
          </ul>
          <p className="copyright text-muted">Copyright &copy; Your Website 2019</p>
        </div>
      </div>
    </div>
  </footer>
			</article>
		)
	}
}

export default ContactMe;