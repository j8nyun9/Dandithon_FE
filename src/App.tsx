import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { SiteShell } from './components/layout/SiteShell';
import { HomePage } from './pages/Home/HomePage';
import { ActivitiesLayout } from './pages/Activities/ActivitiesLayout';
import { MatchingPage } from './pages/Recommendations/MatchingPage';
import { VerifyPage } from './pages/Verification/VerifyPage';
import { RankingPage } from './pages/League/RankingPage';
import { AwardsPage } from './pages/Awards/AwardsPage';
import { RecordsPage } from './pages/Records/RecordsPage';
import { AboutPage } from './pages/About/AboutPage';
import { PartnersPage } from './pages/Partners/PartnersPage';
import { AdminPage } from './pages/Admin/AdminPage';

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<SiteShell />}>
          <Route index element={<HomePage />} />
          <Route path="activities" element={<ActivitiesLayout />}>
            <Route index element={<MatchingPage />} />
            <Route path="verify" element={<VerifyPage />} />
          </Route>
          <Route path="league" element={<RankingPage />} />
          <Route path="awards" element={<AwardsPage />} />
          <Route path="records" element={<RecordsPage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="partners" element={<PartnersPage />} />
        </Route>
        <Route path="admin" element={<AdminPage />} />
      </Routes>
    </BrowserRouter>
  );
}
