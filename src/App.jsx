import React from 'react'
import { HashRouter as Router, Routes, Route } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import Layout from './components/Layout'
import Home from './pages/Inicio'
import Quiz from './pages/Cuestionario'
import Results from './pages/Resultados'
import Stats from './pages/Estadisticas'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
})

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          <Route path="/" element={<Layout><Home /></Layout>} />
          <Route path="/home" element={<Layout><Home /></Layout>} />
          <Route path="/quiz" element={<Layout><Quiz /></Layout>} />
          <Route path="/results" element={<Layout><Results /></Layout>} />
          <Route path="/stats" element={<Layout><Stats /></Layout>} />
        </Routes>
      </Router>
    </QueryClientProvider>
  )
}

export default App
