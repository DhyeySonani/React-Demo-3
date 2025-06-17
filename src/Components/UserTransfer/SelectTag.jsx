export const SelectTag = ({
  Arr,
  setArr,
  pos,
  userInfo
}) => {
  return (
    <select
      multiple
      style={{ width: "25%" }}
      value={Arr}
      onChange={(e) =>
        setArr(Array.from(e.target.selectedOptions, (o) => Number(o.value)))
      }
    >
      {userInfo
        .filter((curElem) => curElem.pos === pos)
        .map((curElem) => (
          <option key={curElem.id} value={curElem.id}>
            {curElem.username}
          </option>
        ))}
    </select>
  );
};
