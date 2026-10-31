import QueryProvider from "./query.provider"


const Provider = ({ children }) => {
  return (
    <QueryProvider>
      {children}
    </QueryProvider>
  )
}


export default Provider