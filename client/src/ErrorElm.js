import { NavLink } from "react-router-dom";

const ErrorElement =()=>{
    return(
        <div>
        <p>404 Error</p>
        <NavLink to='/login'>
            Login
        </NavLink>
      </div>
    )
}

export default ErrorElement;