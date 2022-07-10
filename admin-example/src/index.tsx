import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import CatPage from './pages/cats';
import { Action } from './utils/types';
import { CatDetail, CatForm, CatList } from './components/cats';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<MainLayout/>}>
        <Route path="Cats/" element={<CatPage />}>
          <Route path="" element={<CatList />} />
          <Route path=":id" element={<CatDetail />} />
          <Route path="Create" element={<CatForm action={Action.CREATE} />} />
          <Route path="Update/:id" element={<CatForm action={Action.UPDATE} />} />
        </Route>
      </Route>
    </Routes>
  </BrowserRouter>
);
