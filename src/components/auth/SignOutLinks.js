import React from 'react'
import {NavLink} from "react-router-dom"
export const SignOutLinks = () => {
    return (
       <>
            <li>
            <NavLink to="/"className="waves-effect ">Dashboard</NavLink>
            </li>
            <li>
              <NavLink to="/signup"className="waves-effect ">Sign Up</NavLink>
            </li>
            <li>
              <NavLink to="/signin" className="waves-effect">Sign In</NavLink>
            </li>
          </>
    )
}
