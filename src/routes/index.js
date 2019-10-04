import HomeComponent from "../components/Home";
import LoginComponent from "../components/Login";

const routes = [
  { path: "/", exact: true, name: "Home", component: HomeComponent },
  { path: "/login", exact: true, name: "Login", component: LoginComponent }
];

export default routes;
