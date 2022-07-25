import React from "react";

import Select, { components } from "react-select";

const Control = ({ children, ...props }) => {
  const { emoji } = props.selectProps;
  const style = { cursor: "pointer" };

  return (
    <components.Control {...props}>
      <span style={style}>{emoji}</span>
      {children}
    </components.Control>
  );
};

const CustomSelect = (props) => {
  const styles = {
    control: (css) => ({ ...css, paddingLeft: "1rem" }),
  };

  return (
    <Select
      {...props}
      emoji={"🔍"}
      components={{ Control }}
      isSearchable
      styles={styles}
    />
  );
};

export default CustomSelect;
