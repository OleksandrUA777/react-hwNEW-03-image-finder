import PropTypes from 'prop-types';

import { Component } from 'react';
import { Form, Icon, Input } from './Searchbar.styled';

export class Searchbar extends Component {
  state = {
    value: '',
  };
  handleFormSubmit = event => {
    event.preventDefault();

    this.props.onSubmit(this.state.value);
    this.setState({ value: '' });
  };
  handleInputChange = event => {
    this.setState({ value: event.currentTarget.value });
  };
  render() {
    return (
      <header className="searchbar">
        <Form className="form" onSubmit={this.handleFormSubmit}>
          <button type="submit" className="button">
            <Icon />
          </button>

          <Input
            className="input"
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            value={this.state.value}
            onChange={this.handleInputChange}
          />
        </Form>
      </header>
    );
  }
}
Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
