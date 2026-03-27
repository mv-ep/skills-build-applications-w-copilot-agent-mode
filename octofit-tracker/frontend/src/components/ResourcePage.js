import React, { useEffect, useMemo, useState } from 'react';
import { getApiEndpoint, getApiFetchUrl } from '../api';

const RESOURCE_COLUMNS = {
  users: [
    { key: 'id', label: 'ID' },
    { key: 'email', label: 'Email' },
    { key: 'name', label: 'Name' },
    { key: 'team', label: 'Team' },
    { key: 'is_active', label: 'Active' },
  ],
};

function getItemId(item, fallbackIndex) {
  return item?.id || item?._id || `row-${fallbackIndex + 1}`;
}

function formatCellValue(value) {
  if (value === null || value === undefined || value === '') {
    return '-';
  }

  if (typeof value === 'boolean') {
    return value ? 'Yes' : 'No';
  }

  if (Array.isArray(value) || typeof value === 'object') {
    return JSON.stringify(value);
  }

  return String(value);
}

export default function ResourcePage({ resource, title, endpointTemplate = '' }) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [query, setQuery] = useState('');
  const [selectedItem, setSelectedItem] = useState(null);

  const endpoint = useMemo(() => getApiEndpoint(resource), [resource]);
  const fetchUrl = useMemo(() => getApiFetchUrl(resource), [resource]);

  async function loadData() {
    try {
      setError('');
      console.log(`[${title}] REST API endpoint:`, endpoint);
      if (endpointTemplate) {
        console.log(`[${title}] REST API endpoint template:`, endpointTemplate);
      }
      console.log(`[${title}] Fetch URL:`, fetchUrl);
      const response = await fetch(fetchUrl);

      if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`);
      }

      const data = await response.json();
      console.log(`[${title}] fetched data:`, data);

      const normalized = Array.isArray(data) ? data : data?.results || [];
      setItems(normalized);
    } catch (err) {
      setError(err.message || `Failed to load ${resource}.`);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    setLoading(true);
    loadData();
  }, [endpoint, fetchUrl]);

  const filteredItems = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    if (!normalizedQuery) {
      return items;
    }

    return items.filter((item) => JSON.stringify(item).toLowerCase().includes(normalizedQuery));
  }, [items, query]);

  const columns = useMemo(() => {
    if (RESOURCE_COLUMNS[resource]) {
      return RESOURCE_COLUMNS[resource];
    }

    const firstItem = filteredItems[0] || items[0];

    if (!firstItem || typeof firstItem !== 'object' || Array.isArray(firstItem)) {
      return [{ key: 'value', label: 'Value' }];
    }

    return Object.keys(firstItem)
      .slice(0, 6)
      .map((key) => ({
        key,
        label: key.replace(/_/g, ' ').replace(/\b\w/g, (char) => char.toUpperCase()),
      }));
  }, [filteredItems, items, resource]);

  const detailRows = useMemo(() => {
    if (!selectedItem || typeof selectedItem !== 'object' || Array.isArray(selectedItem)) {
      return [{ key: 'value', value: formatCellValue(selectedItem) }];
    }

    return Object.entries(selectedItem).map(([key, value]) => ({ key, value: formatCellValue(value) }));
  }, [selectedItem]);

  return (
    <section className="resource-page">
      <div className="card shadow-sm border-0">
        <div className="card-body p-4">
          <div className="d-flex flex-wrap justify-content-between align-items-start gap-3 mb-4">
            <div>
              <h2 className="h3 fw-bold text-primary mb-1">{title}</h2>
              <p className="text-muted mb-0">Unified Bootstrap table view powered by the REST API.</p>
            </div>
            <a className="btn btn-outline-primary" href={endpoint} target="_blank" rel="noreferrer">
              Open API Endpoint
            </a>
          </div>

          <form
            className="row g-2 align-items-end mb-3"
            onSubmit={(event) => {
              event.preventDefault();
            }}
          >
            <div className="col-12 col-md-8">
              <label htmlFor={`${resource}-search`} className="form-label fw-semibold">
                Filter Results
              </label>
              <input
                id={`${resource}-search`}
                type="text"
                className="form-control"
                placeholder={`Search ${title.toLowerCase()} data`}
                value={query}
                onChange={(event) => setQuery(event.target.value)}
              />
            </div>
            <div className="col-12 col-md-4 d-flex gap-2">
              <button type="button" className="btn btn-primary" onClick={loadData}>
                Refresh
              </button>
              <button type="button" className="btn btn-outline-secondary" onClick={() => setQuery('')}>
                Clear
              </button>
            </div>
          </form>

          {loading && (
            <div className="alert alert-info mb-0" role="status">
              Loading {title.toLowerCase()}...
            </div>
          )}

          {!loading && error && (
            <div className="alert alert-danger mb-0" role="alert">
              {error}
            </div>
          )}

          {!loading && !error && (
            <div className="table-responsive">
              <table className="table table-striped table-hover align-middle mb-0">
                <thead className="table-dark">
                  <tr>
                    <th scope="col">#</th>
                    {columns.map((column) => (
                      <th scope="col" key={column.key}>
                        {column.label}
                      </th>
                    ))}
                    <th scope="col" className="text-end">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredItems.map((item, index) => (
                    <tr key={getItemId(item, index)}>
                      <td>{index + 1}</td>
                      {columns.map((column) => (
                        <td key={column.key} className="text-break">
                          {column.key === 'value'
                            ? formatCellValue(item)
                            : formatCellValue(item?.[column.key])}
                        </td>
                      ))}
                      <td className="text-end">
                        <button
                          type="button"
                          className="btn btn-sm btn-outline-primary"
                          onClick={() => setSelectedItem(item)}
                        >
                          View
                        </button>
                      </td>
                    </tr>
                  ))}
                  {filteredItems.length === 0 && (
                    <tr>
                      <td colSpan={columns.length + 2} className="text-center text-muted py-4">
                        No {title.toLowerCase()} records available.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {selectedItem && (
        <>
          <div className="modal fade show d-block" tabIndex="-1" role="dialog" aria-modal="true">
            <div className="modal-dialog modal-lg modal-dialog-scrollable" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">{title} Details</h5>
                  <button
                    type="button"
                    className="btn-close"
                    aria-label="Close"
                    onClick={() => setSelectedItem(null)}
                  />
                </div>
                <div className="modal-body">
                  <div className="table-responsive">
                    <table className="table table-sm table-striped align-middle mb-0">
                      <thead className="table-light">
                        <tr>
                          <th scope="col">Field</th>
                          <th scope="col">Value</th>
                        </tr>
                      </thead>
                      <tbody>
                        {detailRows.map((row) => (
                          <tr key={row.key}>
                            <td className="fw-semibold text-capitalize text-nowrap">
                              {row.key.replace(/_/g, ' ')}
                            </td>
                            <td className="text-break">{row.value}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" onClick={() => setSelectedItem(null)}>
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="modal-backdrop fade show" />
        </>
      )}
    </section>
  );
}