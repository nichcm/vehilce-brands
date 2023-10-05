import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { FaEdit, FaPlus, FaStickyNote } from 'react-icons/fa';
import RegisterModal from '../../components/RegisterModal';
import BrandService from '../../services/brand.service';
import { ToastService } from '../../services/toast.service';
import PaginatedTable from '../../components/PaginatedTable';

const Home = () => {
  const [brands, setBrands] = useState<any[]>([]);
  const [editbrand, setEditbrand] = useState<number>(0);
  const [pageSize, setPageSize] = useState<number>(10);
  const [pageNumber, setPageNumber] = useState<number>(1); 
  const [showModal, setShowModal] = useState(false);

  const jsonFieldsDefaultValues = [
    { label: 'Nome da Marca', name: 'brandName', type: 'text', value: '' },
    { label: 'Nacional', name: 'isNational', type: 'checkbox', value: false },
    { label: 'Status Ativo', name: 'status', type: 'checkbox', value: false },
  ];
  const [jsonFields, setJsonFields] = useState<any>(jsonFieldsDefaultValues);

  useEffect(() => {
    const initialize = () => {
      fetchData(pageSize, pageNumber);
    };
    initialize();
    ;
  }, []);

  const fetchData = async (pageSize: number, pageNumber: number) => {
    try {
      const object  = {
        pageSize: pageSize,
        pageNumber: pageNumber
      }
      const response = await BrandService.GetList(object);
      if (response.success) {
        setBrands(response.result);
      }
      console.log(brands)
    } catch (error) {
      console.error('Erro ao buscar marcas:', error);
    }
  };

  const handleAddBrand = async (newBrandData: any) => {
    try {
      const response = await BrandService.Insert(newBrandData);
      if (response.success) {
        ToastService.success("Adicionado com sucesso.");
      }
    } catch (error) {
    }
    fetchData(pageSize, pageNumber);
  };

  const handleSaveBrand = async (newBrandData: any) => {
    try {
      const response = await BrandService.Update(newBrandData);
      if (response.success) {
        ToastService.success("Editado com sucesso.");
        setEditbrand(0);
      }
    } catch (error) {
    }
    setJsonFields(jsonFieldsDefaultValues);
    fetchData(pageSize, pageNumber);
  };

  const handleBrand = async (newBrandData: any, isEditing: boolean) => {
    if (newBrandData == null) {
      setShowModal(false);
      return
    }
    isEditing ? handleSaveBrand(newBrandData) : handleAddBrand(newBrandData);
    setShowModal(false);
  };

  const handlePageChange = (newPage: number) => {
    fetchData(pageSize, newPage);
    setPageNumber(newPage);
  };

  const handleEditBrand = async (id: number) => {
    try {
      const response = await BrandService.Get(id);
      if(response.success){
        setJsonFields([
          { label: 'id', name: 'id', type: 'null', value: id },
          { label: 'Nome da Marca', name: 'brandName', type: 'text', value: response.result.brandName },
          { label: 'Nacional', name: 'isNational', type: 'checkbox', value: response.result.isNational },
          { label: 'Status Ativo', name: 'status', type: 'checkbox', value: response.result.status },
        ])
      }
      setEditbrand(id);
      setShowModal(true);
    } catch (error) {
      console.error('Erro ao buscar detalhes da marca:', error);
    }
  };

  const columns = [
    { text: 'Nome da Marca', key: 'brandName' },
    {
      text: 'Nacional',
      key: 'isNational',
      cell: (brand: any) => (brand.isNational ? 'Sim' : 'Não'),
    },
    {
      text: 'Status Ativo',
      key: 'isActive',
      cell: (brand: any) => (brand.status ? 'Ativo' : 'Desativado'),
    },
    {
      key: 'action',
      cell: (brand: any) => (
        <Button
          variant="primary"
          onClick={() => handleEditBrand(brand.id)}
        >
          <FaEdit /> Editar
        </Button>
      ),
    },
  ];

  return (
    <Container>
       <Row className="align-items-center">
        <Col xs={8}>
          <h1>Dados Mestres</h1>
        </Col>
        <Col xs={4} className="text-end">
          <FaStickyNote size={24} />
        </Col>
      </Row>
      <Row className="mb-3">
        <Col>
          <Button variant="primary" onClick={() => setShowModal(true)}>
            <FaPlus /> Nova Marca
          </Button>
        </Col>
      </Row>

      <PaginatedTable
        data={brands}
        columns={columns}
        pageSize={pageSize}
        onChangePage={handlePageChange} 
        pageNumber={pageNumber}      
        />

      <RegisterModal
        show={showModal}
        onHide={handleBrand}
        fields={jsonFields}
        isEditing={editbrand !== 0}
        title="Marca"
      />
    </Container>
  );
};

export default Home;
