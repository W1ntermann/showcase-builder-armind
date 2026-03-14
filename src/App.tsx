import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { ContactPopupProvider } from "@/contexts/ContactPopupContext";
import Index from "./pages/Index";
import LaserCutting from "./pages/LaserCutting";
import PowderCoating from "./pages/PowderCoating";
import PreciseBending from "./pages/PreciseBending";
import MetalWelding from "./pages/MetalWelding";
import ComplexManufacturing from "./pages/ComplexManufacturing";
import ContactForm from "./pages/ContactForm";
import Thanks from "./pages/Thanks";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <HelmetProvider>
      <TooltipProvider>
        <ContactPopupProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/laser-cutting" element={<LaserCutting />} />
              <Route path="/powder-coating" element={<PowderCoating />} />
              <Route path="/precise-bending" element={<PreciseBending />} />
              <Route path="/metal-welding" element={<MetalWelding />} />
              <Route path="/complex-manufacturing" element={<ComplexManufacturing />} />
              <Route path="/contact" element={<ContactForm />} />
              <Route path="/thanks" element={<Thanks />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </ContactPopupProvider>
      </TooltipProvider>
    </HelmetProvider>
  </QueryClientProvider>
);

export default App;