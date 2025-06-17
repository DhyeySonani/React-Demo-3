import { useState } from "react";
import { SelectTag } from "./SelectTag";

export const UserTransfer = ({
  userInfo,
  setUserInfo,
  selected,
  setSlected,
  setUpdateId,
}) => {
  const [Arr, setArr] = useState([]);

  const handleMove = (type) => {
    let updated = [...userInfo];
    let movedToRight = false;

    if (type === "Right" && Arr.length) {
      updated = updated.map((curElem) =>
        Arr.includes(curElem.id) ? { ...curElem, pos: "right" } : curElem
      );
      movedToRight = true;
    } else if (type === "Right All") {
      updated = updated.map((curElem) => ({ ...curElem, pos: "right" }));
      movedToRight = true;
    } else if (type === "Left" && Arr.length) {
      updated = updated.map((curElem) =>
        Arr.includes(curElem.id) ? { ...curElem, pos: "left", editing: false } : curElem
      );
    } else if (type === "Left All") {
      updated = updated.map((curElem) => ({ ...curElem, pos: "left", editing: false }));
    } else {
      return alert("Please select something");
    }

    setUserInfo(updated);
    if (movedToRight) setSlected("");
    setArr([]);
  };

  return (
    <div style={{ display: "flex" }}>
      <SelectTag Arr={Arr} setArr={setArr} pos="left" userInfo={userInfo} />
      <div style={{ display: "grid" }}>
        <button onClick={() => handleMove("Right")}>&gt;</button>
        <button onClick={() => handleMove("Right All")}>&gt;&gt;</button>
        <button onClick={() => handleMove("Left")}>&lt;</button>
        <button onClick={() => handleMove("Left All")}>&lt;&lt;</button>
      </div>
      <SelectTag Arr={Arr} setArr={setArr} pos="right" userInfo={userInfo} />
    </div>
  );
};
