import Enzyme from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";

Enzyme.configure({ adapter: new Adapter() });

import React from "react";
import renderer from "react-test-renderer";
import { mount } from "enzyme";

import Header from "./Header";

describe("Header", () => {
  it("renders successfully", () => {
    const tree = renderer.create(<Header />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("should be shown", () => {
    const wrapper = mount(<Header />);
    expect(wrapper).not.toBeNull();
  });

  it("should show correct text", () => {
    const wrapper = mount(<Header />);
    expect(wrapper.text().includes("Countries App")).toBe(true);
  });
});
