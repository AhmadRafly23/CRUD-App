import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Alert } from '../components/Alert';
import { FormLayout } from '../components/FormLayout';
import { Layout } from '../components/Layout';
import axios from '../lib/axios';

export function DataAdd() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [id, setId] = useState('');
  const [name, setName] = useState('');

  function handleSubmit(e) {
    e.preventDefault();

    setLoading(true);

    axios
      .post('/add', { id, name })
      .then(() => {
        setLoading(false);
        Alert('Good Job', 'Data has been added', 'success');
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
    <Layout title="Add Data Table">
      <div>
        <FormLayout
          id={id}
          setId={setId}
          name={name}
          setName={setName}
          loading={loading}
          typeButton="Submit"
          handleForm={handleSubmit}
        />
      </div>
    </Layout>
  );
}
