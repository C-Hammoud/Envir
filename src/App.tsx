import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { Admin } from '@/pages/Admin';
import { Landing } from '@/pages/Landing';
import { ProjectDetail } from '@/pages/ProjectDetail';

export function App() {
  const base = import.meta.env.BASE_URL;
  const basename = base === '/' ? undefined : base.replace(/\/$/, '');

  return (
    <BrowserRouter basename={basename}>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/project/:projectId" element={<ProjectDetail />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
