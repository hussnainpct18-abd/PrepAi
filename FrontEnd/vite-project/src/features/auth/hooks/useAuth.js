import { useContext,useEffect } from "react"
import { AuthContext } from "../services/auth.context"
import { login, logout, register } from "../api/auth.api";
import { getMe } from "../api/auth.api";


export const useAuth = () => {

    const context = useContext(AuthContext)

    const { user, setUser, loading, setLoading } = context;

    const handleLogin = async ({ username, email, password }) => {

        setLoading(true);
        try {
            const data = await login({ username, email, password })

            console.log(data)
            setUser(data.user)
        } catch (err) {
            console.log(err)
        } finally {
            setLoading(false)
        }

    }

    const handleRegister = async ({ username, email, password }) => {

        setLoading(true);
        try {
            const data = await register({ username, email, password })
            setUser(data.user)
        } catch (err) {
            console.log(err)
        } finally {
            setLoading(false)
        }

    }

    const handleLogout = async () => {

        setLoading(true);
        try {
            const msg = await logout()
            setUser(null)
        } catch (err) {
            console.log(err)
        } finally {
            setLoading(false)

        }

    }

    useEffect(() => {
        const getUserandSet = async () => {
            const data = await getMe();
            setUser(data.user)
            setLoading(false)
        }
        getUserandSet();

    }, [])


    return { user, loading, handleLogin, handleRegister, handleLogout }
}
