import { useState } from 'react';
import PropTypes from 'prop-types';
import css from './Searchbar.module.css';
import { BsSearch } from 'react-icons/bs';

export default function Searchbar({ onSubmit }) {
  const [query, setQuery] = useState('');

  const handleInputChange = e => {
    const { value } = e.currentTarget;

    setQuery(value.toLowerCase());
  };

  const handleSupmit = e => {
    e.preventDefault();

    if (query.trim() === '') {
      return alert('Write a query in the search field');
    }

    onSubmit(query);
  };

  return (
    <header className={css.searchbar}>
      <form className={css.searchForm} onSubmit={handleSupmit}>
        <button type="submit" className={css.searchForm_button}>
          <BsSearch size="1.5em" color="#3f51b5" />
        </button>

        <input
          className={css.searchForm_input}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={query}
          onChange={handleInputChange}
        />
      </form>
    </header>
  );
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
