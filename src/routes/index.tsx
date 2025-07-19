import { createBrowserRouter } from "react-router";
import { HomePage } from "../features/home";
import { ProfilePage } from "../features/profile";
import { ContactPage } from "../features/contact";
import { RootLayout } from "@/layouts/root";
import { DocumentationPage } from "@/features/documentation";
import { UserPage } from "@/features/user";
import { OwnerPage } from "@/features/owner";
import { StudentPage } from "@/features/students";
import { TrainerPage } from "@/features/trainer/view";

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
      {
        path: "/users", // otomatis menjadi "/contact"
        element: <UserPage />,
      },
      {
        path: "/owners", // otomatis menjadi "/contact"
        element: <OwnerPage />,
      },
      {
        path: "/trainers", // otomatis menjadi "/contact"
        element: <TrainerPage />,
      },
      {
        path: "/students",
        element: <StudentPage/>
      }
    ],
  },
]);