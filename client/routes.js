
import React from 'react';
import { Route, IndexRoute } from 'react-router';

{/* from https://stackoverflow.com/questions/41956465/how-to-create-multiple-page-app-using-react */}

import MainView from './components/MainView';
import ProfilePage from './components/ProfilePage';
import ColorBar from './components/ColorBar';
import TreeView from './components/TreeView';
import App from './components/App';

export default (
	<Route path="/" component={App}>
		<IndexRoute component={App}/>
		<Route path = "/ProfilePage" component = {ProfilePage} />
	</Route>
);