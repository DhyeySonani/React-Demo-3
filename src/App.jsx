import { useState } from "react";
import { UserInfo } from "./Components/UserInfo";
import { Filter } from "./Components/Filter";
import { UserTransfer } from "./Components/UserTransfer/UserTransfer";

function App() {
  const [userInfo, setUserInfo] = useState([]);
  const [selected, setSlected] = useState('');
  const [updateId, setUpdateId] = useState();

  const editingUser = userInfo.find((curElem) => curElem.id === updateId && curElem.pos === 'right');

  const formData = editingUser || {
    username: "",
    fullname: "",
    city: "",
    age: 0,
  };
  return (
    <>
    <h1>User Info</h1>
      <UserInfo
        userInfo={userInfo}
        setUserInfo={setUserInfo}
        updateId={updateId}
        setUpdateId={setUpdateId}
        formData={formData}
        isEditing={!!editingUser}
      />

      <UserTransfer
        userInfo={userInfo}
        setUserInfo={setUserInfo}
        selected={selected}
        setSlected={setSlected}
        updateId={updateId}
        setUpdateId={setUpdateId}
      />

      <h2>Filter User Info</h2>
      <Filter
        userInfo={userInfo}
        setUserInfo={setUserInfo}
        selected={selected}
        setSlected={setSlected}
        setUpdateId={setUpdateId}
      />
    </>
  );
}

export default App;
