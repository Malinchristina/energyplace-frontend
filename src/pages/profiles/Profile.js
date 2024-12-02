import React from "react";
import styles from "../../styles/Profile.module.css";
import btnStyles from "../../styles/Button.module.css";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { Link } from "react-router-dom";
import Avatar from "../../components/Avatar";
import ProfileStats from "../../components/ProfileStats";
import Button from "react-bootstrap/Button";

const Profile = (props) => {
  const { profile, imageSize = 55, showFollowButton = true } = props;
  const { id, following_id, image, owner } = profile;
  const currentUser = useCurrentUser();
  const is_owner = currentUser?.username === owner;
  const handleFollow = () => {
    props.handleFollowToggle && props.handleFollowToggle();
  };

  return (
    <div className={`my-3 ${styles.Profile}`}>
      {/* Make the entire profile card clickable */}
      <Link to={`/profiles/${id}`}>
        <div className="d-flex align-items-center">
          {/* Avatar remains separately clickable */}
          <Avatar src={image} height={imageSize} />

          {/* The owner name is still a link */}
          <div className={`mx-2 ${styles.WordBreak}`}>
            <strong>{owner}</strong>
          </div>

          {/* Only show the follow button for logged-in users who are not the profile owner */}
          {currentUser && !is_owner && showFollowButton && (
            <div className="ml-auto">
              <Button
                className={`${btnStyles.Button} ${
                  following_id ? btnStyles.BlackOutline : btnStyles.Black
                }`}
                onClick={handleFollow}
              >
                {following_id ? "unfollow" : "follow"}
              </Button>
            </div>
          )}
        </div>
      </Link>
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
