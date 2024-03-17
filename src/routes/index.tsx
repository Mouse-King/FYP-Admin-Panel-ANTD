import type { FC } from 'react';
import type { RouteObject } from 'react-router';
import { lazy } from 'react';
import { Navigate } from 'react-router';
import { useRoutes } from 'react-router-dom';
import UserPage from '@/pages/user';
import LayoutPage from '@/pages/layout';
import LoginPage from '@/pages/login';
import SignupPage from '@/pages/signup';
import WrapperRouteComponent from './config';

const NotFound = lazy(() => import(/* webpackChunkName: "404'"*/ '@/pages/404'));
const LinkItemPage = lazy(() => import(/* webpackChunkName: "item'"*/ '@/pages/link/item'));
const LinkCategoryPage = lazy(() => import(/* webpackChunkName: "item'"*/ '@/pages/link/category'));
const DesignCategoryPage = lazy(() => import(/* webpackChunkName: "item'"*/ '@/pages/design/category'));
const DesignItemPage = lazy(() => import(/* webpackChunkName: "item'"*/ '@/pages/design/item'));

const routeList: RouteObject[] = [
  {
    path: '/login',
    element: <WrapperRouteComponent element={<LoginPage />} titleId="Login" />,
  },
  {
    path: '/signup',
    element: <WrapperRouteComponent element={<SignupPage />} titleId="Sign Up" />,
  },
  {
    path: '/',
    element: <WrapperRouteComponent element={<LayoutPage />} />,
    children: [
      {
        path: '',
        element: <Navigate to="user" />,
      },
      {
        path: 'user',
        element: <WrapperRouteComponent element={<UserPage />} />,
      },
      {
        path: 'link/item',
        element: <WrapperRouteComponent element={<LinkItemPage />} />,
      },
      {
        path: 'link/category',
        element: <WrapperRouteComponent element={<LinkCategoryPage />} />,
      },
      {
        path: 'design/category',
        element: <WrapperRouteComponent element={<DesignCategoryPage />} />,
      },
      {
        path: 'design/item',
        element: <WrapperRouteComponent element={<DesignItemPage />} />,
      },
      {
        path: '*',
        element: <WrapperRouteComponent element={<NotFound />} />,
      },
    ],
  },
];

const RenderRouter: FC = () => {
  const element = useRoutes(routeList);
  return element;
};

export default RenderRouter;
