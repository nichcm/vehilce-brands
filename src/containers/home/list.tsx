import React, { useState } from "react";
import { Container, Row, Col, Table, Button, Modal, Form } from "react-bootstrap";
import { FaEdit, FaPlus } from "react-icons/fa";

const Home = () => {
  const [brands, setBrands] = useState<any[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [newBrand, setNewBrand] = useState({
    name: "",
    isNational: false,
    isActive: false,
  });

  const handleAddBrand = () => {
    setBrands([...brands, newBrand]);
    setShowModal(false);
    setNewBrand({ name: "", isNational: false, isActive: false });
  };

  const handleEditBrand = (index : any) => {
    // Implemente a lógica para editar uma marca específica aqui
    console.log("Editar marca de índice", index);
  };

  return (
    <Container>
      <h1>Dados de Marcas</h1>

      <Row className="mb-3">
        <Col>
          <Button variant="primary" onClick={() => setShowModal(true)}>
            <FaPlus /> Novo
          </Button>
        </Col>
      </Row>

      <Table striped bordered>
        <thead>
          <tr>
            <th>Nome da Marca</th>
            <th>Nacional</th>
            <th>Status Ativo</th>
            <th>Ação</th>
          </tr>
        </thead>
        <tbody>
          {brands.map((brand: any, index) => (
            <tr key={index}>
              <td>{brand.name}</td>
              <td>{brand.isNational ? "Sim" : "Não"}</td>
              <td>{brand.isActive ? "Sim" : "Não"}</td>
              <td>
                <Button
                  variant="primary"
                  onClick={() => handleEditBrand(index)}
                >
                  <FaEdit /> Editar
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Nova Marca</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Nome da Marca</Form.Label>
              <Form.Control
                type="text"
                placeholder="Nome da Marca"
                value={newBrand.name}
                onChange={(e) =>
                  setNewBrand({ ...newBrand, name: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group>
              <Form.Check
                type="checkbox"
                label="Nacional"
                checked={newBrand.isNational}
                onChange={(e) =>
                  setNewBrand({
                    ...newBrand,
                    isNational: e.target.checked,
                  })
                }
              />
            </Form.Group>
            <Form.Group>
              <Form.Check
                type="checkbox"
                label="Status Ativo"
                checked={newBrand.isActive}
                onChange={(e) =>
                  setNewBrand({
                    ...newBrand,
                    isActive: e.target.checked,
                  })
                }
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Fechar
          </Button>
          <Button variant="primary" onClick={handleAddBrand}>
            Salvar
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default Home;
