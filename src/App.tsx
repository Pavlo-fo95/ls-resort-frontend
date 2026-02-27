import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useEffect } from "react";
import Layout from "./components/layout/Layout";
import ScrollToHash from "./components/utils/ScrollToHash";
import AnalyticsTracker from "./components/AnalyticsTracker";

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

import { useTheme } from "./hooks/useTheme";
import { RequireAuth, RequireAdmin } from "./routes/guards";

export default function App() {
  const { theme } = useTheme();

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  return (
    <BrowserRouter>
      <ScrollToHash />
      <AnalyticsTracker />

      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/massage" element={<MassagePage />} />
          <Route path="/training" element={<TrainingPage />} />
          <Route path="/herbs" element={<HerbsPage />} />
          <Route path="/recommendations" element={<Navigate to="/herbs" replace />} />
          <Route path="/reviews" element={<ReviewsPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/schedule" element={<SchedulePage />} />
          <Route path="/blog" element={<BlogListPage />} />
          <Route path="/blog/:slug" element={<BlogPostPage />} />

          <Route path="/account" element={<RequireAuth><AccountPage /></RequireAuth>} />
          <Route path="/admin/inbox" element={<RequireAdmin><AdminInboxPage /></RequireAdmin>} />

          <Route path="*" element={<div style={{ padding: 24 }}>404</div>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}