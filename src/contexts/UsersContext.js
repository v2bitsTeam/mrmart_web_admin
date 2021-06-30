import React, { useState, useContext, createContext } from "react";

const UsersContext = createContext();
const UpdateUsersContext = createContext();

export function useUsers() {
  return useContext(UsersContext);
}

export function useUsersUpdate() {
  return useContext(UpdateUsersContext);
}

export const UsersProvider = ({ children }) => {
  const [users, setUsers] = useState(null);

  function updateUsers(users) {
    setUsers(users);
  }

  return (
    <UsersContext.Provider value={users}>
      <UpdateUsersContext.Provider value={updateUsers}>
        {children}
      </UpdateUsersContext.Provider>
    </UsersContext.Provider>
  );
};
