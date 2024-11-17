import React from 'react';
import NoResults from "../assets/no-results.png";
import { Link } from 'react-router-dom';
import styles from "../styles/NotFound.module.css";
import Asset from "./Asset";

const NotFound = () => {
  return (
    <div className={styles.NotFound}>
      <Asset
        src={NoResults}
        message={
          <>
            Sorry, the page you're looking for doesn't exist.{" "}
            <Link to="/" className={styles.Link}>
              Go back home.
            </Link>
          </>
        }
      />
    </div>
  );
};

export default NotFound
