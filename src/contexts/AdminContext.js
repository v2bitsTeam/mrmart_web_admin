import React, { useState, useContext, createContext, useMemo } from "react";

const AdminContext = createContext();
const UpdateAdminContext = createContext();

export function useAdmin() {
  return useContext(AdminContext);
}

export function useAdminUpdate() {
  return useContext(UpdateAdminContext);
}

export const AdminProvider = ({ children }) => {
  const [admin, setAdmin] = useState(null);
  const adminValue = useMemo(() => ({ admin }), [admin]);

  function updateAdminLoginStatus(admin) {
    setAdmin(admin);
  }

  return (
    <AdminContext.Provider value={adminValue}>
      <UpdateAdminContext.Provider value={updateAdminLoginStatus}>
        {children}
      </UpdateAdminContext.Provider>
    </AdminContext.Provider>
  );
};
