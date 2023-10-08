import { useContext, useEffect, useState } from "react";
import withAuth from "../hoc/withAuth";
import { AuthContext } from "../context/AuthContext";
import { redirect, Outlet, useLocation, Link } from "react-router-dom";
import authApi from '../apis/auth';

export default withAuth(Root, 'protected');
function Root() {
  const { makeLogout } = useContext(AuthContext);
  const location = useLocation();
  const [user, setUser] = useState<any>({});

  const handleLogout = () => {
    makeLogout();
    redirect('/login');
  }

  const fetchUserLogin = async () => {
    const resp: any = await authApi.me();
    setUser(resp.data)
  }

  useEffect(() => {
    fetchUserLogin();
  }, [])

  return (
    <>
      <div id="sidebar">
        <h1>Tutorials</h1>
        <nav>
          <ul>
            <li className={location.pathname === '/users' ? 'bg-gray-200' : ''}>
              <Link to={'/users'}>Users</Link>
            </li>
            <li className={location.pathname === '/roles' ? 'bg-gray-200' : ''}>
              <Link to={'/roles'}>Roles</Link>
            </li>
            <li className={location.pathname === '/files' ? 'bg-gray-200' : ''}>
              <Link to={'/files'}>Files</Link>
            </li>
            <li>
              <a className="bg-red-500 text-white text-center" style={{color: 'white'}} href={'/#'} onClick={() => handleLogout()}>Logout</a>
            </li>
          </ul>
        </nav>
      </div>
      <div id="detail">
        {location.pathname === '/' && (
          <div>
            <p>'Welcome to tutorial ReactJS Node Express'</p>
            <p>Name: {user.name}</p>
            <p>Email: {user.email}</p>
            <p>Role: {user?.role?.name}</p>
          </div>
        )}
        <Outlet />
      </div>
    </>
  );
}
