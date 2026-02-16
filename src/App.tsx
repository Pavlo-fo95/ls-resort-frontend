import { BrowserRouter, Routes, Route } from "react-router-dom";
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
import { RequireAuth, RequireAdmin } from "./routes/guards";
export default function App() {
  return (
    <BrowserRouter>
      <ScrollToHash />

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
            <Route path="/reviews" element={<ReviewsPage />} />
            <Route path="/about" element={<AboutPage />} />   
            <Route path="/account" element={<RequireAuth><AccountPage /></RequireAuth>} />
            <Route path="/admin/inbox" element={<RequireAdmin><AdminInboxPage /></RequireAdmin>} />
          </Routes>
        </main>

        <SiteFooter />
      </div>
    </BrowserRouter>
  );
}
