import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../../store/AuthContext';

const link_classes = 'flex-1 flex \
bg-sky-300 hover:bg-sky-200 \
hover:h-[110%] hover:border-b-2 hover:border-b-sky-300';

/** Component that displays the primary navigation panel. */
const HeaderNavigation: React.FC<{}> = props => {
  const authCtx = useContext(AuthContext);

  const onLogout = () => {
    authCtx.logout();
  }

  return (
    <header>
      <nav className='flex flex-row items-stretch h-10'>
        <Link id='home' className={link_classes} to='/'>
          <span className='m-auto'>Home</span>
        </Link>
        <Link className={link_classes} to='/add'>
          <span className='m-auto'>Add</span>
        </Link>
        <Link className={link_classes} to='/profile'>
          <span className='m-auto'>Profile</span>
        </Link>
        <a className={link_classes} onClick={onLogout}>
          <span className='m-auto'>Logout</span>
        </a>
      </nav>
    </header>
  );
}

export default HeaderNavigation;
