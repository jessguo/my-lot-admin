import { Layout, Row, Col } from 'antd';
import React from 'react';
import { Outlet } from 'react-router-dom';
import cls from './index.module.less';
import './index.css';
const { Content } = Layout;

const UserLayout: React.FC = () => {
  return (
    <div className={cls.userBg}>
      <div className={cls.inner}>
        <Layout>
          <Content>
            <Row style={{ height: '100%', background: '#fff' }}>
              <Col span={10}>
                <Outlet />
              </Col>
              <Col span={14} className={cls.wrap}>
                <div className="bg">
                  <div className="mountain">
                    <div className="mountain-top">
                      <div className="mountain-cap-1"></div>
                      <div className="mountain-cap-2"></div>
                      <div className="mountain-cap-3"></div>
                    </div>
                  </div>
                  <div className="mountain-two">
                    <div className="mountain-top">
                      <div className="mountain-cap-1"></div>
                      <div className="mountain-cap-2"></div>
                      <div className="mountain-cap-3"></div>
                    </div>
                  </div>
                  <div className="mountain-three">
                    <div className="mountain-top">
                      <div className="mountain-cap-1"></div>
                      <div className="mountain-cap-2"></div>
                      <div className="mountain-cap-3"></div>
                    </div>
                  </div>
                  {/* <div className="cloud"></div> */}
                </div>
              </Col>
            </Row>
          </Content>
        </Layout>
      </div>
    </div>
  );
};
export default UserLayout;
