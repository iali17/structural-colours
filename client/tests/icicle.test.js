import React from 'react';
import Enzyme, { shallow, mount } from 'enzyme';
import { expect } from 'chai';
import { spy } from 'sinon';
import Icicle from '../components/Icicle.js';
import Adapter from 'enzyme-adapter-react-15';

Enzyme.configure({adapter: new Adapter()});

describe('<Icicle />', () => {
	it('should have 1 svg element', () => {
		const wrapper = shallow(<Icicle />);
		expect(wrapper.contains(<svg />).to.equal(true));
	})
});