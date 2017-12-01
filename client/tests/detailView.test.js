import React from 'react';
import Enzyme, { shallow, mount } from 'enzyme';
import configureMockStore from 'redux-mock-store'
import fetchMock from 'fetch-mock'
import { expect } from 'chai';
import { spy } from 'sinon';
import Adapter from 'enzyme-adapter-react-15';
import { createMockStore } from 'redux-test-utils';
import { createMockDispatch } from 'redux-test-utils';
import thunk from 'redux-thunk'
import reducer from '../reducers/detailViewReducer'


Enzyme.configure({ adapter: new Adapter() });

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

describe('test the reducer for DetailView', () => {
    it('should return to intial state', () => {
        expect(reducer(undefined, {})).to.deep.equal(
        {
            detail: {},
            fetching: false,
            fetched: false,
        })
    })

    it('should handle FETCH_DETAIL', () => {
        expect(
            reducer({}, {
                type: "FETCH_DETAIL"
            })).to.deep.equal(
        {
            fetching: true,
        })
    })
    it('should handle FETCH_DETAIL_REJECTED', () => {
        expect(
            reducer({}, {
                type: "FETCH_DETAIL_REJECTED"
            }).fetching).to.deep.equal(false)
    })
})
