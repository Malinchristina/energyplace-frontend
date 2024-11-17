import React, { useEffect, useRef, useState } from "react";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Alert from "react-bootstrap/Alert";
import Image from "react-bootstrap/Image";

import Asset from "../../components/Asset";

import Upload from "../../assets/upload.png";

import styles from "../../styles/PostCreateEditForm.module.css";
import appStyles from "../../App.module.css";
import btnStyles from "../../styles/Button.module.css";

import { useHistory } from "react-router";
import { axiosReq } from "../../api/axiosDefaults";
import { useRedirect } from "../../hooks/useRedirect";

function PostCreateForm() {
  useRedirect("loggedOut");
  const [errors, setErrors] = useState({});
  const [categories, setCategories] = useState([]);
  const [locations, setLocations] = useState([]);

  const [postData, setPostData] = useState({
    title: "",
    content: "",
    image: "",
    category:"",
    location:"",
    locality:"",
  });
  const { title, content, image, category } = postData;

  const imageInput = useRef(null);
  const history = useHistory();

  // Fetch categories from the backend on component mount

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(
          "https://energyplace-be-f35f3084f662.herokuapp.com/categories"
        );
        const data = await response.json();
  
        // Log the data to confirm it's a direct array
        console.log("Fetched categories:", data);
  
        // Set categories directly from the fetched data
        setCategories(data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
  
    fetchCategories();

    const fetchLocations = async () => {
      try {
        const response = await fetch(
          "https://energyplace-be-f35f3084f662.herokuapp.com/locations/full-countries/"
        );
        const data = await response.json();
        console.log("Fetched locations:", data);
        setLocations(data);
      } catch (error) {
        console.error("Error fetching locations:", error);
      }
    };
  
    fetchLocations();
  }, []);

  const handleChange = (event) => {
    setPostData({
      ...postData,
      [event.target.name]: event.target.value,
    });
  };

  const handleChangeImage = (event) => {
    if (event.target.files.length) {
      URL.revokeObjectURL(image);
      setPostData({
        ...postData,
        image: URL.createObjectURL(event.target.files[0]),
      });
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    // Validation check for required fields
    if (!title || !content || !category || !postData.location || !postData.locality) {
      alert("Please fill out all required fields.");
      return;
    }
    const formData = new FormData();

    formData.append("title", title);
    formData.append("content", content);
    formData.append("image", imageInput.current.files[0]);
    formData.append("category_id", category.toString());
    formData.append("location_id", parseInt(postData.location, 10));
    formData.append("locality", postData.locality);
    

    try {
      const { data } = await axiosReq.post("/posts/", formData);
      history.push(`/posts/${data.id}`);
    } catch (err) {
      console.log("Error details:", err.response?.data);  // Log detailed error
      if (err.response?.status !== 401) {
        setErrors(err.response?.data);
      }
    }
    // } catch (err) {
    //   console.log(err);
    //   if (err.response?.status !== 401) {
    //     setErrors(err.response?.data);
    //   }
    // }
  };

  const textFields = (
    <div className="text-center">
      <Form.Group>
        <Form.Label>Title</Form.Label>
        <Form.Control
          type="text"
          name="title"
          value={title}
          onChange={handleChange}
        />
      </Form.Group>
      {errors?.title?.map((message, idx) => (
        <Alert variant="warning" key={idx}>
          {message}
        </Alert>
      ))}

      <Form.Group>
        <Form.Label>Category</Form.Label>
        <Form.Control
          as="select"
          name="category"
          value={category}
          onChange={handleChange}
          required
        >
          <option value="">Select a category</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </Form.Control>
      </Form.Group>
      {errors?.category?.map((message, idx) => (
        <Alert variant="warning" key={idx}>
          {message}
        </Alert>
      ))}

      {/* <Form.Group>
        <Row>
          <Form.Label>Location</Form.Label>
          <Form.Control
            as="select"
            name="location"
            value={postData.location}
            onChange={handleChange}
            required
          >
            <option value="">Select a location</option>
            {locations.map((loc) => (
              <option key={loc.code} value={loc.code}>
                {loc.name}
              </option>
            ))}
          </Form.Control>
        </Row>
      </Form.Group>
      {errors?.category?.map((message, idx) => (
        <Alert variant="warning" key={idx}>
          {message}
        </Alert>
      ))} */}

      <Form.Group>
        <Row>
          <Col xs={6}>
            <Form.Label>Country</Form.Label>
            <Form.Control
              as="select"
              name="location"
              value={postData.location}
              onChange={handleChange}
              required
            >
              <option value="" disabled>Select country</option>
              {locations.map((loc) => (
                <option key={loc.id} value={loc.id}>
                  {loc.name}
                </option>
              ))}
            </Form.Control>
          </Col>
          <Col xs={6}>
            <Form.Label>Locality</Form.Label>
            <Form.Control
              type="text"
              name="locality"
              value={postData.locality}
              onChange={handleChange}
              placeholder="Enter locality"
              required
            />
          </Col>
        </Row>
      </Form.Group>
      {errors?.location?.map((message, idx) => (
        <Alert variant="warning" key={idx}>
          {message}
        </Alert>
      ))}
      {errors?.locality?.map((message, idx) => (
        <Alert variant="warning" key={idx}>
          {message}
        </Alert>
      ))}

      <Form.Group>
        <Form.Label>Content</Form.Label>
        <Form.Control
          as="textarea"
          rows={6}
          name="content"
          value={content}
          onChange={handleChange}
        />
      </Form.Group>
      {errors?.content?.map((message, idx) => (
        <Alert variant="warning" key={idx}>
          {message}
        </Alert>
      ))}

      <Button
        className={`${btnStyles.Button} ${btnStyles.Blue}`}
        onClick={() => history.goBack()}
      >
        cancel
      </Button>
      <Button className={`${btnStyles.Button} ${btnStyles.Blue}`} type="submit">
        create
      </Button>
    </div>
  );

  return (
    <Form onSubmit={handleSubmit}>
      <Row>
        <Col className="py-2 p-0 p-md-2" md={7} lg={8}>
          <Container
            className={`${appStyles.Content} ${styles.Container} d-flex flex-column justify-content-center`}
          >
            <Form.Group className="text-center">
              {image ? (
                <>
                  <figure>
                    <Image className={appStyles.Image} src={image} rounded />
                  </figure>
                  <div>
                    <Form.Label
                      className={`${btnStyles.Button} ${btnStyles.Blue} btn`}
                      htmlFor="image-upload"
                    >
                      Change the image
                    </Form.Label>
                  </div>
                </>
              ) : (
                <Form.Label
                  className="d-flex justify-content-center"
                  htmlFor="image-upload"
                >
                  <Asset
                    src={Upload}
                    message="Click or tap to upload an image"
                  />
                </Form.Label>
              )}

              <Form.File
                id="image-upload"
                accept="image/*"
                onChange={handleChangeImage}
                ref={imageInput}
              />
            </Form.Group>
            {errors?.image?.map((message, idx) => (
              <Alert variant="warning" key={idx}>
                {message}
              </Alert>
            ))}

            <div className="d-md-none">{textFields}</div>
          </Container>
        </Col>
        <Col md={5} lg={4} className="d-none d-md-block p-0 p-md-2">
          <Container className={appStyles.Content}>{textFields}</Container>
        </Col>
      </Row>
    </Form>
  );
}

export default PostCreateForm;