import React from "react";
import styles from "./Searchbar.module.css";
import PropTypes from "prop-types";
import { IoIosSearch } from "react-icons/io";

function Searchbar ({onSubmit, query }) {
    return (
      <header className={styles.searchBar}>
        <form className={styles.searchForm} onSubmit={onSubmit}>
          <button type="submit" className={styles.SearchFormButton}>
            <span className={styles.SearchFormButtonLabel}>Search</span>
          </button>
          <IoIosSearch className={styles.icon} />
          <input
            className={styles.searchFormInput}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            name="query"
            value={query}
          />
        </form>
      </header>
    )
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default Searchbar;