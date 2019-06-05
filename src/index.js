import React, { Component } from "react";
import ReactDOM from "react-dom";
import Downshift from "downshift";

import "./styles.css";

const Label = props => {
  console.log(props);
  return <label>Select your item</label>;
};

const SelectedItemComponent = props => {
  console.log(props);
  return (
    <button className="dropdown-button" {...props}>
      {JSON.stringify(props)}
      {props.state.selectedItem !== ""
        ? props.state.selectedItem
        : "Select a book ..."}
      button
    </button>
  );
};

const ItemsMenu = props => {
  const {
    isOpen,
    items,
    getMenuProps,
    getItemProps,
    highlightedIndex,
    dsSelectedItem
  } = props;
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

class DownshiftThree extends Component {
  constructor(props) {
    super(props);
    console.log(props.prop1);
    this.items = props.items;

    this.state = {
      selectedItem: ""
    };

    this.onChange = this.onChange.bind(this);
  }

  onChange(selectedItem) {
    this.setState({ selectedItem: selectedItem.name });
  }

  render() {
    return (
      <Downshift
        onChange={this.onChange}
        selectedItem={this.state.selectedItem}
        itemToString={items => (items ? items.name : "")}
      >
        {props => {
          const {
            isOpen,
            getToggleButtonProps,
            getItemProps,
            getMenuProps,
            highlightedIndex,
            selectedItem: dsSelectedItem,
            getLabelProps,
            getToggleProps
          } = props;
          console.log(props);
          return (
            <div>
              {Label && <Label labelProps={{ ...getLabelProps() }} />}
              {SelectedItemComponent && (
                <SelectedItemComponent
                  state={this.state}
                  isOpen={isOpen}
                  selectedItem={highlightedIndex}
                  {...getToggleButtonProps()}
                />
              )}

              <div style={{ position: "relative" }}>
                {isOpen && ItemsMenu && (
                  <ItemsMenu items={this.items} {...props} />
                )}
              </div>
            </div>
          );
        }}
      </Downshift>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(
  <DownshiftThree
    prop1="prop1"
    items={[
      { name: "Harry Potter" },
      { name: "Net Moves" },
      { name: "Half of a yellow sun" },
      { name: "The Da Vinci Code" },
      { name: "Bsorn a crime" }
    ]}
  />,
  rootElement
);
