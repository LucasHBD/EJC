import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Home from './pages/inicio'
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import ProdutosPage from './pages/produtos/produtos'
import CadastroProduto from './pages/cadastro-produto/cadastroProduto'
import SobreNos from './pages/sobre/sobre'
import Contato from './pages/contato/contato'
import Login from './pages/login/login'
import { AuthProvider } from "./context/AuthContext"
import RotaProtegida from './context/RotaProtegida'

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/produtos",
    element: <ProdutosPage />
  },
  {
    path: "/cadastrar-produtos-admin",
    element: (
      <RotaProtegida>
        <CadastroProduto />
      </RotaProtegida>
    )
  },
  {
    path: "/sobreNos",
    element: <SobreNos />
  },
  {
    path: "/contato",
    element: <Contato />
  },
  {
    path: "/login",
    element: <Login />
  }
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>
);