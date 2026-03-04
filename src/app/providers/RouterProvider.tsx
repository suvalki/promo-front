import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router";
import { Center, Loader } from "@mantine/core";
import { useUserStore } from "@/entities/user/model/store";
import { MainLayout } from "@/widgets/layout";

const LoginPage = lazy(() =>
  import("@/pages/auth/login").then((m) => ({ default: m.LoginPage })),
);
const SignupPage = lazy(() =>
  import("@/pages/auth/signup").then((m) => ({ default: m.SignupPage })),
);
const ForgotPasswordPage = lazy(() =>
  import("@/pages/auth/forgot-password").then((m) => ({
    default: m.ForgotPasswordPage,
  })),
);
const ResetPasswordPage = lazy(() =>
  import("@/pages/auth/reset-password").then((m) => ({
    default: m.ResetPasswordPage,
  })),
);
const DashboardPage = lazy(() =>
  import("@/pages/dashboard").then((m) => ({ default: m.DashboardPage })),
);
const OrdersPage = lazy(() =>
  import("@/pages/orders").then((m) => ({ default: m.OrdersPage })),
);
const PromoPage = lazy(() =>
  import("@/pages/promo").then((m) => ({ default: m.PromoPage })),
);

const SuspendedFallback = () => (
  <Center h="100vh" w="100%">
    <Loader type="dots" />
  </Center>
);

export const AppRouter = () => {
  const { user } = useUserStore();

  if (user === null) {
    return (
      <BrowserRouter>
        <Suspense fallback={<SuspendedFallback />}>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/forgot-password" element={<ForgotPasswordPage />} />
            <Route path="/reset-password" element={<ResetPasswordPage />} />
            <Route path="*" element={<Navigate to="/login" replace />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    );
  }

  return (
    <BrowserRouter>
      <Suspense fallback={<SuspendedFallback />}>
        <Routes>
          <Route element={<MainLayout />}>
            <Route path="/" element={<DashboardPage />} />
            <Route path="/orders" element={<OrdersPage />} />
            <Route path="/promo" element={<PromoPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};
