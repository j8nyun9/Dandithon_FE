import { MyPage } from './pages/MyPage/MyPage';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { RequireAuth } from './components/auth/RequireAuth';
import { SiteShell } from './components/layout/SiteShell';
import { HomePage } from './pages/Home/HomePage';
import { ActivitiesLayout } from './pages/Activities/ActivitiesLayout';
import { MatchingPage } from './pages/Recommendations/MatchingPage';
import { VerifyPage } from './pages/Verification/VerifyPage';
import { RankingPage } from './pages/League/RankingPage';
import { RecordsPage } from './pages/Records/RecordsPage';
import { AboutPage } from './pages/About/AboutPage';
import { PartnersPage } from './pages/Partners/PartnersPage';
import { LoginPage } from './pages/Login/LoginPage';
import { AdminPage } from './pages/Admin/AdminPage';

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<SiteShell />}><Route path="login" element={<LoginPage />} /></Route>
        <Route element={<SiteShell />}>
          <Route index element={<HomePage />} />
          <Route path="activities" element={<ActivitiesLayout />}>
            <Route index element={<MatchingPage />} />
            <Route path="verify" element={<VerifyPage />} />
          </Route>
          <Route path="league" element={<RankingPage />} />
          <Route path="records" element={<RecordsPage />} /><Route element={<RequireAuth />}><Route path="my" element={<MyPage />} /></Route>
          <Route path="about" element={<AboutPage />} />
          <Route path="partners" element={<PartnersPage />} />
        </Route>
        <Route element={<RequireAuth />}><Route path="admin" element={<AdminPage />} /></Route>
        <Route path="*" element={<SiteShell />}><Route index element={<HomePage />} /></Route>
      </Routes>
    </BrowserRouter>
  );
}




