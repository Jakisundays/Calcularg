/** 
  All of the routes for the Soft UI Dashboard React are added here,
  You can add a new route, customize the routes and delete the routes here.

  Once you add a new route on this file it will be visible automatically on
  the Sidenav.

  For adding a new route you can follow the existing routes in the routes array.
  1. The `type` key with the `collapse` value is used for a route.
  2. The `type` key with the `title` value is used for a title inside the Sidenav. 
  3. The `type` key with the `divider` value is used for a divider between Sidenav items.
  4. The `name` key is used for the name of the route on the Sidenav.
  5. The `key` key is used for the key of the route (It will help you with the key prop inside a loop).
  6. The `icon` key is used for the icon of the route on the Sidenav, you have to add a node.
  7. The `collapse` key is used for making a collapsible item on the Sidenav that has other routes
  inside (nested routes), you need to pass the nested routes inside an array as a value for the `collapse` key.
  8. The `route` key is used to store the route location which is used for the react router.
  9. The `href` key is used to store the external links location.
  10. The `title` key is only for the item with the type of `title` and its used for the title text on the Sidenav.
  10. The `component` key is used to store the component of its route.
*/

// Soft UI Dashboard React layouts
import Dashboard from "layouts/dashboard";
import Tables from "layouts/tables";
import Billing from "layouts/billing";
import Profile from "layouts/profile";
import SignIn from "layouts/authentication/sign-in";
import SignUp from "layouts/authentication/sign-up";

// Soft UI Dashboard React icons
import Shop from "examples/Icons/Shop";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import PaymentsIcon from "@mui/icons-material/Payments";
import Office from "examples/Icons/Office";
import Settings from "examples/Icons/Settings";
import Document from "examples/Icons/Document";
import SpaceShip from "examples/Icons/SpaceShip";
import CustomerSupport from "examples/Icons/CustomerSupport";
import CreditCard from "examples/Icons/CreditCard";
import Cube from "examples/Icons/Cube";
import Comparador from "layouts/comparador";
import Dolargento from "layouts/Dolargento";
import Success from "layouts/success";
import Privacy from "layouts/privacy";

// MD files
import PrivacyPolicy from "./layouts/privacy/files/PrivacyPolicy.jsx";
import TermsOfServices from "layouts/privacy/files/TermsOfServices";

export const routes = [
  {
    type: "collapse",
    name: "¿Cuotas o Contado?",
    key: "¿Cuotas o Contado?",
    route: "/comparador",
    icon: <PaymentsIcon size="12px" />,
    component: <Comparador />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Dólargento",
    key: "Dólargento",
    route: "/dolargento",
    icon: <AttachMoneyIcon size="12px" />,
    component: <Dolargento />,
    noCollapse: true,
  },
  { type: "title", title: "Eres miembro?", key: "autenticacion" },
  {
    type: "collapse",
    name: "Iniciar Sesión",
    key: "sign-in",
    route: "/authentication/sign-in",
    icon: <Document size="12px" />,
    component: <SignIn />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "¡Únete ahora!",
    key: "sign-up",
    route: "/authentication/sign-up",
    icon: <SpaceShip size="12px" />,
    component: <SignUp />,
    noCollapse: true,
  },
  {
    // type: "collapse",
    name: "Success",
    key: "success",
    route: "/success/:id",
    // icon: <SpaceShip size="12px" />,
    component: <Success />,
    // noCollapse: true,
  },
  {
    // type: "collapse",
    name: "Privacy Policy",
    key: "privacy-policy",
    route: "/privacypolicy",
    // icon: <SpaceShip size="12px" />,
    component: (
      <Privacy>
        <PrivacyPolicy />
      </Privacy>
    ),
    // noCollapse: true,
  },
  {
    // type: "collapse",
    name: "Terms of Services",
    key: "terms-of-services",
    route: "/termsofservices",
    // icon: <SpaceShip size="12px" />,
    component: (
      <Privacy>
        <TermsOfServices />
      </Privacy>
    ),
    // noCollapse: true,
  },
];

export const userRoutes = [
  {
    type: "collapse",
    name: "¿Cuotas o Contado?",
    key: "¿Cuotas o Contado?",
    route: "/comparador",
    icon: <PaymentsIcon size="12px" />,
    component: <Comparador />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Dólargento",
    key: "Dólargento",
    route: "/dolargento",
    icon: <AttachMoneyIcon size="12px" />,
    component: <Dolargento />,
    noCollapse: true,
  },
  { type: "title", title: "Mi cuenta", key: "account" },
  {
    type: "collapse",
    name: "Perfil",
    key: "Perfil",
    route: "/perfil",
    icon: <CustomerSupport size="12px" />,
    component: <Profile />,
    noCollapse: true,
  },
];

// export default routes;
