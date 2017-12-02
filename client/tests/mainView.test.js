import React from 'react';
import Enzyme, { shallow, mount } from 'enzyme';
import configureMockStore from 'redux-mock-store'
import { expect } from 'chai';
import { spy } from 'sinon';
import Adapter from 'enzyme-adapter-react-15';
import thunk from 'redux-thunk'
import reducer from '../reducers/landingViewReducer'
import MainView from '../components/MainView'
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


describe('<MainView />', () => {
    it('Renders the MainView', () => {
        const store = mockStore(
        {
            app:
            {
                activeTab: 0,
                id: 1,
            },
            mainView:
            {
                pictures: {},
                fetching: false,
                fetched: false
            }
        });

        const wrapper = shallowWithStore(
        <MainView />, store);

        expect(wrapper).to.be.a('object');
    })
})

describe('test the reducer for MainView', () => {
    it('should return to intial state', () => {
        expect(reducer(undefined, {})).to.deep.equal(
        {
            picture: {},
            fetching: false,
            fetched: false,
        })
    })

    it('should handle FETCH_PICTURES', () => {
        expect(
            reducer(undefined, {
                type: "FETCH_PICTURES"
            })).to.deep.equal(
        {  
            picture: {},
            fetching: false,
            fetched: false
        })
    })
    it('should handle FETCH_PICTURES_REJECTED', () => {
        expect(
            reducer(undefined, {
                type: "FETCH_PICTURES_REJECTED",
            })).to.deep.equal(
        {
            picture: {},
            fetching: false,
            fetched: false,
        })
    })
    it('should handle FETCH_PICTURES_FULFILLED', () => {
        expect(
            reducer(undefined, {
                type: "FETCH_PICTURES_FULFILLED",
            })).to.deep.equal(
        {
            picture: {},
            fetching: false,
            fetched: false,
        })
    })
    it('should handle FETCH_NEXT_PICTURES', () => {
        expect(
            reducer(undefined, {
                type: "FETCH_NEXT_PICTURES"
            })).to.deep.equal(
        {
            picture: {},
            fetching: false,
            fetched: false
        })
    })
    it('should handle FETCH_NEXT_PICTURES_REJECTED', () => {
        expect(
            reducer(undefined, {
                type: "FETCH_NEXT_PICTURES_REJECTED"
            }).fetching).to.deep.equal(false)
    })
})
