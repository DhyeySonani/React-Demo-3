import React, { useState } from "react";
import { FaArrowUp, FaArrowDown } from "react-icons/fa";

export const Table = ({
  isFilter,
  userInfo,
  setUserInfo,
  selected,
  uniqueSelected,
  setUpdateId
}) => {
  const [sort, setSort] = useState({ field: "", direction: "" });

  let data = userInfo.filter((curElem) => curElem.pos === "right");

  if (isFilter === "filter" && selected && uniqueSelected) {
    data = data.filter((curElem) => {
      if (selected === "age") {
        return curElem[selected] === Number(uniqueSelected);
      }
      return curElem[selected] === uniqueSelected;
    });
  }

  if (sort.field) {
    data = [...data].sort((a, b) => {
      if (a[sort.field] < b[sort.field]) return sort.direction === "asc" ? -1 : 1;
      if (a[sort.field] > b[sort.field]) return sort.direction === "asc" ? 1 : -1;
      return 0;
    });
  }

  const handleSort = (field) => {
    setSort((prev) => ({
      field,
      direction: prev.field === field && prev.direction === "asc" ? "desc" : "asc",
    }));
  };

  const renderSortArrows = (field) => {
    if (sort.field === field) {
      return sort.direction === "asc" ? (
        <FaArrowUp
          style={{ fontSize: "0.5rem", cursor: "pointer" }}
          onClick={() => handleSort(field)}
        />
      ) : (
        <FaArrowDown
          style={{ fontSize: "0.5rem", cursor: "pointer" }}
          onClick={() => handleSort(field)}
        />
      );
    }
    return (
      <>
        <FaArrowUp
          style={{ fontSize: "0.5rem", cursor: "pointer", marginRight: 3 }}
          onClick={() => handleSort(field)}
        />
        <FaArrowDown
          style={{ fontSize: "0.5rem", cursor: "pointer" }}
          onClick={() => handleSort(field)}
        />
      </>
    );
  };

  const handelEditDelete = (ops, ID) => {
    if (ops === 'Edit') setUpdateId(ID)
    else {
      setUserInfo(userInfo.filter((curElem) => curElem.id !== ID))
    }
  }

  return (
    <div>
      <h3>User Details</h3>
      <table>
        <thead>
          <tr>
            <th>
              Username {renderSortArrows("username")}
            </th>
            <th>
              Fullname {renderSortArrows("fullname")}
            </th>
            <th>
              City {renderSortArrows("city")}
            </th>
            <th>
              Age {renderSortArrows("age")}
            </th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((user) => (
            <tr key={user.id}>
              <td>{user.username}</td>
              <td>{user.fullname}</td>
              <td>{user.city}</td>
              <td>{user.age}</td>
              <td>
                <button onClick={() => handelEditDelete('Edit', user.id)}>Edit</button>
                <button onClick={() => handelEditDelete('Delete', user.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
