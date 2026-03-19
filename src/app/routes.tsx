import { createBrowserRouter } from 'react-router';
import { Root } from './pages/Root';
import { Home } from './pages/Home';
import { AllProducts } from './pages/AllProducts';
import { Presale } from './pages/Presale';

export const router = createBrowserRouter([
  {
    path: '/',
    Component: Root,
    children: [
      { index: true, Component: Home },
      { path: 'productos', Component: AllProducts },
      { path: 'preventa', Component: Presale },
    ],
  },
]);
