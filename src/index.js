import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import About from "./components/about";
import {Home} from "./components/home";
import ContactMe from "./components/contactme";
import Login from "./components/login";
import SignUp from "./components/signup";
import Post from "./components/post";
import Posts from "./components/posts";
import CreatePost from "./components/createpost";

function App() {
    return (
        <Router>
            <Switch>
	    		<Route exact path='/' component={Home} />
				<Route path="/about" component = {About} />
				<Route path="/contactme" component = {ContactMe} />
				<Route path="/login" component = {Login} />
				<Route path="/signup" component = {SignUp} />
				<Route path="/post/:postid" component = {Post} />
				<Route path="/posts" component = {Posts} />
				<Route path="/createpost" component = {CreatePost} />
			</Switch>
        </Router>
    )
}

ReactDOM.render(
	<App />,
	document.getElementById("root")
)