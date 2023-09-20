// withAuth.tsx
import { useContext, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';
import { FullPageLoading } from '../components/common/FullPageLoading';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';

const HOME_PAGE = '/';
const LOGIN_PAGE = '/login';

const withAuth = <P extends object>(
  WrappedComponent: React.ComponentType<P>,
  RouteRole: 'protected' | 'non-protected'
): React.FC<P> => {
  const Wrapper: React.FC<P> = (props) => {
    const { token } = useContext(AuthContext);
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const location = useLocation();

    useEffect(() => {
      // Perform authentication check and redirect if not logged in
      if (RouteRole === 'non-protected') {
        if (token) {
          if (searchParams.get('redirect')) {
            navigate(searchParams.get('redirect') as string);
          } else {
            navigate(HOME_PAGE); // Redirect to the login page or any other non-protected page
          }
        }
      } else if (RouteRole === 'protected') {
        if (!token) {
          navigate(`${LOGIN_PAGE}?redirect=${location.pathname}`); // Redirect to the login page or any other non-protected page
        }
      }
    }, [token]);

    if (!token && RouteRole !== 'non-protected') {
      // You can render a loading spinner or any other loading indicator
      return <FullPageLoading />;
    }

    // Render the wrapped component if authenticated
    return <WrappedComponent {...props} />;
  };

  return Wrapper;
};

export default withAuth;
