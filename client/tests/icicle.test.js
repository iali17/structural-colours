import React from 'react';
import Enzyme, { shallow, mount } from 'enzyme';
import configureMockStore from 'redux-mock-store'
import fetchMock from 'fetch-mock'
import { expect } from 'chai';
import { spy } from 'sinon';
import Icicle from '../components/Icicle.js';
import Adapter from 'enzyme-adapter-react-15';
import { createMockStore } from 'redux-test-utils';
import { createMockDispatch } from 'redux-test-utils';
import thunk from 'redux-thunk'
import { fetchTax, } from '../actions/taxonomyActions'
import reducer from '../reducers/icicleViewReducer'
import promise from 'redux-promise-middleware';
import { applyMiddleware } from 'redux';


Enzyme.configure({ adapter: new Adapter() });

const middlewares = applyMiddleware(promise(), thunk)
const mockStore = configureMockStore(reducer, middlewares)


describe('Test the actions', () => {
	afterEach(() => {
		fetchMock.reset();
		fetchMock.restore();
	})

	it('Tests the fetch taxonomy action', () => {
		
		const expectedActions = [
	      { type: "FETCH_TAXONOMY" },
	      { type: "FETCH_TAXONOMY_FULFILLED", payload: undefined }
      	]
      	const store = mockStore({})

      	return store.dispatch(fetchTax()).then(() => {
      		console.log(store.getState())
      		expect(store.getActions()).to.equal(expectedActions)
      	})
	})
	// it('should test the fetchtax action', () => {
	// 	const expectedAction = {
	// 		type: "FETCH_TAXONOMY",
	// 		payload: undefined
	// 	}
	// 	expect(fetchTax()).to.equal(expectedAction)
	// })

})

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


describe('icicle', () => {
	it('should render itself PLEASE', () => {
		const store = mockStore({icicleView: {
			taxonomy: {}, Tfetching: false, Tfetched: false
			}
		});

		const dispatchMock = createMockDispatch();
	    const action = {
	      type: 'FETCH_TAXONOMY',
	    };
	    dispatchMock.dispatch(action);

		const wrapper = mount(
   		<Icicle dispatch={dispatchMock} store={store}
   		/>);

   		expect(wrapper.find("div")).to.have.length(1);
	})
})

describe('icicle dispatch', () => {
	it('fetchtax', () => {
		const state = 'state';
	    
	})
})
