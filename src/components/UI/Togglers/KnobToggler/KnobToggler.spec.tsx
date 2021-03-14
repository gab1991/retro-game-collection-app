import React from 'react';
import { shallow } from 'enzyme';

import { KnobToggler } from './KnobToggler';

describe('<KnobToggler />', () => {
  it('renders one <KnobToggler>', () => {
    const comp = shallow(<KnobToggler checked={false} labelTxt={'good'} onChangeHandler={() => null} />);
    //console.log(comp.debug());
    //finding by classname
    const wrapper = comp.find('.KnobToggler');
    expect(wrapper.length).toBe(1);
  });

  it('contains <input>', () => {
    const comp = shallow(<KnobToggler checked={false} labelTxt={'good'} onChangeHandler={() => null} />);
    const wrapper = comp.find('input');
    expect(wrapper.length).toBe(1);
  });
});
