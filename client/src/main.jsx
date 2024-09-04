import { StrictMode } from "react";
import ReactDom from "react-dom/client"
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Toaster } from 'react-hot-toast'
import App from "./App";
import './index.css'
import NotFound from "./pages/Not-found";
import MembersLogin from "./pages/auth/Members-login";
import ClientLogin from "./pages/auth/Client-login";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>
  },
  {
    path: "/members-login",
    element: <MembersLogin/>
  },
  {
    path: "/authentification",
    element: <ClientLogin/>
  },
  {
    path: "*",
    element: <NotFound/>
  }
])

ReactDom.createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router}/>
    <Toaster/>
  </StrictMode>
)

