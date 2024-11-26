import React from "react";
import styles from "../../styles/Profile.module.css";
import btnStyles from "../../styles/Button.module.css";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { Link } from "react-router-dom";
import Avatar from "../../components/Avatar";
import ProfileStats from "../../components/ProfileStats";
import Button from "react-bootstrap/Button";

const Profile = (props) => {
  const { profile, imageSize = 55 } = props;
  const { id, following_id, image, owner } = profile;

  const currentUser = useCurrentUser();
  const is_owner = currentUser?.username === owner;

  return (
    <div className={`my-3 ${styles.Profile}`}>
      <div className="d-flex align-items-center">
        <Link to={`/profiles/${id}`}>
          <Avatar src={image} height={imageSize} />
        </Link>
        <div className={`mx-2 ${styles.WordBreak}`}>
          <strong>{owner}</strong>
        </div>
        {currentUser && !is_owner && (
          <div className="ml-auto">
            <Button
              className={`${btnStyles.Button} ${
                following_id ? btnStyles.BlackOutline : btnStyles.Black
              }`}
              onClick={() => {}}
            >
              {following_id ? "unfollow" : "follow"}
            </Button>
          </div>
        )}
      </div>
      {/* Add ProfileStats */}
      <ProfileStats
        posts_count={profile.posts_count}
        followers_count={profile.followers_count}
        following_count={profile.following_count}
      />
    </div>
  );
};

export default Profile;
