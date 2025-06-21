
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "./contexts/LanguageContext";
import { CartProvider } from "./contexts/CartContext";
import { AuthProvider } from "./contexts/AuthContext";
import { Suspense, lazy } from "react";

// Lazy loading optimisé des pages
const Index = lazy(() => import("./pages/Index"));
const Auth = lazy(() => import("./pages/Auth"));
const ReturnPolicy = lazy(() => import("./pages/ReturnPolicy"));
const SizeGuide = lazy(() => import("./pages/SizeGuide"));
const ShippingInfo = lazy(() => import("./pages/ShippingInfo"));
const FAQ = lazy(() => import("./pages/FAQ"));
const CheckoutSuccess = lazy(() => import("./pages/CheckoutSuccess"));
const CheckoutCancel = lazy(() => import("./pages/CheckoutCancel"));
const NotFound = lazy(() => import("./pages/NotFound"));

// Composant de fallback optimisé
const PageFallback = () => (
  <div className="min-h-screen bg-gradient-to-br from-stone-powder via-white to-stone-beige/30 flex items-center justify-center">
    <div className="text-center">
      <div className="w-12 h-12 border-4 border-korean-gold border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
      <p className="text-stone-black/70 font-korean">Chargement...</p>
    </div>
  </div>
);

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      gcTime: 10 * 60 * 1000, // 10 minutes (was cacheTime)
    },
  },
});

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <LanguageProvider>
        <CartProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <Suspense fallback={<PageFallback />}>
                <Routes>
                  <Route path="/" element={<Index />} />
                  <Route path="/auth" element={<Auth />} />
                  <Route path="/return-policy" element={<ReturnPolicy />} />
                  <Route path="/size-guide" element={<SizeGuide />} />
                  <Route path="/shipping-info" element={<ShippingInfo />} />
                  <Route path="/faq" element={<FAQ />} />
                  <Route path="/checkout/success" element={<CheckoutSuccess />} />
                  <Route path="/checkout/cancel" element={<CheckoutCancel />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </Suspense>
            </BrowserRouter>
          </TooltipProvider>
        </CartProvider>
      </LanguageProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
