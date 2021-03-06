import React from 'react';
import Enzyme, { shallow, mount } from 'enzyme';
import configureMockStore from 'redux-mock-store'
import { expect } from 'chai';
import { spy } from 'sinon';
import Adapter from 'enzyme-adapter-react-15';
import thunk from 'redux-thunk'
import reducer from '../reducers/appReducer'
import App from '../components/App'
import { applyMiddleware } from 'redux';
import promise from 'redux-promise-middleware';

// configure adapter
Enzyme.configure({ adapter: new Adapter() });

// setup middleware and store.
const middlewares = applyMiddleware(promise(), thunk)
const mockStore = configureMockStore(reducer, middlewares)


// taken from https://medium.com/@visualskyrim/test-your-redux-container-with-enzyme-a0e10c0574ec
const shallowWithStore = (component, store) => {
	const context = {
    	store,
  	};
  	return shallow(component, { context });
};

// Checks to see if app renders.
describe('<App />', () => {
	it('Renders the whole app', () => {
		const store = mockStore(
		{
			app:
			{
				activeTab: 0,
	   			colour: "init"
			}
		});

		const wrapper = shallowWithStore(
   		<App />, store);

   		expect(wrapper).to.be.a('object');
	})
})


// tests if reducers return what is expected.
describe('Reducers for App', () => {
	it('should return to intial state', () => {
		expect(reducer(undefined, {})).to.deep.equal(
		{
			activeTab: 0,
  			colour: "init",
  			id: "init",
		})
	})


	it('should handle SWITCH_TABS', () => {
		expect(
			reducer(undefined, {
				type: "SWITCH_TABS",
				tab: 1
			})).to.deep.equal(
		{
			activeTab: 1,
  			colour: "init",
  			id: "init",
		})
	})

	it('should handle SET_CURRENT_COLOUR', () => {
		expect(
			reducer(undefined, {
				type: "SET_CURRENT_COLOUR",
				colour: "red"
			})).to.deep.equal(
		{
			activeTab: 0,
  			colour: "red",
  			id: "init",
		})
	})

	it('should handle SET_CURRENT_ID', () => {
		expect(
			reducer(undefined, {
				type: "SET_CURRENT_ID",
				id: "1"
			})).to.deep.equal(
		{
			activeTab: 0,
  			colour: "init",
  			id: "1",
		})
	})
})
