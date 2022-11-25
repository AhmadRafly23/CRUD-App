import { useMemo, useState } from 'react';
import { Spinner } from 'react-bootstrap';
import DataTable from 'react-data-table-component';
import { AiOutlineDelete, AiOutlineArrowDown } from 'react-icons/ai';
import { FiEdit2 } from 'react-icons/fi';
import { HiOutlineEye } from 'react-icons/hi';
import { mutate } from 'swr';
import { Alert } from '../components/Alert';
import { FilterComponent } from '../components/FilterComponent';
import { Layout } from '../components/Layout';
import { ModalTable } from '../components/ModalTable';
import { customSort } from '../utils/customSort';
import { useFetch } from '../utils/useFetch';
import axios from '../lib/axios';
import { Link } from 'react-router-dom';

export function Home() {
  const { data, isLoading } = useFetch('/list');

  const [filterText, setFilterText] = useState('');
  const [resetPaginationToggle, setResetPaginationToggle] = useState(false);
  const filteredItems = data?.data?.filter(
    (item) =>
      item.name && item.name.toLowerCase().includes(filterText.toLowerCase())
  );
  const [show, setShow] = useState(false);
  const [id, setId] = useState('');

  const columns = [
    {
      id: 1,
      name: 'ID Provinsi',
      selector: (row) => row.id,
      center: true,
    },
    {
      id: 2,
      name: 'Name Provinsi',
      selector: (row) => row.name,
      center: true,
      sortable: true,
      reorder: true,
    },
    {
      id: 3,
      name: 'Action',
      cell: (row) => (
        <div className="d-flex">
          <button
            className="btn btn-primary d-flex align-items-center me-3 p-2"
            onClick={() => {
              setShow(true);
              setId(row.id);
            }}
          >
            <HiOutlineEye />
          </button>
          <Link to={'/edit-data/' + row.id}>
            <button className="btn btn-warning text-light d-flex align-items-center me-3 p-2">
              <FiEdit2 />
            </button>
          </Link>
          <button
            className="btn btn-danger d-flex align-items-center p-2"
            onClick={() => deleteData(row.id)}
          >
            <AiOutlineDelete />
          </button>
        </div>
      ),
      center: true,
    },
  ];

  const subHeaderComponentMemo = useMemo(() => {
    const handleClear = () => {
      if (filterText) {
        setResetPaginationToggle(!resetPaginationToggle);
        setFilterText('');
      }
    };

    return (
      <FilterComponent
        onFilter={(e) => setFilterText(e.target.value)}
        onClear={handleClear}
        filterText={filterText}
      />
    );
  }, [filterText, resetPaginationToggle]);

  function deleteData(id) {
    axios
      .post('/delete', { id_prov: id })
      .then(() => {
        Alert('Good Job', 'Data has been deleted', 'success');
        mutate('/list');
      })
      .catch(() => {
        Alert('Oops!', 'Something went wrong', 'error');
      });
  }

  console.log(process.env.REACT_APP_API_URL);

  return (
    <Layout title="Data Table">
      <ModalTable show={show} id={id} onHide={() => setShow(false)} />
      {isLoading ? (
        <div className="text-center">
          <Spinner animation="border" />
        </div>
      ) : (
        <DataTable
          columns={columns}
          data={filteredItems}
          defaultSortFieldId={2}
          sortIcon={<AiOutlineArrowDown />}
          pagination
          striped
          sortFunction={customSort}
          paginationResetDefaultPage={resetPaginationToggle}
          subHeader
          subHeaderComponent={subHeaderComponentMemo}
          persistTableHead
        />
      )}
    </Layout>
  );
}
