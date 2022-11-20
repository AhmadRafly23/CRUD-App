import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import 'react-loading-skeleton/dist/skeleton.css';
import { Container } from 'react-bootstrap';
import { Route, Routes } from 'react-router-dom';
import { DataTable } from './pages/DataTable';
import { Error } from './components/Error';
import { DataAdd } from './pages/DataAdd';
import { DataEdit } from './pages/DataEdit';

function App() {
  return (
    <Container>
      <Routes>
        <Route path="/" element={<DataTable />} />
        <Route path="/add-data" element={<DataAdd />} />
        <Route path="edit-data/:id" element={<DataEdit />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </Container>
  );
}

export default App;
