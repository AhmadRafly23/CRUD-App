import { FiEdit2 } from 'react-icons/fi';
import { AiOutlineDelete } from 'react-icons/ai';
import { Button, Spinner, Table } from 'react-bootstrap';
import { Layout } from '../components/Layout';
import { useFetch } from '../utils/useFetch';
import axios from '../lib/axios';
import { useState } from 'react';
import { ModalTable } from '../components/ModalTable';
import { Alert } from '../components/Alert';
import { mutate } from 'swr';
import { Link } from 'react-router-dom';

export function DataTable() {
  const { data, isLoading } = useFetch('/list');
  const [show, setShow] = useState(false);
  const [id, setId] = useState('');

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

  return (
    <Layout title={'Data Table'}>
      <ModalTable show={show} id={id} onHide={() => setShow(false)} />
      {isLoading ? (
        <div className="text-center">
          <Spinner animation="border" />
        </div>
      ) : (
        <div>
          <Table striped bordered className="text-center">
            <thead>
              <tr>
                <th className="col-1">No</th>
                <th className="col-5">Name</th>
                <th className="col-6">Action</th>
              </tr>
            </thead>
            <tbody>
              {data?.data?.map((item, index) => (
                <tr key={item.id}>
                  <td className="align-middle">{index + 1}</td>
                  <td
                    className="data-name align-middle"
                    onClick={() => {
                      setShow(true);
                      setId(item.id);
                    }}
                  >
                    {item.name}
                  </td>
                  <td className="d-flex justify-content-center">
                    <Link to={'/edit-data/' + item.id}>
                      <Button className="d-flex align-items-center me-3 p-2">
                        <FiEdit2 />
                      </Button>
                    </Link>
                    <Button
                      className="bg-danger border-danger d-flex align-items-center me-3 p-2"
                      onClick={() => deleteData(item.id)}
                    >
                      <AiOutlineDelete />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      )}
    </Layout>
  );
}
