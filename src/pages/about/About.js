import React from "react";
import Container from "react-bootstrap/Container";
import appStyles from "../../App.module.css";
import styles from "../../styles/About.module.css";
import { Link } from "react-router-dom";
import { useCurrentUser } from "../../contexts/CurrentUserContext";

function About() {
  const currentUser = useCurrentUser();

  return (
    <Container className={`${appStyles.Content} ${styles.AboutContainer} p-4`}>
      <h2>About EnergyPlace</h2>
      <div className={styles.TwoColumns}>
        <p>
          Welcome to EnergyPlace! Share the special places that recharge and
          inspire you. Our platform is a space for you to post your favorite
          energy-filled spots, explore others' shared locations, and connect
          with a community that celebrates the power of personal inspiration.
        </p>
        <p>
          Our mission is to bring people together through shared experiences
          and foster connections around the world. Thank you for being a part
          of this journey!
          {!currentUser && (
            <>
              <br />
              <div className={styles.Spacer}>
                To post, like, and comment, please{" "}
                <Link to="/signin" className={styles.Link}>
                  sign in!
                </Link>
              </div>
            </>
          )}
        </p>
      </div>
    </Container>
  );
}

export default About;
