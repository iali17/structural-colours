import React from 'react';
import Enzyme, { shallow, mount } from 'enzyme';
import configureMockStore from 'redux-mock-store'
import { expect } from 'chai';
import { spy } from 'sinon';
import Adapter from 'enzyme-adapter-react-15';
import thunk from 'redux-thunk'
import reducer from '../reducers/wordCloudReducer'
import WordCloud from '../components/WordCloud'
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

describe('<WordCloud />', () => {
    it('Renders the WordCloud', () => {
        const store = mockStore({
            wordCloud:
            {
                author: {},
                fetching: false,
                fetched: false,
                article: {},
                article_fetching: false,
                article_fetched: false
            }
        });

        const wrapper = shallowWithStore(
        <WordCloud />, store);

        expect(wrapper).to.be.a('object');
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
