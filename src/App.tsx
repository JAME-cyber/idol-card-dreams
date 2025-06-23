
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "./contexts/LanguageContext";
import { CartProvider } from "./contexts/CartContext";
import { AuthProvider } from "./contexts/AuthContext";
import { Suspense, lazy } from "react";

// Import direct pour la page principale pour éviter les problèmes de lazy loading
import Index from "./pages/Index";

// Lazy loading pour les autres pages
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
      retry: 1, // Réduire les tentatives pour éviter les boucles
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
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/auth" element={
                  <Suspense fallback={<PageFallback />}>
                    <Auth />
                  </Suspense>
                } />
                <Route path="/return-policy" element={
                  <Suspense fallback={<PageFallback />}>
                    <ReturnPolicy />
                  </Suspense>
                } />
                <Route path="/size-guide" element={
                  <Suspense fallback={<PageFallback />}>
                    <SizeGuide />
                  </Suspense>
                } />
                <Route path="/shipping-info" element={
                  <Suspense fallback={<PageFallback />}>
                    <ShippingInfo />
                  </Suspense>
                } />
                <Route path="/faq" element={
                  <Suspense fallback={<PageFallback />}>
                    <FAQ />
                  </Suspense>
                } />
                <Route path="/checkout/success" element={
                  <Suspense fallback={<PageFallback />}>
                    <CheckoutSuccess />
                  </Suspense>
                } />
                <Route path="/checkout/cancel" element={
                  <Suspense fallback={<PageFallback />}>
                    <CheckoutCancel />
                  </Suspense>
                } />
                <Route path="*" element={
                  <Suspense fallback={<PageFallback />}>
                    <NotFound />
                  </Suspense>
                } />
              </Routes>
            </BrowserRouter>
          </TooltipProvider>
        </CartProvider>
      </LanguageProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
