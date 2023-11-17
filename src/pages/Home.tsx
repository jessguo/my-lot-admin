import { Result } from 'antd';
import React from 'react';
import { SmileOutlined } from '@ant-design/icons';

const Index: React.FC<{}> = () => {
  return <Result icon={<SmileOutlined />} title="Great, welcome!" />;
};

export default Index;
