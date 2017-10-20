import React from 'react';
import {Route, IndexRoute} from 'react-router';
/* from https://stackoverflow.com/questions/41956465/how-to-create-multiple-page-app-using-react

import TreeAndColourView from './TreeAndColourView';
import MainView from './MainView';
import ProfilePage from './ProfilePage';
import ColorBar from './ColorBar';
import TreeView from './TreeView';

export default (
	<Route path="/" component{App}>
		<IndexRoute component={MainPage}/>
		<Route path = "/ProfilePage" component = {ProfilePage} />
	</Route>
);