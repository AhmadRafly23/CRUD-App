import { Button, Stack } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';
import { AiOutlineArrowLeft } from 'react-icons/ai';

export function Layout({ title, children }) {
  const location = useLocation();

  return (
    <Stack direction="vertikal" gap={4}>
      <div className="py-4 border-bottom d-flex justify-content-between align-items-center">
        <h1>{title}</h1>
        {location.pathname === '/' ? (
          <Link to="/add-data">
            <Button className="py-2">Add New Data</Button>
          </Link>
        ) : (
          <div className="backHome">
            <Link className="text-decoration-none" to="/">
              <AiOutlineArrowLeft />
              <span className="ms-2">Go Home</span>
            </Link>
          </div>
        )}
      </div>
      {children}
    </Stack>
  );
}
