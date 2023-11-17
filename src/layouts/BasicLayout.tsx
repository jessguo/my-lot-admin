import { useEffect, useState } from 'react';
import { Layout, Menu, theme, Row, Col, Badge, Avatar, Space } from 'antd';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import _ from 'lodash';
import type { MenuProps } from 'antd';
import useUser from '@/store/index';
import Header from '@/components/Header';
import styles from './index.module.less';
import menus from '@/routes/menus';
import { checkPermisson } from '@/utils/index';

// const test = [
//   'account:*',
//   '*:*',
//   'account:info:read',
//   'account:update',
//   'account-management:*:*',
//   'account-management:list:read',
//   'account-management:read',
//   'account-management:update',
//   'account-management:status:update',
//   'account-management:delete',
//   'account-management:bind-role:update',
//   'account-management:create',
//   'permission:*:*',
//   'permission:select-list:read',
//   'role:*:*',
//   'role:list:read',
//   'role:read',
//   'role:permission:read',
//   'role:bind-permission:update',
//   'role:create',
//   'role:update',
//   'role:select-list:read',
//   'role:delete',
//   'collector:*:*',
//   'collector:send-cmd:create',
//   'collector:firmware-upgrade:create',
//   'device:*:*',
//   'device:upgrade:create',
//   'device:send-cmd:create',
//   'device:firmware-upgrade:create',
//   'collector:*:*',
//   'collector:list:read',
//   'collector:create',
//   'collector:source-data-list:read',
//   'collector:firmware-upgrade-check:read',
//   'firmware:*:*',
//   'firmware:select-list:read',
//   'firmware:delete',
//   'firmware:upload:create',
//   'firmware:list:read',
//   'firmware:change-enable:update',
//   'collector-model:*:*',
//   'collector-model:select-list:read',
//   'collector-model:list:read',
//   'collector-model:upgrade-firmware:update',
//   'collector-model:unload-firmware:update',
//   'device:*:*',
//   'device:list:read',
//   'device:source-data-list:read',
//   'device:upgradeCheck:read',
//   'device:info:read',
//   'device:create',
//   'device:task-list:read',
//   'device:unbind-device:update',
//   'device-firmware:*:*',
//   'deviceFirmware:select-list:read',
//   'deviceFirmware:upload:create',
//   'device-firmware:list:read',
//   'device-firmware:delete',
//   'deviceFirmware:change-enable:update',
//   'device-model:*:*',
//   'device-model:list:read',
//   'device-model:select-list:read',
//   'device-model:upgrade-firmware:update',
//   'device-model:unload-firmware:update',
// ];

import logo from '@/assets/logo.png';
const { Content, Sider } = Layout;

const envName = import.meta.env.VITE_APP_ENV;
const isShow = envName !== 'production' && envName !== 'eu';

export default function BasicLayout() {
  const pathname = useLocation().pathname;
  const logout = useUser((state) => state.logout);
  const permissionStringList = useUser((state) => state.permissionStringList);

  const [openKeys, setOPenKeys] = useState(['']) as any;

  const showMensu = _.cloneDeep(menus)
    .map((item: any) => {
      if (item.children) {
        item.children = item.children.filter((v: any) => checkPermisson(v.auth, permissionStringList));
      }
      return item;
    })
    .filter((child: any) => child?.children?.length > 0);
  console.log('permissionStringList', permissionStringList, menus);

  const [collapsed, setCollapsed] = useState(false);

  const navigate = useNavigate();
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const handeLogout: MenuProps['onClick'] = ({ key }) => {
    // 重定登陆页面
    if (key === 'logout') {
      logout();
      // 页面重定向
      navigate('/login', { replace: true });
    }
  };
  const handleRouter = (e: any) => {
    navigate(e.key);
  };

  const header = (
    <Row justify={'center'}>
      <Col>
        <Space>
          <Avatar size={50} src={logo} />
          {!collapsed && <h1 style={{ color: '#fff' }}>IOT Admin</h1>}
        </Space>
      </Col>
    </Row>
  );
  const handleOpen = (openKeys: string[]) => {
    setOPenKeys(openKeys);
  };

  const defaultOpenKeys = '/' + pathname.split('/')[1];
  useEffect(() => {
    let p = defaultOpenKeys;
    if (['/role', '/account-managemen', '/notification'].includes(p)) {
      p = '/account-managemen';
    }
    setOPenKeys([p]);
  }, [defaultOpenKeys]);
  return (
    <Layout hasSider>
      <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
        {isShow ? (
          <Badge.Ribbon text={envName} color="pink">
            {header}
          </Badge.Ribbon>
        ) : (
          header
        )}
        <Menu theme="dark" selectedKeys={[pathname]} defaultSelectedKeys={[pathname]} openKeys={openKeys} defaultOpenKeys={openKeys} mode="inline" items={showMensu} onClick={handleRouter} onOpenChange={handleOpen} />
      </Sider>
      <Layout style={{ minWidth: '900px' }}>
        {/* <Breadcrumb style={{ margin: '8px 2px' }} items={breadcrumbs} /> */}
        <Header onLogout={handeLogout} />
        <Content className={styles.content} style={{ background: colorBgContainer }}>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
}
