import React, { Component } from "react";
import ReactDOM from "react-dom";
import Select from "./Select";

import "./styles.css";

const Label = props => {
  console.log(props);
  return <label>Select your item</label>;
};

const SelectedItemComponent = props => {
  console.log("SelectedItemComponent", props);
  const toggleButtonPropsProps = props.getToggleButtonProps();
  const { "data-toggle": dataToggle, ...rest } = toggleButtonPropsProps;
  console.log("SelectedItemComponent", dataToggle);
  return (
    <button className="dropdown-button" dataToggle {...rest}>
      {JSON.stringify(rest)}
      {props.state.selectedItem !== ""
        ? props.state.selectedItem
        : "Select a book ..."}
      button
    </button>
  );
};

const ItemsMenu = props => {
  const { isOpen, items } = props;

  const {
    getMenuProps,
    getItemProps,
    highlightedIndex,
    dsSelectedItem
  } = props.downshiftProps;
  console.log("ItemsMenu", props);
  return (
    <ul {...getMenuProps()}>
      {items.map((item, index) => {
        return (
          <li
            style={{
              backgroundColor:
                highlightedIndex === index ? "lightgray" : "white",
              fontWeight: dsSelectedItem === item ? "bold" : "normal"
            }}
            {...getItemProps({
              key: item.value,
              index,
              item
            })}
          >
            {item.name}
          </li>
        );
      })}
    </ul>
  );
};

const rootElement = document.getElementById("root");
ReactDOM.render(
  <Select
    prop1="prop1"
    items={[
      { name: "Harry Potter" },
      { name: "Net Moves" },
      { name: "Half of a yellow sun" },
      { name: "The Da Vinci Code" },
      { name: "Bsorn a crime" }
    ]}
    selectLabel={Label}
    itemsMenu={ItemsMenu}
    selectedItem={SelectedItemComponent}
  />,
  rootElement
);
