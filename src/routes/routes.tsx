import React from 'react';
import { Navigate } from 'react-router-dom';
import Auth from '@/layouts/Authority';

import Home from '@/pages/Home';
import Login from '@/pages/User/Login';
import BasicLayout from '@/layouts/BasicLayout';
import UserLayout from '@/layouts/UserLayout';
// import NoFond from '@/pages/NoFond';
import DeviceList from '@/pages/Device/Devices/List/Index';
import DeviceModelList from '@/pages/Device/Model/List/Index';
import DeviceFirmawre from '@/pages/Device/Firmware/List/Index';
import DeviceBattery from '@/pages/Device/Battery/List/Index';
import CollectorList from '@/pages/Collector/Collectors/List/Index';
import CollectorModalList from '@/pages/Collector/Model/List/Index';
import ColectorFirmwareList from '@/pages/Collector/Firmware/List/Index';
import AccountUserList from '@/pages/Account/User/List/Index';
import AccountRoleList from '@/pages/Account/Role/List/Index';
import NoticeList from '@/pages/Account/Notice/List/Index';

export interface IRouter {
  index?: boolean;
  path?: string;
  children?: IRouter[];
  element?: React.ReactNode;
  icon?: any;
  Component?: any;
  title?: string; //
  isMenu?: boolean;
  label?: string;
  auth?: string;
  exact?: boolean;
}

const ConfigRoutes: IRouter[] = [
  {
    path: '/',
    exact: true,
    children: [
      { path: 'welcome', Component: BasicLayout, children: [{ index: true, element: <Home /> }] },
      {
        path: 'device',
        Component: BasicLayout,
        label: '设备',
        children: [
          {
            index: true,
            element: <Auth auth="device:list:read" children={<DeviceList />} />,
          },
          {
            path: 'list',
            label: '设备列表',
            element: <Auth auth="device:list:read" children={<DeviceList />} />,
          },
          {
            path: 'deviceModel',
            label: '设备型号',
            element: <Auth auth="model:list" children={<DeviceModelList />} />,
          },
          {
            path: 'deviceFirmware',
            label: '固件管理',
            element: <Auth auth="device:deviceFirmware:list:read" children={<DeviceFirmawre />} />,
          },
          {
            path: 'deviceBattery',
            label: '电池管理',
            element: <Auth auth="battery:list:read" children={<DeviceBattery />} />,
          },
        ],
      },
      {
        path: 'collector',
        Component: BasicLayout,
        label: '物联模组',
        children: [
          {
            index: true,
            element: <Auth auth="collector:list:read" replace />,
          },
          {
            path: 'list',
            label: '模组列表',
            element: <Auth auth="collector:list:read" children={<CollectorList />} />,
          },
          {
            path: 'collectorModel',
            label: '模组型号',
            element: <Auth auth="collector-model:list:read" children={<CollectorModalList />} />,
          },
          {
            path: 'deviceFirmware',
            label: '固件管理',
            element: <Auth auth="firmware:list:red" children={<ColectorFirmwareList />} />,
          },
        ],
      },
      {
        path: '',
        Component: BasicLayout,
        label: '账号管理',
        children: [
          {
            index: true,
            element: <Navigate to="/account-managemen/list" replace />,
          },
          {
            path: '/account-managemen/list',
            label: '账号管理',
            element: <Auth auth="account-managemen:list:red" children={<AccountUserList />} />,
          },
          {
            path: '/role/list',
            label: '用户角色',
            element: <Auth auth="role:list:red" children={<AccountRoleList />} />,
          },
          {
            path: '/notification/list',
            label: '通知列表',
            element: <Auth auth="notification:list:read" children={<NoticeList />} />,
          },
        ],
      },

      {
        path: '/*',
        Component: BasicLayout,
        children: [
          {
            index: true,
            element: <Home />,
          },
        ],
      },
    ],
  },
  {
    path: 'login',
    Component: UserLayout,
    children: [
      {
        index: true,
        element: <Login />,
      },
    ],
  },
  {
    path: '*',
    element: <Home />,
  },
];

export default ConfigRoutes;
