import React, { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import UserContext from "../../context/UserContext";
import AuthOptions from "../auth/AuthOptions";

export default function Header() {
  const { userData, setUserData } = useContext(UserContext);

  return (
    <header id='header'>
      <Link to='/'>
        <h1 className='title'>Task Management</h1>
      </Link>
      {/* <Link to="/manage-users">ManageUsers</Link> */}
      <AuthOptions />
    </header>
  );
}
