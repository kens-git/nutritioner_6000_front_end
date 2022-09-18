import { BrowserRouter, Route, Routes } from 'react-router-dom'
import AddPage from './pages/AddPage';
import HomePage from './pages/HomePage';
import PageLayout from './components/layouts/PageLayout';
import ProfilePage from './pages/ProfilePage';

const App: React.FC<{}> = () => {
  return (
    <BrowserRouter>
      <PageLayout>
        <Routes>
          <Route path='/' element={<HomePage />} />
          {/* TODO: rename URL */}
          <Route path='/add' element={<AddPage />} />
          <Route path='/profile' element={<ProfilePage />} />
        </Routes>
      </PageLayout>
    </BrowserRouter>
  );
}

export default App;
