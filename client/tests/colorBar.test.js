import React from 'react';
import { expect } from 'chai';
import { shallow, mount } from 'enzyme';
import sinon from 'sinon';

import ColorBar from '../components/ColorBar';

describe('<ColorBar />', () => {
	it('Component should render', () => {
		const wrapper = shallow(<ColorBar />);
		expect(wrapper).to.be.a('object');
	})

  	it('renders a svg components', () => {
	    const wrapper = shallow(<ColorBar />);
	    expect(wrapper.find("svg")).to.have.length(1);
  	});

 	it('All 7 colors are there', () => {
	    const onButtonClick = sinon.spy();
	    const wrapper = shallow(<ColorBar />);
	    expect(wrapper.find("circle")).to.have.length(7);
  	});

 	it('Clicks on one of the circles', () => {
	    const onButtonClick = sinon.spy();
	    const wrapper = mount((
	      <ColorBar updateColour= {onButtonClick} />
	    ));

	    wrapper.find('circle').at(0).simulate('click');
	    expect(onButtonClick).to.have.property('callCount', 1);
  	});
});
