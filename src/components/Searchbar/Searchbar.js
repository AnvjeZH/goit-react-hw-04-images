import { Component } from 'react';
import PropTypes from 'prop-types';
import css from './Searchbar.module.css'
import { BsSearch } from "react-icons/bs";

class Searchbar extends Component {
    state = {
        query: ''
    }

    handleInputChange = e => {
        const {value} = e.currentTarget

        this.setState({query: value.toLowerCase()})
    }
    handleSupmit = e => {
        e.preventDefault()

        if(this.state.query.trim() === '') {
            return alert('Write a query in the search field')
        }

        this.props.onSubmit(this.state.query)
    }
  render() {
    const {query} = this.state
    return (
      <header className={css.searchbar}>
        <form className={css.searchForm} onSubmit={this.handleSupmit}>
          <button type="submit" className={css.searchForm_button}>
            <BsSearch size='1.5em' color='#3f51b5'/>
          </button>

          <input
            className={css.searchForm_input}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            value={query}
            onChange={this.handleInputChange}
          />
        </form>
      </header>
    );
  }
}

export default Searchbar

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired
}