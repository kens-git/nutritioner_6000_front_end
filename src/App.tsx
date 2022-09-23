import { useContext } from 'react';
import { BrowserRouter, Navigate, Route,
  Routes } from 'react-router-dom';
import AddPage from './pages/AddPage';
import AuthContext from './store/auth-context';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import PageLayout from './components/layouts/PageLayout';
import ProfilePage from './pages/ProfilePage';

const App: React.FC<{}> = () => {
  const authContext = useContext(AuthContext);

  return (
    <BrowserRouter>
      <PageLayout>
        <Routes>
          <Route path='/login' element={<LoginPage />} />
          {authContext.isLoggedIn &&
            <>
              <Route path='/' element={<HomePage />} />
              <Route path='/add' element={<AddPage />} />
              <Route path='/profile' element={<ProfilePage />} />
            </>
          }
          <Route path='*' element={<Navigate
            to={authContext.isLoggedIn ? '/' : '/login'} />}
          />
        </Routes>
      </PageLayout>
    </BrowserRouter>
  );
}

export default App;
