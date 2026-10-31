import { environmentManager, QueryClient, QueryClientProvider } from "@tanstack/react-query"



const makeQueryClient = () => {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 60 * 1000,    // 1 hour
        retry: 1
      }
    }
  })
}


let browserQueryClient = undefined;

const getQueryClient = () => {
  if (environmentManager.isServer()) {
    return makeQueryClient()
  } else {
    if (!browserQueryClient) {
      browserQueryClient = makeQueryClient()
    }
    return browserQueryClient;
  }
}



const QueryProvider = ({ children }) => {

  const queryClient = getQueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  )
}


export default QueryProvider