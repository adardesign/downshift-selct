import React, { Component } from "react";
import ReactDOM from "react-dom";
import Downshift from "downshift";

import "./styles.css";

export default class Select extends Component {
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
    // todo, provide a default
    const { selectLabel, itemsMenu, selectedItem } = this.props;
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
          console.log("downshift props", props);
          const theSelectLabel = selectLabel(...props);
          const theItemsMenu = itemsMenu({
            items: this.items,
            isOpen: isOpen,
            downshiftProps: { ...props }
          });
          console.log("isOpen", isOpen);
          const theSelectedItem = selectedItem({
            state: this.state,
            isOpen: isOpen,
            selectedItem: highlightedIndex,
            ...props
          });
          console.log("before render return", isOpen);
          return (
            <div>
              {theSelectLabel}
              {theSelectedItem}
              {isOpen && theItemsMenu}
            </div>
          );
        }}
      </Downshift>
    );
  }
}
