import { QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { CategoriesPage } from "./pages/categories-page/categories-page";
import { IntroPage } from "./pages/intro-page/intro-page";
import { RegistrationPage } from "./pages/registration-page/registration-page";
import reactQueryClient from "./shared/api/query-client";

function App() {
  return (
    <>
      <QueryClientProvider client={reactQueryClient}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<IntroPage />} />
            <Route path="/registration" element={<RegistrationPage />} />
            <Route path="/categories" element={<CategoriesPage />} />
          </Routes>
        </BrowserRouter>
      </QueryClientProvider>
    </>
  );
}

export default App;
