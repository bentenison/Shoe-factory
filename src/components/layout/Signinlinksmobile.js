import React from 'react'
import {NavLink} from "react-router-dom"
export const SignedInLinksMobile = ({count,Logout}) => {
    return (
       <>
            <li>
              <NavLink to="/" className="waves-effect  orange-text text-darken-2"><i className="material-icons">home</i>Dashboard</NavLink>
            </li>
            <li>
              <NavLink to="/add" className="waves-effect  orange-text text-darken-2"><i className="material-icons">add</i>Add</NavLink>
            </li>
            <li>
              <NavLink to="/cart" className="waves-effect orange-text text-darken-2"><i className="material-icons">add_shopping_cart</i>Cart<span class=" badge orange white-text">{count} items</span></NavLink>
            </li>
            <li>
              <NavLink to="/profile" className="waves-effect orange-text text-darken-2"><i className="material-icons">people</i>Profile</NavLink>
            </li>
            <li>
              <NavLink to="/orders" className="waves-effect orange-text text-darken-2"><i className="material-icons">assignment</i>Orders</NavLink>
            </li>
            <li>
              <NavLink to="/" className="waves-effect orange-text text-darken-2"onClick={Logout}><i className="material-icons">error</i>Logout</NavLink>
            </li>
            
          </>
    )
}