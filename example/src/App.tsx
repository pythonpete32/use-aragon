import { AppLayout } from './components/layout';
import {
  createBrowserRouter,
  Route,
  createRoutesFromElements,
  RouterProvider,
  BrowserRouter,
  Routes,
} from 'react-router-dom';
import { UseFetchDao } from './pages/UseFetchDao';
import { Links } from './constants/links';
import { Test } from './pages';
import { HeroTitle } from './components/hero';
import { NotFoundTitle } from './pages/404';
import { UseFetchDaos } from './pages/UseFetchDaos';

export default function App() {
  return (
    <BrowserRouter>
      <AppLayout>
        <Routes>
          <Route path="/" element={<HeroTitle />} />
          <Route path="use-fetch-dao" element={<UseFetchDao />} />
          <Route path="use-fetch-daos" element={<UseFetchDaos />} />
          <Route path="*" element={<NotFoundTitle />} />
        </Routes>
      </AppLayout>
    </BrowserRouter>
  );
}
