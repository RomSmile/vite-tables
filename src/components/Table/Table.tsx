import React, { FC, useMemo, useState } from "react";
import { ITableItem, ITableProps } from "./types.ts";

const Table: FC<ITableProps> = ({ outputData, navigate }) => {
  const { headers, items } = outputData;
  const [activePage, setActivePage] = useState<number>(1);
  const [sortBy, setSortBy] = useState<string>('none');
  const [searchType, setSearchType] = useState<string>('none');
  const [searchFilter, setSearchFilter] = useState<string>('');

  const activeArrayItems: ITableItem[] = useMemo(() => {
    let newItems = [ ...items ];
    if (sortBy !== 'none') {
      newItems = [ ...items ].sort((a, b) => a[sortBy].localeCompare(b[sortBy]))
    }

    if (searchType !== 'none' && searchFilter) {
      newItems = [ ...newItems ].filter((item) => item[searchType].toLowerCase().includes(searchFilter.toLowerCase()))
    }

    return items.length > 10
      ? [ ...newItems ].splice(activePage === 1 ? activePage - 1 : activePage * 10 - 10, 10)
      : [ ...newItems ];
  }, [activePage, sortBy, searchFilter]);

  const nextPage = () => {
    setActivePage(activePage + 1)
  }

  const previousPage = () => {
    setActivePage(activePage - 1);
  }

  const onChangeSortType = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortBy(e.target.value);
  }

  const onChangeSearchType = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSearchType(e.target.value);
  }

  const onChangeFilter = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchFilter(e.target.value);
  }

  return (
    <>
      <div style={{ width: "320px", marginBottom: "10px" }}>
        <label style={{
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "center",
          gap: "15px",
        }}>
          <p style={{ margin: 0 }}>Sort by:</p>
          <select className="form-select w-75" aria-label="Default select example" onChange={onChangeSortType}>
            <option value="none" selected>Choose sort type</option>
            {headers.map((header) => (
              <option value={header} key={header}>{header}</option>
            ))}
          </select>
        </label>
      </div>
      <div style={{ width: "440px", marginBottom: "10px"  }}>
        <label style={{
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "center",
          gap: "10px",
        }}>
          <p style={{ margin: 0 }}>Search by:</p>
          <select className="form-select w-75" aria-label="Default select example" onChange={onChangeSearchType}>
            <option value="none" selected>Choose sort type</option>
            {headers.map((header) => (
              <option value={header} key={header}>{header}</option>
            ))}
          </select>
        </label>
      </div>
      <div style={{ marginBottom: "10px" }}>
        <input
          type="text"
          className="input-group-text"
          placeholder="Enter the filter value"
          onChange={onChangeFilter}
        />
      </div>
      <table className="table table-dark table-hover mb-0">
        <thead>
        <tr>
          {headers.map((header, index) => (
            <th scope="col" key={index}>{header}</th>
          ))}
        </tr>
        </thead>
        <tbody>
        {activeArrayItems.map((item, index) => {
          return <tr key={index} onClick={() => {
            navigate(item[headers[0]])
          }}>
            {headers.map((header, index) => (
              <td key={`${header}-${index}`}>{item[header]}</td>
            ))}
          </tr>;
        })}
        </tbody>
      </table>
      {items.length > 10 && (
        <ul className="pagination bg-dark mt-1">
          <li className="page-item disabled">
            <button className={`btn btn-primary me-1 ${activePage === 1 && "disabled"}`} type="submit" onClick={previousPage}>Previous</button>
          </li>
          <li className="page-item active" aria-current="page">
            <a className="page-link" href="#">{activePage}</a>
          </li>
          <li className="page-item">
            <button className={`btn btn-primary ms-1 ${activePage * 10 >= items.length && "disabled"}`} type="submit" onClick={nextPage}>Next</button>
          </li>
        </ul>
      )}
    </>
  )
}

export default Table;
