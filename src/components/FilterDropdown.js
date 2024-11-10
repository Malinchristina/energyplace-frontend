import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import { axiosReq } from "../api/axiosDefaults";
import { Container } from "react-bootstrap";
import appStyles from "../App.module.css";
import styles from "../../src/styles/FilterDropDown.module.css";

const FilterDropdown = ({ filterType, setFilter }) => {
  const [options, setOptions] = useState([]);

  useEffect(() => {
    const fetchOptions = async () => {
      try {
        let endpoint;
        if (filterType === "category") {
          endpoint = "/categories";
        }
        // Add Locations
        const { data } = await axiosReq.get(endpoint);
        setOptions(data.results || data);
      } catch (err) {
        console.error(`Error fetching ${filterType} options:`, err);
      }
    };
    fetchOptions();
  }, [filterType]);

  return (
    <Container className={`${appStyles.Content} ${styles.Container}`}>
      <Form.Group controlId={`${filterType}Select`}>
        <Form.Label>Filter on {filterType}</Form.Label>
        <Form.Control
          as="select"
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="">All {filterType}s</option>
          {options.map((option) => (
            <option key={option.id} value={option.id}>
              {option.name}
            </option>
          ))}
        </Form.Control>
      </Form.Group>
    </Container>
  );
};

export default FilterDropdown;
