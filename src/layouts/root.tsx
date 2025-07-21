import { AppNavigation } from "@/components/navigation"
import type { RootState } from "@/redux";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";

export const RootLayout = () => {
    const user = useSelector((state:RootState)=> state.auth.user)
    const navigate = useNavigate();

    useEffect(() => {
        if (!user) {
            navigate('/login');
        }
    }, [user, navigate]);
    return (
        <>
            <AppNavigation/>
            <Outlet/>
        </>
    )
}