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
            highlightedIndex,
            getLabelProps
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

              {isOpen && ItemsMenu && (
                <ItemsMenu items={this.items} {...props} state={this.state} />
              )}
            </div>
          );
        }}
      </Downshift>
    );
  }
}
