import React from 'react';
import {Link} from "react-router-dom";
import {Loader, Utility} from "./home";

class About extends React.Component {
	constructor() {
		super();
	}

	render() {
		return (
			<article>
                <Utility.nav />

                <Utility.header image="about-bg" title="About Me" sub="This is what I do." />  

                <div className="container-fluid">
                    <div className="row">
                        <div className="col-lg-8 col-md-10 mx-auto">
                            <p>I am a writer and a traveller and a food enthusiast. All that you'll see when you browse through my blog.</p>
                            <p>Hey, you also want to publish here? Well, you are highly welcomed to do so. Just sign up and you are good to go.</p>
                            <p>It's that easy!!!</p>
                        </div>
                    </div>
                </div>

                <hr />

                <Utility.footer />
			</article>
		)
	}
}

export default About;