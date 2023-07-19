import { createContext, useState } from "react";

export const UserContext = createContext(null);

export const UserProvider = ({children}) => {
  const [itemId, setItemId] = useState(null)

  return (
    <UserContext.Provider value = {{itemId, setItemId}}>
      {children}
    </UserContext.Provider>
  )
}