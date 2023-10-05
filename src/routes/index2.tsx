import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import Home from "../containers/home/list";
import Login from "../containers/login";
import { StoreModel } from "../models/store.model";
import { useSelector } from "react-redux";


const AppRoutes: React.FC = () => {
    const routeList = [
          {
              path: "Home",
              element: (
                  <>
                      <ProtectedRoute>
                          <Home />
                      </ProtectedRoute>
                  </>
              ),
          }
      ];
  
    return (
      <Routes>
        <Route path="/" element={<Login />} />
  
        {routeList.map((route) => {
          return (
            <>
              <Route {...route} />
            </>
          );
        })}
      </Routes>
    );
  };
  
  interface IPrivateProps {
    children: any;
  }
  
  const ProtectedRoute = ({ children }: IPrivateProps) => {
    const authentication = useSelector((state: StoreModel) => state.authentication);
    const navigate = useNavigate();
    debugger;
    if (authentication?.accessToken) {
            navigate('/Login');
        return <Navigate to="/" replace />;
        }
    
        return children;
    };
  
  export default AppRoutes;
  