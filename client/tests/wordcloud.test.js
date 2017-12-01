import React from 'react';
import Enzyme, { shallow, mount } from 'enzyme';
import configureMockStore from 'redux-mock-store'
import fetchMock from 'fetch-mock'
import { expect } from 'chai';
import { spy } from 'sinon';
import WordCloud from '../components/WordCloud.js';
import Adapter from 'enzyme-adapter-react-15';
import { createMockStore } from 'redux-test-utils';
import { createMockDispatch } from 'redux-test-utils';
import thunk from 'redux-thunk'
import { fetchAuthor, fetchArticle, fetchAuthorTest } from '../actions/detailActions'
import { fetchTax, } from '../actions/taxonomyActions'
import reducer from '../reducers/wordCloudReducer'


Enzyme.configure({ adapter: new Adapter() });

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)


describe('Test the word cloud actions', () => {
    afterEach(() => {
        fetchMock.reset();
        fetchMock.restore();
    })

    it('Tests the fetch author action', () => {
        fetchMock
        .getOnce('/todos', { body: { payload: ['do something'] }, headers: { 'content-type': 'application/json' } })

        const expectedActions = [
          { type: "FETCH_AUTHOR" },
          { type: "FETCH_AUTHOR_FULFILLED", payload: ["data?"]}
        ]
        const store = mockStore({payload: []});
        console.log(store.dispatch(fetchTax()));
        return store.dispatch(fetchAuthorTest()).then(() => {
            expect(store.getActions()).to.deep.equal(expectedActions)
        })
    })

    it('Tests the fetch article action', () => {
        fetchMock
        .getOnce('/todos', { body: { payload: ['do something'] }, headers: { 'content-type': 'application/json' } })

        const expectedActions = [
          { type: "FETCH_ARTICLE" },
          { type: "FETCH_ARTICLE_FULFILLED", payload: ["data?"]}
        ]
        const store = mockStore({payload: []})


        return store.dispatch(fetchArticle('Seago, A. E.', 13)).then(() => {
            expect(store.getActions()).to.deep.equal(expectedActions)
        })
    })
})

describe('test the reducer for WordCloud', () => {
    it('should return to intial state', () => {
        expect(reducer(undefined, {})).to.deep.equal(
        {
            author: {},
            fetching: false,
            fetched: false,
            article: {},
            article_fetching: false,
            article_fetched: false,
        })
    })

    it('should handle FETCH_AUTHOR', () => {
        expect(
            reducer({}, {
                type: "FETCH_AUTHOR"
            })).to.deep.equal(
        {
            fetching: true,
        })
    })
    it('should handle FETCH_ARTICLE', () => {
        expect(
            reducer({}, {
                type: "FETCH_ARTICLE"
            })).to.deep.equal(
        {
            article_fetching: true,
        })
    })
    it('should handle FETCH_AUTHOR_REJECTED', () => {
        expect(
            reducer({}, {
                type: "FETCH_AUTHOR_REJECTED"
            }).fetching).to.deep.equal(false)
    })
    it('should handle FETCH_ARTICLE_REJECTED', () => {
        expect(
            reducer({}, {
                type: "FETCH_ARTICLE_REJECTED"
            }).article_fetching).to.deep.equal(false)
    })
});
