import React, { useEffect, useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

interface Field {
  label: string;
  name: string;
  type: string;
  value: any;
}

interface RegisterModalProps {
  show: boolean;
  onHide: (data: any | null, isEditing: boolean) => void;
  fields: Field[];
  isEditing: boolean;
  title: string;
}

const RegisterModal: React.FC<RegisterModalProps> = ({
  show,
  onHide,
  fields,
  isEditing,
  title,
}) => {
  const [data, setData] = useState<{ [key: string]: any }>({});
  useEffect(() => {
    if (show) {
      const initialData: any = {};
      fields.forEach((field) => {
        initialData[field.name] = field.value;
      });
      setData(initialData);
    }
  }, [show, fields]);

  const handleAccept = () => {
    Clean();
    onHide(data, isEditing);
  };

  const handleCancel = () => {
    Clean();
    onHide(null, isEditing);
  };

  const Clean = () =>{
    const clearedData: any = {};
    fields.forEach((field) => {
        clearedData[field.name] = field.value !== undefined ? field.value : '';
      });
    setData(clearedData);
  }

  const handleChange = (e: any, name: string) => {
    const { value, type } = e.target;
    let convertedValue: any = value;

    if (type === 'checkbox') {
      convertedValue = e.target.checked;
    }

    setData((prevData) => ({
      ...prevData,
      [name]: convertedValue,
    }));
  };
  

  return (
    <Modal show={show} onHide={handleCancel} centered>
      <Modal.Header closeButton>
        <Modal.Title>
          {isEditing ? `Editar ${title}` : `Cadastro de ${title}`}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          {fields.map((field) => (
            <Form.Group key={field.name}>
            {field.type === 'checkbox' ? (<>
                <Form.Label>{field.label}</Form.Label>
                <Form.Check
                    type={field.type}
                    label={field.label}
                    name={field.name}
                    checked={data[field.name] || false}
                    onChange={(e) => handleChange(e, field.name)}
                />
            </>
            ) : field.type !== 'null' ? (<>
                <Form.Label>{field.label}</Form.Label>            
                <Form.Control
                    type={field.type}
                    name={field.name}
                    value={data[field.name] || ''}
                    onChange={(e) => handleChange(e, field.name)}
                />
            </>
            ) : null}
            </Form.Group>
          ))}
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleCancel}>
          Cancelar
        </Button>
        <Button variant="primary" onClick={handleAccept}>
          Aceitar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default RegisterModal;
