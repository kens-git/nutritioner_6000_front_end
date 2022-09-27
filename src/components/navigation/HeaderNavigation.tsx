import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../../store/AuthContext';

const HeaderNavigation: React.FC<{}> = props => {
  const authCtx = useContext(AuthContext);

  const onLogout = () => {
    authCtx.logout();
  }

  return (
    <header>
      <nav>
        <ul>
          <li>
            <Link to='/'>Home</Link>
          </li>
          <li>
            {/* TODO: update name */}
            <Link to='/add'>Add</Link>
          </li>
          <li>
            <Link to='/profile'>Profile</Link>
          </li>
          <li>
            <button onClick={onLogout}>Logout</button>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default HeaderNavigation;
