import { Form, Button, Col, Row, Container } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Formik } from "formik";
import * as yup from "yup";

import { ToastService } from "../../services/toast.service";
import AuthService from "../../services/auth.service";

const Login = () => {
  const [isLoading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleDispatchLogin = (response: any) => {
    dispatch({ type: "AUTHENTICATE", authentication: response.result });
  };

  const loginRequest = async (user: any) => {
    setLoading(true);
    try {
      const response = await AuthService.login(user);
      if(response.success && response.result?.accessToken){
        handleDispatchLogin(response);
          navigate("/");
      }
      
    } catch (error) {
      ToastService.error("ERROR_GENERIC");
    } finally {
      setLoading(false);
    }
  };

  const initialValues = {
    email: "",
    password: ""
  };

  const schema = yup.object().shape({
    email: yup.string().required("REQUIRED"),
    password: yup.string().required("REQUIRED")
  });

  const handleSubmit = (values: any) => {
    loginRequest(values);
  };

  return (
    <Container >
      <Row className="justify-content-center mt-5 ">
        <Col xs={12} sm={8} md={6}>
          <Formik
            initialValues={initialValues}
            validationSchema={schema}
            onSubmit={handleSubmit}
          >
            {({ handleSubmit, handleChange, values, touched, isValid, errors }) => (
              <Form noValidate onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label>{"LOGIN"}</Form.Label>
                  <Form.Control
                    name="email"
                    type="text"
                    value={values.email}
                    onChange={handleChange}
                    disabled={isLoading}
                    isInvalid={touched.email && !!errors.email}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.email}
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mb-4">
                  <Form.Label>{"PASSWORD"}</Form.Label>
                  <Form.Control
                    name="password"
                    type="password"
                    value={values.password}
                    onChange={handleChange}
                    disabled={isLoading}
                    isInvalid={touched.password && !!errors.password}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.password}
                  </Form.Control.Feedback>
                </Form.Group>
                <Row>
                  <Col xs={12}>
                    <Button variant="primary" type="submit" disabled={isLoading}>
                      {"Enviar"}
                    </Button>
                  </Col>
                </Row>
              </Form>
            )}
          </Formik>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
