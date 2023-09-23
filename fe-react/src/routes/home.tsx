import { useContext } from "react";
import withAuth from "../hoc/withAuth";
import { AuthContext } from "../context/AuthContext";
import { redirect } from "react-router-dom";

export default withAuth(Root, 'protected');
function Root() {
  const { makeLogout } = useContext(AuthContext);
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
              <a href={'/users'}>Users</a>
            </li>
            <li>
              <a href={'/roles'}>Roles</a>
            </li>
            <li>
              <a href={'/files'}>Files</a>
            </li>
            <li>
              <a className="bg-red-500 text-white text-center" style={{color: 'white'}} href={'/#'} onClick={() => handleLogout()}>Logout</a>
            </li>
          </ul>
        </nav>
      </div>
      <div id="detail">
        Welcome to tutorial ReactJS Node Express
      </div>
    </>
  );
}
