import React from 'react';
import {Link} from "react-router-dom";
import {Loader, Utility} from "./home";
import alertify from "alertifyjs";
import store from "store";

class ContactMe extends React.Component {
	constructor() {
		super();

        this.state = {
            contactname: "",
            contactemail: "",
            contactmessage: "",
            ajaxloading: false,
        }
	}

	handleSubmit = (e) => {
		e.preventDefault();

        if (!this.state.contactname) {
            alertify.warning("We need your name. Please provide one.")
        }
        else if(!this.state.contactemail) {
            alertify.warning("Hi, please enter your email address. How else will we get back to you?")
        }
        else if (!Utility.validmail(this.state.contactemail)) {
            alertify.warning("Oooops! Such error. It appears your email address is not correct. Please check and try again.")
        }
        else if (!this.state.contactmessage) {
            alertify.warning("Uhmmmmm. Why are you contacting us? Please tell us.")
        }
        else {

            let data = {
                contactname: this.state.contactname,
                contactemail: this.state.contactemail,
                contactmessage: this.state.contactmessage
            }

            this.setState({ ajaxloading: true }, () => {

                fetch(Utility.baseurl + "contactme", {
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
                            case "complaintname-required":
                                alertify.warning("Please enter your name")
                            break;

                            case "complaintemail-required":
                                alertify.warning("Please provide your email address")
                            break;

                            case "complaintmessage-required":
                                alertify.warning("Please tell us why you are contacting us.")
                            break;

                            case "complaint-saved": 
                                this.setState({
                                    contactemail: "",
                                    contactname: "",
                                    contactmessage: ""
                                })

                                alertify.success("Your message was recived. We'll get back to you ASAP.") 
                            break;

                            case "user-notfound":
                                alertify.error("Oops! Looks like your email address or password is wrong. Please check it or register if you don't have an account.")
                            break;
                        }                          
                    })
                    .catch((error) => {
                        this.setState({ajaxloading: false});
                        console.log("erro: ", error);
                    }) 
                })
            }
	}

	handleInput = (e) => {
		this.setState({
            [e.target.name]: e.target.value
        });
	}

	render() {
		return (
			<article>
				<Utility.nav />

                <Utility.header image="contact-bg" title="Contact Me" sub="Have questions? I have answers." />

                <div className="container-fluid">
                    <div className="row">
                        <div className="col-lg-8 col-md-10 mx-auto">
                            <p>Want to get in touch? Fill out the form below to send me a 
                            message and I will get back to you as soon as possible!</p>
                        
                            <form name="sentMessage" id="contactForm" noValidate>

                                <div className="control-group">
                                    <div className="form-group floating-label-form-group controls">
                                        <label>Name</label>
                                        <input name="contactname" onChange={this.handleInput} value={this.state.contactname} type="text" className="form-control" placeholder="Name" 
                                        id="name" />
                                    </div>
                                </div>

                                <div className="control-group">
                                    <div className="form-group floating-label-form-group controls">
                                        <label>Email Address</label>
                                        <input name="contactemail" onChange={this.handleInput} value={this.state.contactemail} type="email" className="form-control" placeholder="Email Address" 
                                        id="email" />
                                    </div>
                                </div>

                                <div className="control-group">

                                    <div className="form-group floating-label-form-group controls">
                                        <label>Message</label>
                                        <textarea name="contactmessage" onChange={this.handleInput} value={this.state.contactmessage} rows="5" className="form-control" placeholder="Message" 
                                        id="message" ></textarea>
                                    </div>
                                </div>
                                <br />

                                <div className="form-group">
                                    <button type="submit" className="btn btn-primary" id="sendMessageButton" 
                                    onClick={this.handleSubmit}>Send</button>
                                    {this.state.ajaxloading ? Utility.ajaxloader() : <div></div>}
                                </div>
                            </form>
                        </div>
                    </div>
                </div>

                <hr />

                {/* Footer */}
                <Utility.footer />

			</article>
		)
	}
}

export default ContactMe;