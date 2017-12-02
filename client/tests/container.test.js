import React from 'react';
import Enzyme, { shallow, mount } from 'enzyme';
import configureMockStore from 'redux-mock-store'
import { expect } from 'chai';
import { spy } from 'sinon';
import Adapter from 'enzyme-adapter-react-15';
import thunk from 'redux-thunk'
import reducer from '../reducers/landingViewReducer'
import Container from '../components/Container'
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


describe('<Container />', () => {
    it('Renders the Container', () => {
        const store = mockStore(
        {
            app:
            {
                activeTab: 0,
                id: 1,
            }
        });

        const wrapper = shallowWithStore(
        <Container />, store);

        expect(wrapper).to.be.a('object');
    })
})