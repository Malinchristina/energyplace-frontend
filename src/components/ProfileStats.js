import React from "react";
import { Row, Col } from "react-bootstrap";

const ProfileStats = ({ posts_count, followers_count, following_count }) => {
  return (
    <Row className="justify-content-center no-gutters text-center mt-3">
      <Col xs={4}>
        <div>{posts_count}</div>
        <div>posts</div>
      </Col>
      <Col xs={4}>
        <div>{followers_count}</div>
        <div>followers</div>
      </Col>
      <Col xs={4}>
        <div>{following_count}</div>
        <div>following</div>
      </Col>
    </Row>
  );
};

export default ProfileStats;
