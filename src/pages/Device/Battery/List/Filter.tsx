import React from 'react';
import { Row, Col, Space, Form, Input, Button } from 'antd';

// import AuthButton from '@/components/AuthButton';
interface FilterProps {
  onRest: () => void;
  onFinish?: (v: any) => void;
  onUpload: any;
}

const Index: React.FC<FilterProps> = ({ onRest, onFinish }) => {
  const [form] = Form.useForm();

  const handleSubmit = (values: any) => {
    onFinish && onFinish(values);
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
              <Form.Item normalize={(value) => value.trim()} name="sn">
                <Input placeholder="请输入sn" allowClear />
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
      <Col>
        {/* <AuthButton auth="battery:import:create" onClick={onUpload} type="primary">
          上传电池
        </AuthButton> */}
      </Col>
    </Row>
  );
};
export default Index;
