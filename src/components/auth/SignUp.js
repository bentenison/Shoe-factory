import React,{useState} from "react";
import { NavLink ,useHistory, Redirect } from "react-router-dom";
import { connect, useSelector } from "react-redux";
import {Register} from "../../redux/actions/AuthActions"
import { isLoaded, isEmpty } from "react-redux-firebase";
const SignUp = (props) => {
  const [first,setFirst] = useState('')
  const [last,setLast] = useState('')
  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')
  const auth = useSelector(state=>state.firebase.auth)

  if(isLoaded(auth)&& !isEmpty(auth)){
    return <Redirect to="/"/>
  }
  const Handlesubmit = (e)=>{
    e.preventDefault()
    const newUser = {
      first,
      last,
      email,
      password
    }
    console.log(newUser)
    props.Register(newUser)

  }
  return (
    <div className="container">
      <div className="card">
          <h3 className="header center-align orange-text text-darken-2">Sign Up</h3>
        <div className="row">
          <form className="col s12" onSubmit={Handlesubmit}>
            <div className="row">
              <div className="input-field col s6">
                <input id="first_name" type="text" className="validate" onChange={(e)=>setFirst(e.target.value)} />
                <label htmlFor="first_name">First Name</label>
              </div>
              <div className="input-field col s6">
                <input id="last_name" type="text" className="validate" onChange={(e)=>setLast(e.target.value)} />
                <label htmlFor="last_name">Last Name</label>
              </div>
            </div>
            <div className="row">
              <div className="input-field col s12">
                <input id="email" type="email" className="validate" onChange={(e)=>setEmail(e.target.value)}/>
                <label htmlFor="email">Email</label>
              </div>
            </div>
            <div className="row">
              <div className="input-field col s12">
                <input id="password" type="password" className="validate" onChange={(e)=>setPassword(e.target.value)} />
                <label htmlFor="password">Password</label>
              </div>
            </div>
            <button
              className="btn waves-effect waves-light orange darken-2 right"
              type="submit"
              name="action"
            >
              Sign Up
              <i className="material-icons right">done</i>
            </button>
          </form>
          {props.autherror ? <p className="text-red text-darken-3">{props.autherror.message}</p>:""}
          <p>
            Already Having an account <NavLink to="/signin">Sign In</NavLink>
          </p>
        </div>
      </div>
    </div>
  );
};


const mapDispatchToProps =(dispatch)=> {
  return{
    Register:(newUser)=>dispatch(Register(newUser))
  }
}
const mapStateToProps = (state) => ({
  autherror : state.auth.autherror
})



export default connect(mapStateToProps,mapDispatchToProps)(SignUp)
