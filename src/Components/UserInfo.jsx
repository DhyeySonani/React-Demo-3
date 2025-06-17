import { useState, useEffect } from "react";

let nextId = 1;

export const UserInfo = ({
  userInfo,
  setUserInfo,
  editingUser,
  setUpdateId,
}) => {
  const defaultUser = {
    username: "",
    fullname: "",
    city: "",
    age: 0,
    id: null,
  };

  const [user, setUser] = useState(defaultUser);

  useEffect(() => {
    if (editingUser) {
      setUser({
        id: editingUser.id,
        username: editingUser.username,
        fullname: editingUser.fullname,
        city: editingUser.city,
        age: editingUser.age,
      });
    } else {
      setUser(defaultUser);
    }
  }, [editingUser]);

  const isEditing = !!editingUser;

  const handleChange = (field) => (e) => {
    const value =
      field === "age" ? parseInt(e.target.value) || 0 : e.target.value;
    setUser((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { id, ...rest } = user;

    if (isEditing) {
      const updated = userInfo.map((curElem) =>
        curElem.id === editingUser.id ? { ...curElem, ...rest, editing: false } : curElem
      );
      setUserInfo(updated);
    } else {
      const newUser = { id: nextId++, ...rest, pos: "left" };
      setUserInfo([...userInfo, newUser]);
    }

    setUser(defaultUser);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Username"
        value={user.username}
        onChange={handleChange("username")}
        required
      />
      <input
        type="text"
        placeholder="Fullname"
        value={user.fullname}
        onChange={handleChange("fullname")}
        required
      />
      <input
        type="text"
        placeholder="City"
        value={user.city}
        onChange={handleChange("city")}
        required
      />
      <input
        type="number"
        placeholder="Age"
        value={user.age}
        onChange={handleChange("age")}
        required
      />
      <button type="submit">{isEditing ? "Update User" : "Add User"}</button>
    </form>
  );
};
