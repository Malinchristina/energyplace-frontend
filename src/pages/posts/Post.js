import React, { useState } from "react";
import appStyles from "../../App.module.css";
import styles from "../../styles/Post.module.css";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import Card from "react-bootstrap/Card";
import Media from "react-bootstrap/Media";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import Alert from "react-bootstrap/Alert";
import { Link } from "react-router-dom";
import Avatar from "../../components/Avatar";
import { axiosRes } from "../../api/axiosDefaults";
import { MoreDropdown } from "../../components/MoreDropdown";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const Post = (props) => {
  const {
    id,
    owner,
    profile_id,
    profile_image,
    comments_count,
    likes_count,
    like_id,
    title,
    content,
    image,
    updated_at,
    postPage,
    setPosts,
    onLikeUnlike,
    category,
    location,
    locality,
  } = props;

  const currentUser = useCurrentUser();
  const is_owner = currentUser?.username === owner;
  const history = useHistory();
  const [successMessage, setSuccessMessage] = useState("");


  const handleEdit = () => {
    history.push(`/posts/${id}/edit`);
  };

  const handleDelete = async () => {
    try {
      await axiosRes.delete(`/posts/${id}/`);
      setSuccessMessage("Post deleted successfully."); // Set success message
    setTimeout(() => {
      history.goBack(); // Go back after showing the message
    }, 5000);
    } catch (err) {
      console.log(err);
    }
  };

  const handleLike = async () => {
    try {
      const { data } = await axiosRes.post("/likes/", { post: id });
      setPosts((prevPosts) => ({
        ...prevPosts,
        results: prevPosts.results.map((post) => {
          return post.id === id
            ? { ...post, likes_count: post.likes_count + 1, like_id: data.id }
            : post;
        }),
      }));
      onLikeUnlike();
    } catch (err) {
      console.log(err);
    }
  };

  const handleUnlike = async () => {
    try {
      await axiosRes.delete(`/likes/${like_id}/`);
      setPosts((prevPosts) => ({
        ...prevPosts,
        results: prevPosts.results.map((post) => {
          return post.id === id
            ? { ...post, likes_count: post.likes_count - 1, like_id: null }
            : post;
        }),
      }));
      onLikeUnlike();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      {/* Display success message */}
      {successMessage && (
        <Alert variant="success" className={appStyles.CutstomAlert}>
          {successMessage}
        </Alert>
      )}
      <Card className={styles.Post}>
        <Card.Body>
          <Media className="align-items-center justify-content-between">
            <Link to={`/profiles/${profile_id}`}>
              <Avatar src={profile_image} height={55} />
              {owner}
            </Link>
            <div className="d-flex align-items-center">
              <span>{updated_at}</span>
              {is_owner && postPage && (
                <MoreDropdown
                  handleEdit={handleEdit}
                  handleDelete={handleDelete}
                />
              )}
            </div>
          </Media>
        </Card.Body>
        <Link to={`/posts/${id}`}>
          <Card.Img src={image} alt={title} />
        </Link>
        <Card.Body>
          {title && <Card.Title className="text-center">{title}</Card.Title>}
          {category && (
            <div className="text-center">Category: {category.name}</div>
          )}
          {location && (
          <>
          <div className="text-center">
            Location: {locality ? `${locality}, ` : ""}{location.country_name}
          </div>
          </>
          )}
          {content && <Card.Text>{content}</Card.Text>}
          <div className={styles.PostBar}>
            {is_owner ? (
              <OverlayTrigger
                placement="top"
                overlay={<Tooltip>You can't like your own post!</Tooltip>}
              >
                <i className="far fa-heart" />
              </OverlayTrigger>
            ) : like_id ? (
              <span onClick={handleUnlike}>
                <i className={`fas fa-heart ${styles.Heart}`} />
              </span>
            ) : currentUser ? (
              <span onClick={handleLike}>
                <i className={`far fa-heart ${styles.HeartOutline}`} />
              </span>
            ) : (
              <OverlayTrigger
                placement="top"
                overlay={<Tooltip>Log in to like posts!</Tooltip>}
              >
                <i className="far fa-heart" />
              </OverlayTrigger>
            )}
            {likes_count}
            {currentUser ? (
            <Link to={`/posts/${id}`}>
              <i className="far fa-comments" />
            </Link>
            ) : (
              <OverlayTrigger
                placement="top"
                overlay={<Tooltip>Log in to comment on posts!</Tooltip>}
              >
                <i className="far fa-comments" />
              </OverlayTrigger>
            )}
            {comments_count}
          </div>
        </Card.Body>
      </Card>
    </>
  );
};

export default Post;