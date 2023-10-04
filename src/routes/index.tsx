import "bootstrap/dist/css/bootstrap.min.css";

import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import NotFound from "../containers/notFound";
import Login from "../containers/login/index";

import { StoreModel } from "../models/store.model";
import Home from "../containers/home/list";

const SystemRoutes = () => {
  return (
    <Routes>
      <Route path="/404" element={<NotFound />} />
      <Route path="/Login" element={<Login />} />
      <Route path="/Home" element={<PrivateRoute component={Home} />} />

      <Route path="*" element={<Navigate to="/404" />} />
    </Routes>
  );
};

// const PrivateRoute : any= ({...rest }) => {
//   const authentication = useSelector(
//     (state: StoreModel) => state.authentication
//   );
//   const navigate = useNavigate();

//   if (authentication?.accessToken) {
//     return  {...rest};
//   } else {
//     navigate("/Login", { state: { from: rest.location }, replace: true });
//     return null;
//   }
// };

const PrivateRoute: React.FC<{ component: React.FC }> = ({ component: Component, ...rest }) => {
  const authentication = useSelector((state: StoreModel) => state.authentication);
  const navigate = useNavigate();

  if (authentication?.accessToken) {
    return <Route {...rest} element={<Component />} />;
  } else {
    navigate('/Login', { state: { from: rest }, replace: true });
    return <Navigate to="/Login" />;
  }
};



export default SystemRoutes;
