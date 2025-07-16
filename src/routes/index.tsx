import { createBrowserRouter } from "react-router";
import { HomePage } from "../features/home";
import { ProfilePage } from "../features/profile";
import { ContactPage } from "../features/contact";
import { RootLayout } from "@/layouts/root";
import { DocumentationPage } from "@/features/documentation";

export const AppRouter = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />, // ini jadi layout utama
    children: [
      {
        index: true, // sama dengan path: "/"
        element: <HomePage />,
      },
      {
        path: "profile", // otomatis menjadi "/profile"
        element: <ProfilePage />,
      },
      {
        path: "contact", // otomatis menjadi "/contact"
        element: <ContactPage />,
      },
      {
        path: "documentation", // otomatis menjadi "/contact"
        element: <DocumentationPage />,
      },
    ],
  },
]);