import React, { useState, useEffect } from 'react';
import { Button, Table } from 'react-bootstrap';
import { FaEdit } from 'react-icons/fa';

interface PaginatedTableProps {
  data: any[];
  columns: any[];
  pageSize: number;
  pageNumber: number; // Adicionada propriedade pageNumber
  onChangePage: (newPage: number) => void;
}

const PaginatedTable: React.FC<PaginatedTableProps> = ({ data, columns, pageSize, pageNumber, onChangePage }) => {
  const [pageData, setPageData] = useState<any[]>([]);

  useEffect(() => {
    const startIndex = (pageNumber - 1) * pageSize;
    setPageData(data);
  }, [data, pageNumber, pageSize]);

  const handlePageChange = (newPage: number) => {
    onChangePage(newPage);
  };

  return (
    <div>
      <Table striped bordered>
        <thead>
          <tr>
            {columns.map((column) => (
              <th key={column.key}>{column.text}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {pageData.map((item, index) => (
            <tr key={index}>
              {columns.map((column) => (
                <td key={column.key}>
                  {column.cell ? column.cell(item) : item[column.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </Table>

      <div className="pagination">
        <Button
          onClick={() => handlePageChange(pageNumber - 1)}
          disabled={pageNumber === 1}
        >
          Anterior
        </Button>
        <Button
          onClick={() => handlePageChange(pageNumber + 1)}
          disabled={pageData.length < pageSize}
        >
          Próxima
        </Button>
      </div>
    </div>
  );
};

export default PaginatedTable;
