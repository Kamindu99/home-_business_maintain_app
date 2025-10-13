import { lazy } from 'react';

// project import
import Loadable from 'components/Loadable';
import CommonLayout from 'layout/CommonLayout';
import MainLayout from 'layout/MainLayout';
import AuthGuard from 'utils/route-guard/AuthGuard';

// pages routing
const AuthLogin = Loadable(lazy(() => import('pages/auth/login')));
const AuthRegister = Loadable(lazy(() => import('pages/auth/register')));
const AuthForgotPassword = Loadable(lazy(() => import('pages/auth/forgot-password')));
const AuthResetPassword = Loadable(lazy(() => import('pages/auth/reset-password')));
const AuthCheckMail = Loadable(lazy(() => import('pages/auth/check-mail')));
const AuthCodeVerification = Loadable(lazy(() => import('pages/auth/code-verification')));

const MaintenanceError = Loadable(lazy(() => import('pages/maintenance/404')));
const MaintenanceError500 = Loadable(lazy(() => import('pages/maintenance/500')));
const MaintenanceUnderConstruction = Loadable(lazy(() => import('pages/maintenance/under-construction')));
const MaintenanceComingSoon = Loadable(lazy(() => import('pages/maintenance/coming-soon')));

// render - home page
const Dashboard = Loadable(lazy(() => import('pages/home/dashboard')));

//tea-management
const TeaCollection = Loadable(lazy(() => import('pages/tea-dalu-management/page')));
const TeaMoney = Loadable(lazy(() => import('pages/tea-dalu-management/tea-money/page')));

//coconut-management
const CoconutHarvest = Loadable(lazy(() => import('pages/coconut-management/coconut-harvest/page')));
const CoconutHarvestAdd = Loadable(lazy(() => import('pages/coconut-management/coconut-harvest/add/page')));
const CoconutMoney = Loadable(lazy(() => import('pages/coconut-management/coconut-money/page')));

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
  path: '/',
  children: [
    {
      path: '/',
      element: (
        <AuthGuard>
          <MainLayout />
        </AuthGuard>
      ),
      children: [
        {
          path: '',
          children: [
            {
              path: 'dashboard',
              element: <Dashboard />
            }
          ]
        },
        {
          path: 'tea-management',
          children: [
            {
              path: 'tea-collection',
              element: <TeaCollection />
            },
            {
              path: 'tea-money',
              element: <TeaMoney />
            }
          ]
        },
         {
          path: 'coconut-management',
          children: [
            {
              path: 'coconut-harvest',
              element: <CoconutHarvest />
            },
             {
              path: 'coconut-harvest/add',
              element: <CoconutHarvestAdd />
            },
            {
              path: 'coconut-money',
              element: <CoconutMoney />
            }
          ]
        }
      ]
    },
    {
      path: '/maintenance',
      element: <CommonLayout />,
      children: [
        {
          path: '404',
          element: <MaintenanceError />
        },
        {
          path: '500',
          element: <MaintenanceError500 />
        },
        {
          path: 'under-construction',
          element: <MaintenanceUnderConstruction />
        },
        {
          path: 'coming-soon',
          element: <MaintenanceComingSoon />
        }
      ]
    },
    {
      path: '/auth',
      element: <CommonLayout />,
      children: [
        {
          path: 'login',
          element: <AuthLogin />
        },
        {
          path: 'register',
          element: <AuthRegister />
        },
        {
          path: 'forgot-password',
          element: <AuthForgotPassword />
        },
        {
          path: 'reset-password',
          element: <AuthResetPassword />
        },
        {
          path: 'check-mail',
          element: <AuthCheckMail />
        },
        {
          path: 'code-verification',
          element: <AuthCodeVerification />
        }
      ]
    }
  ]
};

export default MainRoutes;
