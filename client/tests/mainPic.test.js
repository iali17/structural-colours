import React from 'react';
import { expect } from 'chai';
import { shallow, mount } from 'enzyme';
import sinon from 'sinon';
import MainPic from '../components/MainPic.js'

// Checks to see if MainPic renders
describe('<MainPic />', () => {
	it('Component should render', () => {
		const fakeId = sinon.spy();
		const wrapper = shallow(<MainPic id={fakeId} />);

		expect(wrapper).to.be.a('object');
	})
})
