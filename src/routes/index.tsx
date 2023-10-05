import "bootstrap/dist/css/bootstrap.min.css";

import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import Login from "../containers/login/index";

import { StoreModel } from "../models/store.model";
import Home from "../containers/home/list";

const SystemRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/Home" element={(
                  <>
                      <ProtectedRoute>
                          <Home />
                      </ProtectedRoute>
                  </>
              )} />

      <Route path="*" element={<Navigate to="/Login" />} />
    </Routes>
  );
};

interface IPrivateProps {
  children: any;
}

const ProtectedRoute = ({ children }: IPrivateProps) => {
  const authentication = useSelector((state: StoreModel) => state.authentication);
  const navigate = useNavigate();
  if (!authentication?.accessToken) {
    navigate('/Login');
    return <Navigate to="/" replace />;
  }
  
  return children;
};


export default SystemRoutes;
