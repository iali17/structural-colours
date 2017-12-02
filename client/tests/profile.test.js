import React from 'react';
import Enzyme, { shallow, mount } from 'enzyme';
import configureMockStore from 'redux-mock-store'
import { expect } from 'chai';
import { spy } from 'sinon';
import Adapter from 'enzyme-adapter-react-15';
import thunk from 'redux-thunk'
import reducer from '../reducers/profileViewReducer'
import ProfilePage from '../components/ProfilePage'
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

describe('<ProfilePage />', () => {
    it('Renders profilepage', () => {
        const pic = spy();
        const store = mockStore({ 
            detailView: {
                detail: {},
                dfetching: false,
                dfetched: false
            },
            profileView:{
                picture: {},
                pfetching: false,
                pfetched: false
            }
        });

        const wrapper = shallowWithStore(
        <ProfilePage />, store);

        expect(wrapper).to.be.a('object');
    })
})

describe('test the reducer for ProfilePage', () => {
    it('should return to intial state', () => {
        expect(reducer(undefined, {})).to.deep.equal(
        {
            picture: {},
            fetching: false,
            fetched: false,
        })
    })

    it('should handle FETCH_ONE_PICTURE', () => {
        expect(
            reducer({}, {
                type: "FETCH_ONE_PICTURE"
            })).to.deep.equal(
        {
            fetching: true,
        })
    })
    it('should handle FETCH_ONE_PICTURE_REJECTED', () => {
        expect(
            reducer({}, {
                type: "FETCH_ONE_PICTURE_REJECTED"
            }).fetching).to.deep.equal(false)
    })
})
