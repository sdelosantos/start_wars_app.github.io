import PlanetsTable from './presentation/components/PlanetsTable';
import ApiProvider from './core/context/ApiProvider';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ApiProvider>
        <PlanetsTable />
      </ApiProvider>
    </QueryClientProvider>
  );
}

export default App;
