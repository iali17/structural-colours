import React from 'react';
import { expect } from 'chai';
import { shallow, mount } from 'enzyme';
import sinon from 'sinon';
import MainPic from '../components/MainPic.js'

describe('<MainPic />', () => {
	it('Should have an img component', () => {
		const fakeID = sinon.spy();
		const wrapper = shallow(<MainPic pic = {fakeID}/>);
		expect(wrapper.find("img")).to.have.length(1);
	})
})
