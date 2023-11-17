import React from 'react';
import { Button, Row, Col, Space } from 'antd';
import { UndoOutlined } from '@ant-design/icons';
import AuthButton from '@/components/AuthButton';
interface FilterProps {
  onUpload: () => void;
  onFinish: (v: any) => void;
}

const Index: React.FC<FilterProps> = ({ onFinish, onUpload }) => {
  return (
    <Row justify={'space-between'} align={'middle'}>
      <Col flex={1}>
        <h4>固件列表</h4>
      </Col>
      <Col>
        <Space>
          <AuthButton auth="device-firmware:upload:create" onClick={onUpload} type="primary">
            上传固件
          </AuthButton>
          <Button icon={<UndoOutlined />} onClick={onFinish} type="primary"></Button>
        </Space>
      </Col>
    </Row>
  );
};
export default Index;
