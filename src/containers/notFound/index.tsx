import { Button, Col, Container, Row } from "react-bootstrap";
import { useNavigate } from "react-router";

const NotFound = () => {
  const navigate = useNavigate();
  return (
    <main>
      <section className="vh-100 d-flex align-items-center justify-content-center">
        <Container>
          <Row>
            <Col
              xs={12}
              className="text-center d-flex align-items-center justify-content-center"
            >
              <div>
                <h1 className="text-primary mt-5">
                  {"NOT_FOUND.PAGE"}{" "}
                  <span className="fw-bolder">{"NOT_FOUND.NOT_FOUND"}</span>
                </h1>
                <p className="lead my-4">{"NOT_FOUND.RESOURCE_NOT_FOUND"}</p>
                <Button
                  variant="primary"
                  className="animate-hover"
                  onClick={() => {
                    navigate("/");
                  }}
                >
                  {"NOT_FOUND.BACK_TO_HOME_PAGE"}
                </Button>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </main>
  );
};
export default NotFound;
