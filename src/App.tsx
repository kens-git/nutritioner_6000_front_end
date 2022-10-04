import React, { useContext } from 'react';
import { BrowserRouter, Navigate, Route,
  Routes } from 'react-router-dom';
import AddPage from './pages/AddPage';
import AuthContext from './store/AuthContext';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import PageLayout from './components/layouts/PageLayout';
import ProfilePage from './pages/ProfilePage';

const App: React.FC<React.PropsWithChildren & React.HTMLAttributes<any>> = () => {
  const authContext = useContext(AuthContext);

  return (
    <div className='container mx-auto font-sans'>
      <BrowserRouter>
        <PageLayout>
          <Routes>
            {!authContext.isLoggedIn() ?
              <Route path='/login' element={<LoginPage />} />
              : <>
                  <Route path='/' element={<HomePage />} />
                  <Route path='/add' element={<AddPage />} />
                  <Route path='/profile' element={<ProfilePage />} />
                </>
            }
            <Route path='*' element={<Navigate
              to={authContext.isLoggedIn() ? '/' : '/login'} />} />
          </Routes>
        </PageLayout>
      </BrowserRouter>
    </div>
  );
}

export default App;
