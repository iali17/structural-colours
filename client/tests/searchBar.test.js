import React from 'react';
import Enzyme, { shallow, mount } from 'enzyme';
import configureMockStore from 'redux-mock-store'
import { expect } from 'chai';
import { spy } from 'sinon';
import Adapter from 'enzyme-adapter-react-15';
import thunk from 'redux-thunk'
import reducer from '../reducers/landingViewReducer'
import SearchBar from '../components/SearchBar'
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

// checks to see if search bar is rendered
describe('<SearchBar />', () => {
    it('Renders the SearchBar', () => {
        const store = mockStore({});

        const wrapper = shallowWithStore(
        <SearchBar />, store);

        expect(wrapper).to.be.a('object');
    })
})