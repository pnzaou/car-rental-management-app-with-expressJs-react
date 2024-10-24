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
import ListeMarque from "./pages/dashboards/members-dashbord/Liste-marque";
import DetailsMarques from "./pages/dashboards/members-dashbord/details-marques";
import AjoutMarque from "./pages/dashboards/members-dashbord/Ajout-marque";
import Settings from "./pages/dashboards/members-dashbord/Settings";
import AccountSettings from "./pages/dashboards/components/Account-settings";
import ListeDroit from "./pages/dashboards/members-dashbord/Liste-droit";
import ListeProfils from "./pages/dashboards/members-dashbord/Liste-profils";
import ListeUsers from "./pages/dashboards/members-dashbord/Liste-users";
import AjoutUser from "./pages/dashboards/members-dashbord/Ajout-user";
import ConfirmPasswordChange from "./pages/confirm-password-change";
import AjoutVehicule from "./pages/dashboards/members-dashbord/Ajout-vehicule";
import GestionUniteTarification from "./pages/dashboards/members-dashbord/Gestion-unite-tarification";
import GestionOptionLocation from "./pages/dashboards/members-dashbord/Gestion-option-location";
import ListeVehicules from "./pages/dashboards/members-dashbord/Liste-vehicules";

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
      },
      {
        path: "marques",
        element: <ListeMarque/>
      },
      {
        path: "marques/ajout",
        element: <AjoutMarque/>
      },
      {
        path: "marques/details/:id",
        element: <DetailsMarques/>
      },
      {
        path: "unitésdetarification",
        element: <GestionUniteTarification/>
      },
      {
        path: "optionsdelocation",
        element: <GestionOptionLocation/>
      },
      {
        path: "vehicules",
        element: <ListeVehicules/>
      },
      {
        path: "vehicules/ajout",
        element: <AjoutVehicule/>
      }
    ]
  },
  {
    path: "/members-dashboard/settings",
    element: <TokenContextProvider><ProtectedRoute><Settings/></ProtectedRoute></TokenContextProvider>,
    children: [
      {
        path: "",
        element: <AccountSettings/>
      },
      {
        path: "droits",
        element: <ListeDroit/>
      },
      {
        path: "profils",
        element: <ListeProfils/>
      },
      {
        path: "utilisateurs",
        element: <ListeUsers/>
      },
      {
        path: "utilisateurs/ajout",
        element: <AjoutUser/>
      }
    ]
  },
  {
    path: "/confirm-password-change",
    element: <ConfirmPasswordChange/>
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

