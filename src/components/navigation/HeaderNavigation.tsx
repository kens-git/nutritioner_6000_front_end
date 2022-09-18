import React from 'react';
import { Link } from 'react-router-dom';

const HeaderNavigation: React.FC<{}> = props => {
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
        </ul>
      </nav>
    </header>
  );
}

export default HeaderNavigation;
