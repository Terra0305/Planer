import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from './components/Layout';
import { DashboardPage } from './pages/DashboardPage';
import { ActivityListPage } from './pages/ActivityListPage';
import { ActivityDetailPage } from './pages/ActivityDetailPage';
import { CreateActivityPage } from './pages/CreateActivityPage';
import { DeadlinePage } from './pages/DeadlinePage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<DashboardPage />} />
          <Route path="activities" element={<ActivityListPage />} />
          <Route path="activities/:id" element={<ActivityDetailPage />} />
          <Route path="create" element={<CreateActivityPage />} />
          <Route path="deadlines" element={<DeadlinePage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
