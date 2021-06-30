import React, { useState, useContext, createContext } from "react";

const UserProfileContext = createContext();
const UpdateUserProfileContext = createContext();

export function useUserProfile() {
  return useContext(UserProfileContext);
}

export function useUserProfileUpdate() {
  return useContext(UpdateUserProfileContext);
}

export const UserProfileProvider = ({ children }) => {
  const [userProfile, setUserProfile] = useState(null);

  function updateUserProfile(userProfile) {
    setUserProfile(userProfile);
  }

  return (
    <UserProfileContext.Provider value={userProfile}>
      <UpdateUserProfileContext.Provider value={updateUserProfile}>
        {children}
      </UpdateUserProfileContext.Provider>
    </UserProfileContext.Provider>
  );
};
