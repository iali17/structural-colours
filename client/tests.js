import ReactTestUtils from 'react-dom/test-utils'; 
import React, { Component } from 'react';


import App from './client/App';
import MainView from './MainView';
import ProfilePage from './ProfilePage';
import ColorBar from './ColorBar';
import TreeView from './TreeView';


import TreeAndColourView from './TreeAndColourView';

//test that all child components render
Apptest("Render the app component", function () {
	
	var App = TestUtils.renderIntoDocument(
		<App/>
	);

	var main = TestUtils.findRenderedDOMComponentWithClass(
		App, 'MainView'
	);

	var ColorBar = TestUtils.findRenderedDOMComponentWithClass(
		App, 'ColorBar'
	);

	var TreeAndColour = TestUtils.findRenderedDOMComponentWithClass(
		App, 'TreeAndColourView'
	);

	var TreeView = TestUtils.findRenderedDOMComponentWithClass(
		App, 'TreeView'
	);

});