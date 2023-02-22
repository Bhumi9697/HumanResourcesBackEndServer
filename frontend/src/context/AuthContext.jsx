import { createContext, useContext, useEffect, useState } from 'react'
import { Auth, Hub } from 'aws-amplify'


const UserContext = createContext(null)
export const AuthContext = ({ children }) => {
  const [user, setUser] = useState(null)

  const checkUser = async () => {
    try {
      const amplifyUser = await Auth.currentAuthenticatedUser()
      if (!amplifyUser) return
      setUser(amplifyUser)
    } catch (err) {
      setUser(null)
    }
  }

  useEffect(() => checkUser(), [])
  useEffect(() => Hub.listen('auth', () => checkUser()), [])
  return <UserContext.Provider value={{ user, setUser }}>{children}</UserContext.Provider>
}

export const useUser = () => useContext(UserContext)
