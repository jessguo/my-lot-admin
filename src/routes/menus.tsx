import { UserSwitchOutlined, MessageOutlined, HddOutlined, ApiOutlined, MehOutlined, UnorderedListOutlined, PlayCircleOutlined, CloudServerOutlined, DatabaseOutlined } from '@ant-design/icons';
import _ from 'lodash';
const menus: any = Object.freeze([
  {
    label: '设备',
    icon: <HddOutlined />,
    key: '/device',
    children: [
      {
        label: '设备列表',
        icon: <UnorderedListOutlined />,
        key: '/device/list',
        auth: 'device:list:read',
      },
      {
        label: '设备型号',
        icon: <PlayCircleOutlined />,
        key: '/device/deviceModel',
        auth: 'device-model:list:read',
      },
      {
        label: '固件管理',
        icon: <CloudServerOutlined />,
        key: '/device/deviceFirmware',
        auth: 'device-firmware:list:read',
      },
      {
        label: '电池管理',
        icon: <DatabaseOutlined />,
        key: '/device/deviceBattery',
        auth: 'battery:list:read',
      },
    ],
  },

  {
    label: '物联模组',
    icon: <ApiOutlined />,
    key: '/collector',

    children: [
      {
        label: '模组列表',
        icon: <UnorderedListOutlined />,
        key: '/collector/list',
        auth: 'collector:list:read',
      },
      {
        label: '模组型号',
        icon: <PlayCircleOutlined />,
        key: '/collector/collectorModel',
        auth: 'collector-model:list:read',
      },
      {
        label: '固件管理',
        icon: <CloudServerOutlined />,
        key: '/collector/deviceFirmware',
        auth: 'firmware:list:read',
      },
    ],
  },
  {
    label: '账号管理',
    icon: <MehOutlined />,
    key: '/account-managemen',
    children: [
      {
        label: '账号管理',
        icon: <UserSwitchOutlined />,
        key: '/account-managemen/list',
        auth: 'account-management:list:read',
      },
      {
        label: '用户角色',
        icon: <HddOutlined />,
        key: '/role/list',
        auth: 'role:list:read',
      },
      {
        label: '通知管理',
        icon: <MessageOutlined />,
        key: '/notification/list',
        auth: 'notification:list:read',
      },
    ],
  },
]);

export default menus;
