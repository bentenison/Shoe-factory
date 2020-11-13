import React from 'react'
import {NavLink} from "react-router-dom"
export const SignOutLinksMobile = () => {
    return (
       <>
            <li>
            <NavLink to="/"className="waves-effect orange-text text-darken-2"><i className="material-icons">home</i>Dashboard</NavLink>
            </li>
            <li>
              <NavLink to="/signup"className="waves-effect  orange-text text-darken-2"><i className="material-icons">person_add</i>Sign Up</NavLink>
            </li>
            <li>
              <NavLink to="/signin" className="waves-effect orange-text text-darken-2"><i className="material-icons">person</i>Sign In</NavLink>
            </li>
          </>
    )
}