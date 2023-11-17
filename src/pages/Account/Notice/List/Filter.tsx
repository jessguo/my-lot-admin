import React from 'react';
import { Form, Input, Button, Row, Col, Space } from 'antd';

interface FilterProps {
  onFinish: (v: any) => void;
  onAdd?: () => void;
  onRest: () => void;
}

const Index: React.FC<FilterProps> = ({ onFinish, onRest }) => {
  const [form] = Form.useForm();
  const handleSubmit = (values: any) => {
    onFinish(values);
  };

  const handleReset = () => {
    form.resetFields();
    onRest();
  };
  return (
    <Row justify={'space-between'}>
      <Col flex={1}>
        <Form form={form} onFinish={handleSubmit}>
          <Row gutter={16}>
            <Col span={4}>
              <Form.Item name="status">
                <Input placeholder="status" allowClear />
              </Form.Item>
            </Col>
            <Col span={4}>
              <Form.Item name="messageType">
                <Input placeholder="messageType" allowClear />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item shouldUpdate>
                {() => (
                  <Space>
                    <Button onClick={handleReset}>重置</Button>
                    <Button type="primary" htmlType="submit">
                      查找
                    </Button>
                  </Space>
                )}
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Col>
      <Col></Col>
    </Row>
  );
};
export default Index;
