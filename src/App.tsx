import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import SiteHeader from "./components/layout/SiteHeader";
import SiteFooter from "./components/layout/SiteFooter";
import ScrollToHash from "./components/utils/ScrollToHash";

import HomePage from "./pages/HomePage";
import AuthPage from "./pages/AuthPage";
import MassagePage from "./pages/MassagePage";
import TrainingPage from "./pages/TrainingPage";
import HerbsPage from "./pages/HerbsPage";
import AboutPage from "./pages/AboutPage";
import ReviewsPage from "./pages/ReviewsPage";
import CartPage from "./pages/CartPage";
import AdminInboxPage from "./pages/AdminInboxPage";
import AccountPage from "./pages/AccountPage";
import SchedulePage from "./pages/SchedulePage";
import BlogListPage from "./pages/BlogListPage";
import BlogPostPage from "./pages/BlogPostPage";
import AnalyticsTracker from "./components/AnalyticsTracker";

import { RequireAuth, RequireAdmin } from "./routes/guards";
export default function App() {
  return (
    <BrowserRouter>
      <ScrollToHash />
      <AnalyticsTracker />
      
      <div className="appShell">
        <SiteHeader brandText="" />

        <main className="appContent">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/auth" element={<AuthPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/massage" element={<MassagePage />} />
            <Route path="/training" element={<TrainingPage />} />
            <Route path="/herbs" element={<HerbsPage />} />
            <Route path="/recommendations" element={<Navigate to="/herbs" replace />} />
            <Route path="/reviews" element={<ReviewsPage />} />
            <Route path="/about" element={<AboutPage />} />   
            <Route path="/account" element={<RequireAuth><AccountPage /></RequireAuth>} />
            <Route path="/admin/inbox" element={<RequireAdmin><AdminInboxPage /></RequireAdmin>} />
            <Route path="/" element={<Navigate to="/schedule" replace />} />
            <Route path="/schedule" element={<SchedulePage />} />
            <Route path="/blog" element={<BlogListPage />} />
            <Route path="/blog/:slug" element={<BlogPostPage />} />
            <Route path="*" element={<div style={{ padding: 24 }}>404</div>} />
          </Routes>
        </main>

        <SiteFooter />
      </div>
    </BrowserRouter>
  );
}
