import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Home from './pages/inicio'
import {createBrowserRouter, RouterProvider} from "react-router-dom"
import ProdutosPage from './pages/produtos/produtos'
import CadastroProduto from './pages/cadastro-produto/cadastroProduto'
import SobreNos from './pages/sobre/sobre'
import Contato from './pages/contato/contato'


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
    element: <CadastroProduto />
  },
  {
    path: "/sobreNos",
    element: <SobreNos />
  },
  {
    path: "/contato",
    element: <Contato />
  }
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
