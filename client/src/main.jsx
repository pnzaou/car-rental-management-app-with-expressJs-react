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
import MemberDashboard from "./pages/dashboards/members-dashbord/Member-dashboard";
import MemberDashboardHome from "./pages/dashboards/members-dashbord/Member-dashboard-home";
import ListeCategorie from "./pages/dashboards/members-dashbord/Liste-categorie";
import AjoutCategorie from "./pages/dashboards/members-dashbord/Ajout-categorie";
import EditCategorie from "./pages/dashboards/members-dashbord/Edit-categorie";

const queryClient = new QueryClient()

const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>
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
    path: "/members-dashboard",
    element: <TokenContextProvider><ProtectedRoute><MemberDashboard/></ProtectedRoute></TokenContextProvider>,
    children: [
      {
        path: "",
        element: <MemberDashboardHome/>
      },
      {
        path: "categories",
        element: <ListeCategorie/>
      },
      {
        path: "categories/ajout",
        element: <AjoutCategorie/>
      },
      {
        path: "categories/modification/:id",
        element: <EditCategorie/>
      }
    ]
  },
  {
    path: "*",
    element: <NotFound/>
  }
])

ReactDom.createRoot(document.getElementById("root")).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router}/>
    </QueryClientProvider>
    <Toaster/>
  </StrictMode>
)

