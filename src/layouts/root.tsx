import { AppNavigation } from "@/components/navigation"
import { Outlet } from "react-router-dom";

export const RootLayout = () => {
    return (
        <>
            <AppNavigation/>
            <Outlet/>
        </>
    )
}