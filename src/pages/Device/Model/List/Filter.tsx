import React from 'react';
import { Button, Row, Col } from 'antd';
import { UndoOutlined } from '@ant-design/icons';

interface FilterProps {
  onFinish: (v: any) => void;
}

const Index: React.FC<FilterProps> = ({ onFinish }) => {
  return (
    <Row align={'middle'} justify={'space-between'}>
      <Col flex={1}>
        <h4>型号列表</h4>
      </Col>
      <Col>
        <Button icon={<UndoOutlined />} onClick={onFinish} type="primary">
          刷新
        </Button>
      </Col>
    </Row>
  );
};
export default Index;
