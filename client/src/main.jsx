import { StrictMode } from "react";
import ReactDom from "react-dom/client"
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Toaster } from 'react-hot-toast'
import {QueryClient, QueryClientProvider} from 'react-query'
import './index.css'
import App from "./App";
import NotFound from "./pages/Not-found";
import MembersLogin from "./pages/auth/Members-login";
import ClientLogin from "./pages/auth/Client-login";
import { TokenContextProvider } from "./contexts/token.context";
import ProtectedRoute from "./components/Protected-route";

const queryClient = new QueryClient()

const router = createBrowserRouter([
  {
    path: "/",
    element: <TokenContextProvider><ProtectedRoute><App/></ProtectedRoute></TokenContextProvider>
  },
  {
    path: "/members-login",
    element: <TokenContextProvider><MembersLogin/></TokenContextProvider>
  },
  {
    path: "/authentification",
    element: <TokenContextProvider><ClientLogin/></TokenContextProvider>
  },
  {
    path: "/inscription"
  },
  {
    path: "*",
    element: <NotFound/>
  }
])

ReactDom.createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router}/>
    <QueryClientProvider client={queryClient}/>
    <Toaster/>
  </StrictMode>
)

