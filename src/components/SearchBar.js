// SearchBar.js
import React from "react";
import Form from "react-bootstrap/Form";
import styles from "../styles/SearchBar.module.css";

const SearchBar = ({ value, onChange, placeholder }) => (
  <div className={styles.SearchBarContainer}>
    <i className={`fas fa-search ${styles.SearchIcon}`} />
    <Form onSubmit={(e) => e.preventDefault()} className={styles.SearchBar}>
      <Form.Control
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </Form>
  </div>
);

export default SearchBar;
