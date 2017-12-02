import React from 'react';
import Enzyme, { shallow, mount } from 'enzyme';
import configureMockStore from 'redux-mock-store'
import { expect } from 'chai';
import { spy } from 'sinon';
import Icicle from '../components/Icicle.js';
import Adapter from 'enzyme-adapter-react-15';
import thunk from 'redux-thunk'
import reducer from '../reducers/icicleViewReducer'
import promise from 'redux-promise-middleware';
import { applyMiddleware } from 'redux';

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

// checks to see if the icicle renders
describe('<Icicle />', () => {
	it('Renders icicle', () => {
		const store = mockStore({icicleView: {
			taxonomy: {}, Tfetching: false, Tfetched: false
			}
		});

		const wrapper = shallowWithStore(
   		<Icicle/>, store);

   		expect(wrapper).to.be.a('object');
	})
})

// tests if reducers return what is expected.
describe('Reducers for Icicle', () => {
	it('should return to intial state', () => {
		expect(reducer(undefined, {})).to.deep.equal(
		{
			taxonomy: {},
			Tfetching: false,
			Tfetched: false
		})
	})


	it('should handle FETCH_TAXONOMY', () => {
		expect(
			reducer(undefined, {
				type: "FETCH_TAXONOMY"
			})).to.deep.equal(
		{
			Tfetching: true,
			Tfetched: false,
			taxonomy: {}
		})
	})

	it('should handle FETCH_TAXONOMY_REJECTED', () => {
		expect(
			reducer(undefined, {
				type: "FETCH_TAXONOMY_REJECTED"
			})).to.deep.equal(
		{
			Tfetching: false,
			Tfetched: false,
			taxonomy: {},
			error: undefined
		})
	})

	it('should handle FETCH_TAXONOMY_FULFILLED', () => {
		expect(
			reducer(undefined, {
				type: "FETCH_TAXONOMY_FULFILLED"
			})).to.deep.equal(
		{
			Tfetching: false,
			Tfetched: true,
			taxonomy: undefined
		})
	})
})
