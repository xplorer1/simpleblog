import React from 'react';
import {Link} from "react-router-dom";

class About extends React.Component {
	constructor() {
		super();
	}

	render() {
		return (
			<article>
				{/* Navigation */}
  <nav className="navbar navbar-expand-lg navbar-light fixed-top" id="mainNav">
    <div className="container">
      <Link className="navbar-brand" to="/">My Blog</Link>
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
            <Link className="nav-link" to="/signup">Sign Up</Link>
          </li>

          <li className="nav-item">
				<a className="nav-link" data-toggle="modal" data-target="#myModal">Post to my blog?</a>
		  </li>

        </ul>
      </div>
    </div>
  </nav>

  {/* Page Header */}
  <header className="masthead" style={{backgroundImage: "url('img/about-bg.jpg')"}}>
    <div className="overlay"></div>
    <div className="container">
      <div className="row">
        <div className="col-lg-8 col-md-10 mx-auto">
          <div className="page-heading">
            <h1>About Me</h1>
            <span className="subheading">This is what I do.</span>
          </div>
        </div>
      </div>
    </div>
  </header>

  {/* Main Content */}
  <div className="container">
    <div className="row">
      <div className="col-lg-8 col-md-10 mx-auto">
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Saepe nostrum ullam eveniet pariatur voluptates odit, fuga atque ea nobis sit soluta odio, adipisci quas excepturi maxime quae totam ducimus consectetur?</p>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eius praesentium recusandae illo eaque architecto error, repellendus iusto reprehenderit, doloribus, minus sunt. Numquam at quae voluptatum in officia voluptas voluptatibus, minus!</p>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aut consequuntur magnam, excepturi aliquid ex itaque esse est vero natus quae optio aperiam soluta voluptatibus corporis atque iste neque sit tempora!</p>
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

  			<div id="myModal" className="modal fade" role="dialog">
					<div className="modal-dialog">

						<div className="modal-content">
							<div className="modal-header">
								<h5 className="modal-title" id="exampleModalLongTitle">Enter your password.</h5>
								<button type="button" className="close" data-dismiss="modal" aria-label="Close">
						          <span aria-hidden="true">&times;</span>
						        </button>
							</div>

							<div className="modal-body">
								<div className="">Are you registered? <br />Enter your password to write and publish.</div>

								<div className="form-group">
                                    <label htmlFor="your_pass"></label>
                                    <input type="password" name="your_pass" id="your_pass" placeholder="Password" className="cust-btn" />
                                </div>
							</div>

							<div className="modal-footer">
								<Link type="button" className="btn btn-primary" to="/createpost">Login</Link>
								<button type="button" className="btn btn-secondary" data-dismiss="modal">Cancel</button>
							</div>
						</div>
					</div>
				</div>
			</article>
		)
	}
}

export default About;