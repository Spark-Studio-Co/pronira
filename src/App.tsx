import { QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import reactQueryClient from "./shared/api/query-client";

// Import pages
import { CategoriesPage } from "./pages/categories-page/categories-page";
import { IntroPage } from "./pages/intro-page/intro-page";
import { RegistrationPage } from "./pages/registration-page/registration-page";
import { LinksPage } from "./pages/links-page/links-page";
import { PersonalPage } from "./pages/personal-page/personal-page";
import { SettingsPage } from "./pages/settings-page/settings-page";
import { PaymentPage } from "./pages/payment-page/payment-page";
import { SuccessPyamentPage } from "./pages/success-payment-page/success-payment-page";
import { DeniedPyamentPage } from "./pages/payment-denied-page/payment-denied-page";
import { PersonalDataPage } from "./pages/personal-data-page/personal-data-page";

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <Routes location={location} key={location.pathname}>
      <Route path="/" element={<IntroPage />} />
      <Route path="/registration" element={<RegistrationPage />} />
      <Route path="/categories" element={<CategoriesPage />} />
      <Route path="/links" element={<LinksPage />} />
      <Route path="/personal" element={<PersonalPage />} />
      <Route path="/settings" element={<SettingsPage />} />
      <Route path="/settings/personal-data" element={<PersonalDataPage />} />
      <Route path="/payment" element={<PaymentPage />} />
      <Route path="/payment-success" element={<SuccessPyamentPage />} />
      <Route path="/payment-denied" element={<DeniedPyamentPage />} />
    </Routes>
  );
}

function App() {
  return (
    <QueryClientProvider client={reactQueryClient}>
      <BrowserRouter>
        <AnimatedRoutes />
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
