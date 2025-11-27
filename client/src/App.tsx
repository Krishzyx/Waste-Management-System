import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import { EcoProvider } from "@/context/EcoContext";
import AppLayout from "@/components/layout/AppLayout";

// Pages
import Home from "@/pages/Home";
import AdminDashboard from "@/pages/Admin";
import Drumyards from "@/pages/Drumyards";
import NGOs from "@/pages/NGOs";
import Connections from "@/pages/Connections"; // Will create next

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      
      {/* App Routes wrapped in Layout */}
      <Route path="/admin">
        <AppLayout>
          <AdminDashboard />
        </AppLayout>
      </Route>
      <Route path="/drumyards">
        <AppLayout>
          <Drumyards />
        </AppLayout>
      </Route>
      <Route path="/ngos">
        <AppLayout>
          <NGOs />
        </AppLayout>
      </Route>
      <Route path="/connections">
        <AppLayout>
           <Connections />
        </AppLayout>
      </Route>

      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <EcoProvider>
          <Router />
          <Toaster />
        </EcoProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
