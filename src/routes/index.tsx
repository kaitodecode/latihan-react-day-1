import { createBrowserRouter } from "react-router-dom";
import { HomePage } from "../features/home";
import { ProfilePage } from "../features/profile";
import { ContactPage } from "../features/contact";
import { RootLayout } from "@/layouts/root";
import { DocumentationPage } from "@/features/documentation";
import { UserPage } from "@/features/user";
import { OwnerPage } from "@/features/owner";
import { StudentPage } from "@/features/students";
import { TrainerPage } from "@/features/trainer/view";
import { LoginPage } from "@/login/view";
import { StudentReduxPage } from "@/features/students _redux";
import { TrainerReduxPage } from "@/features/trainer_redux/view";

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
        path: "users", // tanpa slash di depan
        element: <UserPage />,
      },
      {
        path: "owners", // tanpa slash di depan
        element: <OwnerPage />,
      },
      {
        path: "trainers", // tanpa slash di depan
        element: <TrainerReduxPage />,
      },
      {
        path: "students",
        element: <StudentReduxPage/>
      },
    ],
  },
  {
    path: "/login",
    element: <LoginPage />
  }
]);