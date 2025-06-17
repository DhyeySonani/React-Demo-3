import { useState } from "react";
import Table from "./Table";

export const Filter = ({
  userInfo,
  setUserInfo,
  selected,
  setSlected,
  setUpdateId
}) => {
  const [uniqueSelected, setUniqueSelected] = useState("");
  const [isFilter, setIsFilter] = useState("all");
  const [tempFilter, setTempFilter] = useState({ field: "", value: "" });

  const handleFieldChange = (e) => {
    setTempFilter({ field: e.target.value, value: "" });
  };

  const handleValueChange = (e) => {
    setTempFilter((prev) => ({ ...prev, value: e.target.value }));
  };

  const handleFilterClick = () => {
    if (!tempFilter.field || !tempFilter.value) {
      alert("Select field and value");
      return;
    }
    setSlected(tempFilter.field);
    setUniqueSelected(tempFilter.value);
    setIsFilter("filter");
  };

  const handleAllClick = () => {
    setSlected("");
    setUniqueSelected("");
    setTempFilter({ field: "", value: "" });
    setIsFilter("all");
  };

  const uniqueFilter = [...new Set(
    userInfo
      .filter((curElem) => curElem.pos === "right")
      .map((curElem) => curElem[tempFilter.field])
      .filter((curElem) => curElem !== undefined && curElem !== null && curElem !== "")
  )];

  return (
    <>
      <select value={tempFilter.field} onChange={handleFieldChange}>
        <option value="">Select Field</option>
        <option value="username">Username</option>
        <option value="fullname">Fullname</option>
        <option value="city">City</option>
        <option value="age">Age</option>
      </select>

      <select value={tempFilter.value} onChange={handleValueChange}>
        <option value="">Unique Field</option>
        {uniqueFilter.map((curElem) => (
          <option key={curElem} value={curElem}>
            {curElem}
          </option>
        ))}
      </select>

      <button onClick={handleFilterClick}>Filter</button>
      <button onClick={handleAllClick}>All</button>

      <Table
        isFilter={isFilter}
        userInfo={userInfo}
        setUserInfo={setUserInfo}
        selected={selected}
        uniqueSelected={uniqueSelected}
        setUpdateId={setUpdateId}
      />
    </>
  );
};
