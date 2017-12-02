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


Enzyme.configure({ adapter: new Adapter() });

const middlewares = applyMiddleware(promise(), thunk)
const mockStore = configureMockStore(reducer, middlewares)

const shallowWithStore = (component, store) => {
    const context = {
        store,
    };
    return shallow(component, { context });
};


describe('<SearchBar />', () => {
    it('Renders the SearchBar', () => {
        const store = mockStore({});

        const wrapper = shallowWithStore(
        <SearchBar />, store);

        expect(wrapper).to.be.a('object');
    })
})