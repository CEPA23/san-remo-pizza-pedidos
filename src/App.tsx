
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import { TablesPage } from "./pages/TablesPage";
import { TableDetailPage } from "./pages/TableDetailPage";
import { DeliveryPage } from "./pages/DeliveryPage";
import { OrdersPage } from "./pages/OrdersPage";
import { OrderDetailPage } from "./pages/OrderDetailPage";
import { MenuPage } from "./pages/MenuPage";
import { DashboardPage } from "./pages/DashboardPage";
import { MainLayout } from "./components/layout/MainLayout";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route 
            path="/dashboard" 
            element={
              <MainLayout>
                <DashboardPage />
              </MainLayout>
            } 
          />
          <Route 
            path="/tables" 
            element={
              <MainLayout>
                <TablesPage />
              </MainLayout>
            } 
          />
          <Route 
            path="/tables/:id" 
            element={
              <MainLayout>
                <TableDetailPage />
              </MainLayout>
            } 
          />
          <Route 
            path="/delivery" 
            element={
              <MainLayout>
                <DeliveryPage />
              </MainLayout>
            } 
          />
          <Route 
            path="/orders" 
            element={
              <MainLayout>
                <OrdersPage />
              </MainLayout>
            } 
          />
          <Route 
            path="/orders/:id" 
            element={
              <MainLayout>
                <OrderDetailPage />
              </MainLayout>
            } 
          />
          <Route 
            path="/menu" 
            element={
              <MainLayout>
                <MenuPage />
              </MainLayout>
            } 
          />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
