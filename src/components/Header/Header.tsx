import React from 'react';
import { Avatar, Dropdown, Layout, Space, Row, Col } from 'antd';
import { LogoutOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import useUser from '@/store/index';

import avatar from '@/assets/avatar.png';

const headerStyle = {
  height: 36,
  lineHeight: '36px',
  backgroundColor: '#fefefe',
};

// 获取环境变量

const { Header } = Layout;

interface HeadProps extends Props {
  onLogout: MenuProps['onClick'];
}
const MyHeader: React.FC<HeadProps> = ({ onLogout }) => {
  const userInfo = useUser((state) => state.userInfo);

  const items = [
    {
      key: 'logout',
      icon: <LogoutOutlined />,
      label: '退出登录',
    },
  ];
  return (
    <Header style={headerStyle}>
      <Row justify={'space-between'}>
        <Col></Col>
        <Col>
          <Space>
            <Dropdown menu={{ items, onClick: onLogout }} placement="bottom">
              <Space>
                <a onClick={(e) => e.preventDefault()}>
                  <Avatar size={30} src={avatar} />
                </a>
                {userInfo.username}
              </Space>
            </Dropdown>
          </Space>
        </Col>
      </Row>
    </Header>
  );
};

export default MyHeader;
