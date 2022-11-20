import { Button, Form, Stack } from 'react-bootstrap';

export function FormLayout({
  id,
  setId,
  name,
  setName,
  loading,
  typeButton,
  handleForm,
}) {
  return (
    <Form onSubmit={handleForm}>
      <Stack gap={4}>
        <Form.Group controlId="idProvinsi">
          <Form.Label>ID Provinsi</Form.Label>
          <Form.Control
            type="number"
            placeholder="Masukkan ID Provinsi"
            value={id || ''}
            onChange={(e) => setId(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group controlId="namaProvinsi">
          <Form.Label>Nama Provinsi</Form.Label>
          <Form.Control
            type="text"
            placeholder="Masukkan Nama Provinsi"
            value={name || ''}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </Form.Group>
      </Stack>
      <Button type="submit" className="mt-4" disabled={loading}>
        {loading ? 'Loading...' : typeButton}
      </Button>
    </Form>
  );
}
