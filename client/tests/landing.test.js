import React from 'react';
import Enzyme, { shallow, mount } from 'enzyme';
import configureMockStore from 'redux-mock-store'
import { expect } from 'chai';
import { spy } from 'sinon';
import Adapter from 'enzyme-adapter-react-15';
import thunk from 'redux-thunk'
import reducer from '../reducers/landingViewReducer'
import LandingPic from '../components/LandingPic'
import LandingView from '../components/LandingView'
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

// Checks to see if LandingView renders
describe('<LandingView />', () => {
    it('Renders the LandingView', () => {
        const store = mockStore(
        {
            landingView:
            {
                picture: {},
                fetching: false,
                fetched: false
            }
        });

        const wrapper = shallowWithStore(
        <LandingView />, store);

        expect(wrapper).to.be.a('object');
    })
})

// Checks to see if LandingPic renders
describe('<LandingPic />', () => {
    it('Renders the LandingPic', () => {

        const wrapper = shallow(
        <LandingPic />);

        expect(wrapper).to.be.a('object');
    })
})

// tests if reducers return what is expected.
describe('test the reducer for LandingView', () => {
    it('should return to intial state', () => {
        expect(reducer(undefined, {})).to.deep.equal(
        {
            picture: {},
            fetching: false,
            fetched: false,
        })
    })

    it('should handle FETCH_RANDOM_PICTURE', () => {
        expect(
            reducer({}, {
                type: "FETCH_RANDOM_PICTURE"
            })).to.deep.equal(
        {
            fetching: true,
        })
    })
    it('should handle FETCH_RANDOM_PICTURE_REJECTED', () => {
        expect(
            reducer({}, {
                type: "FETCH_RANDOM_PICTURE_REJECTED"
            }).fetching).to.deep.equal(false)
    })
    it('should handle FETCH_RANDOM_PICTURE_FULFILLED', () => {
        expect(
            reducer({}, {
                type: "FETCH_RANDOM_PICTURE_FULFILLED"
            }).fetching).to.deep.equal(false)
    })
})
