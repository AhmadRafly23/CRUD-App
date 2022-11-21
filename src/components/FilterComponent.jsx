import { FiX } from 'react-icons/fi';

export function FilterComponent({ onFilter, onClear, filterText }) {
  return (
    <div className="input-group w-auto">
      <div className="form-outline">
        <input
          type="search"
          id="form1"
          className="border border-secondary h-100 py-1 px-2"
          onChange={onFilter}
          value={filterText}
        />
      </div>
      <button
        type="button"
        className="btn btn-primary d-flex align-items-center"
        onClick={onClear}
      >
        <FiX />
      </button>
    </div>
  );
}
