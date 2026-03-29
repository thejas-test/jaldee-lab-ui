import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import AppLayout from "@/components/layout/AppLayout";
import Dashboard from "./pages/Dashboard";
import OrdersList from "./pages/OrdersList";
import CreateOrder from "./pages/CreateOrder";
import OrderDetail from "./pages/OrderDetail";
import ResultEntry from "./pages/ResultEntry";
import ResultValidation from "./pages/ResultValidation";
import ReportPreview from "./pages/ReportPreview";
import TestsList from "./pages/TestsList";
import CreateEditTest from "./pages/CreateEditTest";
import TestPackagesList from "./pages/TestPackagesList";
import CreateEditPackage from "./pages/CreateEditPackage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AppLayout>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/orders" element={<OrdersList />} />
            <Route path="/orders/create" element={<CreateOrder />} />
            <Route path="/orders/:id" element={<OrderDetail />} />
            <Route path="/orders/:id/result-entry" element={<ResultEntry />} />
            <Route path="/orders/:id/validate" element={<ResultValidation />} />
            <Route path="/orders/:id/report" element={<ReportPreview />} />
            <Route path="/tests" element={<TestsList />} />
            <Route path="/tests/create" element={<CreateEditTest />} />
            <Route path="/tests/:id/edit" element={<CreateEditTest />} />
            <Route path="/test-packages" element={<TestPackagesList />} />
            <Route path="/test-packages/create" element={<CreateEditPackage />} />
            <Route path="/test-packages/:id/edit" element={<CreateEditPackage />} />
            <Route path="/samples" element={<Dashboard />} />
            <Route path="/validate" element={<Dashboard />} />
            <Route path="/patients" element={<Dashboard />} />
            <Route path="/reports" element={<Dashboard />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AppLayout>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
