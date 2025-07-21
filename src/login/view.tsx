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
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-md w-96">
                <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">Login Page</h1>
                <form onSubmit={handleLogin} className="space-y-4">
                    <input 
                        type="text" 
                        value={nim} 
                        onChange={(e) => setNim(e.target.value)} 
                        placeholder="Masukkan NIM"
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button 
                        type="submit"
                        className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-200 ease-in-out"
                    >
                        Login
                    </button>
                </form>
                {isLoading && <p className="text-center mt-4 text-gray-600">Loading...</p>}
                {error && <p className="text-center mt-4 text-red-500">{error}</p>}
            </div>
        </div>
    )
}