import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import About from "./components/about";
import {Home} from "./components/homecomponent";
import ContactMe from "./components/contactme";

function App() {
    return (
        <Router>
            <Switch>
	    		<Route exact path='/' component={Home} />
				<Route path="/about" component = {About} />
				<Route path="/contactme" component = {ContactMe} />
			</Switch>
        </Router>
    )
}

ReactDOM.render(
	<App />,
	document.getElementById("root")
)