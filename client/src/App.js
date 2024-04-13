
import { Navigate, RouterProvider } from "react-router-dom";
import {Route,createBrowserRouter, createRoutesFromElements} from 'react-router-dom'
import { useSelector } from 'react-redux';
import Todo from "./page/Todo/Todo";
import Login from "./page/Login/Login";
import Home from "./page/Homepage/Home";
import Register from "./page/Register/Register";
import Sidebar from "./component/Sidebar/Sidebar";
import ErrorElement from "./ErrorElm";

function App() {
  const {user} = useSelector(state=>state.halo);

  const routes =createBrowserRouter(createRoutesFromElements(
    <>
  <Route path='/' element={<Sidebar/>} errorElement={<ErrorElement/>}>
    <Route path='todo' element={(user !== null) ? <Todo/>:<Login/>}/>
    <Route path='home' element={<Home/>}/>
  </Route>
  <Route path='/login' element={(user !== null) ? <Navigate to='/home' replace={true}/>:<Login/>}/>
  <Route path='/register' element={(user !== null)? <Navigate to='/home' replace={true}/>:<Register/>}/>
 </>
))
  return (
    <>
    <RouterProvider router={routes}/>
    </>
  );
}

export default App;
