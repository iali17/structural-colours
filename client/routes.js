import React from 'react';
import { Route, Switch } from 'react-router-dom';
{/* from https://stackoverflow.com/questions/41956465/how-to-create-multiple-page-app-using-react */}

import MainView from './components/MainView';
import ProfilePage from './components/ProfilePage';
import ColorBar from './components/ColorBar';
import TreeView from './components/TreeView';
import App from './components/App';

const Main =() => (
	<main>
		<Switch>
			<Route exact path="/" component={App}/>
			<Route path = "/ProfilePage" component = {ProfilePage} />
		</Switch>
	</main>
);

export default Main;
