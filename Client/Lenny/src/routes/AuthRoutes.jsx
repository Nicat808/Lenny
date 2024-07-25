import {Navigate,Outlet} from "react-router-dom"
import {userData} from "../helpers"

const AuthRoutes = () =>{
    const {jwt} = userData();
    return !jwt ? <Outlet/> : <Navigate to="/"/>
}
export default AuthRoutes;
