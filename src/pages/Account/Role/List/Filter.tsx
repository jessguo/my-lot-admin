import React from 'react';
import { Form, Input, Button, Row, Col, Space } from 'antd';
import { EditOutlined, PlusOutlined } from '@ant-design/icons';
// import { Filters } from '@/api/devcie';
import AuthButton from '@/components/AuthButton';

interface FilterProps {
  onFinish: (v: any) => void;
  onAdd: () => void;
  onRest: () => void;
}

const Index: React.FC<FilterProps> = ({ onFinish, onAdd, onRest }) => {
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
              <Form.Item name="name">
                <Input prefix={<EditOutlined />} placeholder="请输入角色名" allowClear />
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
        <AuthButton auth="role:create" icon={<PlusOutlined />} onClick={onAdd} type="primary" htmlType="submit">
          创建
        </AuthButton>
      </Col>
    </Row>
  );
};
export default Index;
