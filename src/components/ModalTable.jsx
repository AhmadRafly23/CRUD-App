import { Button, Modal } from 'react-bootstrap';
import { useFetch } from '../utils/useFetch';
import Skeleton from 'react-loading-skeleton';

export function ModalTable(props) {
  const { data, isLoading } = useFetch(
    props.show ? `/viewedit/?id_prov=${props.id}` : null
  );

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Detail Tabel
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>
          Berikut ini adalah detail dari data tabel yang dipilih. Anda dapat
          mengedit dan menghapus data tersebut dengan memilih tombol yang ada
          pada menu action.
        </p>
        {isLoading && <Skeleton count={2} />}
        {data?.data?.map((item) => (
          <div key={item.id}>
            <p>ID Provinsi : {item.id}</p>
            <p>Nama Provinsi : {item.name}</p>
          </div>
        ))}
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}
