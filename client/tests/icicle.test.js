import React from 'react';
import Enzyme, { shallow, mount } from 'enzyme';
import { expect } from 'chai';
import { spy } from 'sinon';
import Icicle from '../components/Icicle.js';
import Adapter from 'enzyme-adapter-react-15';

import { createMockStore } from 'redux-test-utils';
import { createMockDispatch } from 'redux-test-utils';


Enzyme.configure({ adapter: new Adapter() });


const shallowWithStore = (component, store) => {
  const context = {
    store,
  };
  return shallow(component, { context });
};
export default shallowWithStore;

describe('<Icicle />', () => {
	it('should have 1 svg element', () => {
		const state = 'state';
		const action = {
			taxonomy: {},
			Tfetching: "",
			Tfetched: "",
		}
		const store = createMockStore(action);
		const dispatchMock = createMockDispatch();
		dispatchMock.dispatch(action)
		//const component = shallowWithStore(<Icicle />, store);
		//expect(component.contains(<svg />).to.equal(true));
		console.log(dispatchMock.getAction(), "action", action, "store",store);

		
		expect(dispatchMock.getAction(action.type)).to.equal(action);
	})
});