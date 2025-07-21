import { loginAuth } from "@/redux/slice/auth";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import type { RootState, AppDispatch } from "@/redux";
import { useNavigate } from "react-router";

export const LoginPage = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { user, isLoading, error } = useSelector((state: RootState) => state.auth);
    const [nim, setNim] = useState("")
    const navigate = useNavigate();
    
    const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (!nim){
            alert("NIM harus diisi")
            return;
        }
        dispatch(loginAuth(nim))
    }

    useEffect(()=>{
        if (user) {
            navigate('/');
        }
    },[user])
    
    return (
        <div>
            <h1>Login Page</h1>
            <form onSubmit={handleLogin}>
                <input 
                    type="text" 
                    value={nim} 
                    onChange={(e) => setNim(e.target.value)} 
                    placeholder="Masukkan NIM"
                />
                <button type="submit">Login</button>
            </form>
            {isLoading && <p>Loading...</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
    )
}