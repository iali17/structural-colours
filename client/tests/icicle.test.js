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

// const shallowWithStore = (component, store) => {
//   const context = {
//     store,
//   };
//   return shallow(component, { context });
// };
// export default shallowWithStore;

// describe('<Icicle />', () => {
// 	it('should have 1 svg element', () => {
// 		// const state = {
// 		// 	taxonomy: {},
// 		//   	Tfetching: false,
// 		// 	Tfetched: false,
// 		// 	phylum: {},
// 		// 	Pfetching: false,
// 		// 	Pfetched: false,
// 		// 	order: {},
// 		// 	Ofetching: false,
// 		// 	Ofetched: false,
// 		// 	family: {},
// 		// 	Ffetching: false,
// 		// 	Ffetched: false,
// 		// 	species: {},
// 		// 	Sfetching: false,
// 		// 	Sfetched: false,
// 		// }
// 		// const action = {
// 		// 	switch (action.type) {
// 		//     case "FETCH_TAXONOMY": {
// 		//       return {...state, Tfetching: true}
// 		//     }
// 		//     case "FETCH_TAXONOMY_REJECTED": {
// 		//       return {...state, Tfetching: false, error: action.payload}
// 		//     }
// 		//     case "FETCH_TAXONOMY_FULFILLED": {
// 		//       return {
// 		//         ...state,
// 		//         Tfetching: false,
// 		//         Tfetched: true,
// 		//         taxonomy: action.payload,
// 		//       }
// 		//     }
// 		//     case "FETCH_PHYLUM": {
// 		//       return {...state, Pfetching: true}
// 		//     }
// 		//     case "FETCH_PHYLUM_REJECTED": {
// 		//       return {...state, Pfetching: false, error: action.payload}
// 		//     }
// 		// }
// 		//const store = createMockStore(state);
// 		//const dispatchMock = createMockDispatch();
// 		//store.dispatch(action)
// 		//expect(component.contains(<svg />).to.equal(true));
// 		//console.log(dispatchMock.isActionTypeDispatched(action), "action", action, "store",store.getActions());

// 		const component = shallow(Icicle);
// 		console.log(component)

// 		//expect(store.getAction(action.type)).to.equal(action);
// 		//expect(store.isActionDispatched(action)).to.equal(true);
// 	    //expect(store.isActionTypeDispatched(action.type)).to.equal(true);
// 	    //expect(store.getState()).to.equal(state);
// 	    //expect(component).to.be.a('object');
// 	})
// });
