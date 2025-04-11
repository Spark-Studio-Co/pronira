import { QueryClientProvider } from "@tanstack/react-query";
import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import reactQueryClient from "./shared/api/query-client";

import { IntroPage } from "./pages/intro-page/intro-page";
import { RegistrationPage } from "./pages/registration-page/registration-page";
import { LinksPage } from "./pages/links-page/links-page";
import { PersonalPage } from "./pages/personal-page/personal-page";
import { SettingsPage } from "./pages/settings-page/settings-page";
import { PaymentPage } from "./pages/payment-page/payment-page";
import { SuccessPyamentPage } from "./pages/success-payment-page/success-payment-page";
import { DeniedPyamentPage } from "./pages/payment-denied-page/payment-denied-page";
import { PersonalDataPage } from "./pages/personal-data-page/personal-data-page";
import Layout from "./components/layout/layout";
import UsersPage from "./pages/admin/users-page/users-page";
import PromocodesPage from "./pages/admin/promocodes-page/promocodes-page";
import DashboardPage from "./pages/admin/dashboard-page/dashboard-page";
import SubscriptionsPage from "./pages/admin/subscriptions-page/subscriptions-page";
import Login from "./pages/admin/login-page/login-page";
import { AgentPage } from "./pages/agent-option-page/agent-option-page";
import { PersonalLinksPage } from "./pages/personal-links/personal-links.page";
import PrivacyPolicyPage from "./pages/privacy-policy-page/privacy-policy-page";
import UserAgreementPage from "./pages/user-agreement-page/user-agreement-page";
import ReadmePage from "./pages/readme/readme-page";
import { VideoPage } from "./pages/video-page/video-page";
import LoginPage from "./pages/login-page/login-page";
import TBankPaymentPage from "./pages/t-bank-payment-page/t-bank-payment-page";
import AdminProtectedRoute from "./lib/route-guards/admin-protected.route";
import SubscriptionPolicy from "./pages/subscription-policy/subscription-policy";

function NavRoutes() {
  const location = useLocation();
  const isAuth = localStorage.getItem("isAuth") === "true";

  return (
    <Routes location={location} key={location.pathname}>
      {isAuth ? (
        <>
          <Route path="/personal" element={<PersonalPage />} />
          <Route path="/personal/links" element={<PersonalLinksPage />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route
            path="/settings/personal-data"
            element={<PersonalDataPage />}
          />
          <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
          <Route path="/subscription-policy" element={<SubscriptionPolicy />} />
          <Route path="/readme" element={<ReadmePage />} />
          <Route path="/user-agreement" element={<UserAgreementPage />} />
          <Route path="/payment/t-bank" element={<TBankPaymentPage />} />
          <Route path="/payment" element={<PaymentPage />} />
          <Route path="/payment-success" element={<SuccessPyamentPage />} />
          <Route path="/payment-denied" element={<DeniedPyamentPage />} />
          <Route path="*" element={<Navigate to="/personal" />} />
          <Route path="/video" element={<VideoPage />} />
        </>
      ) : (
        <>
          <Route path="/" element={<IntroPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/video" element={<VideoPage />} />
          <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
          <Route path="/subscription-policy" element={<SubscriptionPolicy />} />
          <Route path="/readme" element={<ReadmePage />} />
          <Route path="/user-agreement" element={<UserAgreementPage />} />
          <Route path="/registration" element={<RegistrationPage />} />
          <Route path="/agent" element={<AgentPage />} />
          <Route path="/links" element={<LinksPage />} />
          <Route path="*" element={<Navigate to="/" />} />
        </>
      )}
      <Route
        path="/admin"
        element={
          <AdminProtectedRoute>
            <Layout>
              <DashboardPage />
            </Layout>
          </AdminProtectedRoute>
        }
      />
      <Route path="/admin/login" element={<Login />} />
      <Route
        path="/admin/promocodes"
        element={
          <AdminProtectedRoute>
            <Layout>
              <PromocodesPage />
            </Layout>
          </AdminProtectedRoute>
        }
      />
      <Route
        path="/admin/subscriptions"
        element={
          <AdminProtectedRoute>
            <Layout>
              <SubscriptionsPage />
            </Layout>
          </AdminProtectedRoute>
        }
      />
      <Route
        path="/admin/users"
        element={
          <AdminProtectedRoute>
            <Layout>
              <UsersPage />
            </Layout>
          </AdminProtectedRoute>
        }
      />
    </Routes>
  );
}
// r
function App() {
  return (
    <QueryClientProvider client={reactQueryClient}>
      <BrowserRouter>
        <NavRoutes />
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
