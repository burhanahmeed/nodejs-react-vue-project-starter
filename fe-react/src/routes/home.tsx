import { useContext } from "react";
import withAuth from "../hoc/withAuth";
import { AuthContext } from "../context/AuthContext";
import { redirect, Outlet, useLocation, Link } from "react-router-dom";

export default withAuth(Root, 'protected');
function Root() {
  const { makeLogout } = useContext(AuthContext);
  let location = useLocation();

  const handleLogout = () => {
    makeLogout();
    redirect('/login');
  }

  return (
    <>
      <div id="sidebar">
        <h1>Tutorials</h1>
        <nav>
          <ul>
            <li>
              <Link to={'/users'}>Users</Link>
            </li>
            <li>
              <Link to={'/roles'}>Roles</Link>
            </li>
            <li>
              <Link to={'/files'}>Files</Link>
            </li>
            <li>
              <a className="bg-red-500 text-white text-center" style={{color: 'white'}} href={'/#'} onClick={() => handleLogout()}>Logout</a>
            </li>
          </ul>
        </nav>
      </div>
      <div id="detail">
        {location.pathname === '/' && 'Welcome to tutorial ReactJS Node Express'}
        <Outlet />
      </div>
    </>
  );
}
