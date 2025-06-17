import { useState, useEffect } from "react";
import { UserInfo } from "./Components/UserInfo";
import { Filter } from "./Components/Filter";
import { UserTransfer } from "./Components/UserTransfer/UserTransfer";

function App() {
  const [userInfo, setUserInfo] = useState([]);
  const [selected, setSlected] = useState("");

  const updateId = userInfo.find((curElem) => curElem.editing)?.id;
  const editingUser = userInfo.find(
    (curElem) => curElem.id === updateId && curElem.pos === "right"
  );

  useEffect(() => {
    // Optimization: Remove invalid editing state if user moved to left
    if (updateId && !editingUser) {
      setUserInfo((prev) =>
        prev.map((curElem) =>
          curElem.id === updateId ? { ...curElem, editing: false } : curElem
        )
      );
    }
  }, [updateId, editingUser, userInfo]);

  const handleSetUpdateId = (id) => {
    setUserInfo((prev) =>
      prev.map((curElem) => ({
        ...curElem,
        editing: curElem.id === id,
      }))
    );
  };

  return (
    <>
      <h1>User Info</h1>
      <UserInfo
        userInfo={userInfo}
        setUserInfo={setUserInfo}
        editingUser={editingUser}
        setUpdateId={handleSetUpdateId}
      />

      <UserTransfer
        userInfo={userInfo}
        setUserInfo={setUserInfo}
        selected={selected}
        setSlected={setSlected}
        setUpdateId={handleSetUpdateId}
      />

      <h2>Filter User Info</h2>
      <Filter
        userInfo={userInfo}
        setUserInfo={setUserInfo}
        selected={selected}
        setSlected={setSlected}
        setUpdateId={handleSetUpdateId}
      />
    </>
  );
}

export default App;
