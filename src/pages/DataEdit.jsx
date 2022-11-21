import { useEffect, useState } from 'react';
import { Spinner } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import { FormLayout } from '../components/FormLayout';
import { Layout } from '../components/Layout';
import { useFetch } from '../utils/useFetch';
import axios from '../lib/axios';
import { Alert } from '../components/Alert';

export function DataEdit() {
  const navigate = useNavigate();
  const params = useParams();

  const { data, isLoading } = useFetch(`/viewedit/?id_prov=${params.id}`);

  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (data) {
      setId(data.data[0].id);
      setName(data.data[0].name);
    }
  }, [data]);

  function handleEdit(e) {
    e.preventDefault();

    setLoading(true);

    axios
      .post(`/update/?id_prov=${id}`, { name })
      .then(() => {
        setLoading(false);
        Alert('Good Job', 'Data has been edited', 'success');
        setId('');
        setName('');
        setTimeout(() => navigate('/'), 3000);
      })
      .catch((error) => {
        setLoading(false);
        Alert('Oops!', error.response.data.errors, 'error');
      });
  }

  return (
    <Layout title="Edit Data Table">
      {isLoading ? (
        <div className="text-center">
          <Spinner animation="border" />
        </div>
      ) : (
        <div>
          <FormLayout
            id={id}
            setId={setId}
            name={name}
            setName={setName}
            loading={loading}
            typeButton="Edit"
            handleForm={handleEdit}
          />
        </div>
      )}
    </Layout>
  );
}
