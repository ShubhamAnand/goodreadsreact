import React from 'react';
import LoaderCustom from '../src/components/Loader';
import { shallow,configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16'


configure({ adapter: new Adapter() })

describe("Testing LoaderCustom Component", () => {
    it('should render correctly', () => {
        const wrapper = shallow(
            <LoaderCustom store={store} onChange={()=>{}} autoFocus="true" value="12"/>)
            expect(wrapper).toMatchSnapshot();
      });
    
      it('should display passed text correctly', () => {
        const textwrapper = shallow(
            <UserTextInput value="This is value"/>);
            expect(textwrapper).toMatchSnapshot();
            expect(textwrapper.find('TextInput').props().value).toBe('This is value');
      });

      //triggering events
      it('should update state on focus', () => {
        const textwrapperonchange = shallow(
            <UserTextInput value="This is value"/>)
             //console.log(textwrapperonchange.debug());
             expect(textwrapperonchange).toMatchSnapshot();
            (textwrapperonchange.at(0).find('TextInput').simulate('focus'));
            expect(textwrapperonchange).toMatchSnapshot();
           // expect(textwrapperonchange.state().inFocus).toBe(true);
      });

      it('should update state on blur', () => {
        const textwrapperonfocus = shallow(
            <UserTextInput value="This is value"/>);
            (textwrapperonfocus.find('TextInput').simulate('blur'));
            expect(textwrapperonfocus).toMatchSnapshot();
            expect(textwrapperonfocus.state().inFocus).toBe(false);
      });
});

