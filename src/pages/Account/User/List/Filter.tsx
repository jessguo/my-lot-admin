import React, { useEffect } from 'react';
import { Form, Input, Button, Row, Col, Select, Space } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

import AuthButton from '@/components/AuthButton';

interface FilterProps {
  onFinish: (v: any) => void;
  onAdd: () => void;
  roleOptions: any[];
  onRest: () => void;
  filter: any;
}

const Index: React.FC<FilterProps> = ({ onFinish, onAdd, roleOptions, onRest, filter }) => {
  const [form] = Form.useForm();
  const handleSubmit = (values: any) => {
    onFinish({ ...values });
  };

  const handleReset = () => {
    form.resetFields();
    onRest();
  };

  useEffect(() => {
    form.resetFields();
    form.setFieldsValue(filter);
  }, [filter]);

  return (
    <Row justify={'space-between'}>
      <Col flex={1}>
        <Form form={form} onFinish={handleSubmit}>
          <Row gutter={16}>
            <Col span={4}>
              <Form.Item name="name" label="名称">
                <Input placeholder="请输入名称" allowClear />
              </Form.Item>
            </Col>
            <Col span={4}>
              <Form.Item name="nickname" label="昵称">
                <Input placeholder="请输入名称" allowClear />
              </Form.Item>
            </Col>
            <Col span={4}>
              <Form.Item name="username" label="用户账号">
                <Input placeholder="请输邮箱" allowClear />
              </Form.Item>
            </Col>
            <Col span={4}>
              <Form.Item name="roleIds">
                <Select mode="multiple" allowClear options={roleOptions} placeholder="请选择角色" />
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
        <AuthButton auth="account-management:create" icon={<PlusOutlined />} onClick={onAdd} type="primary">
          创建
        </AuthButton>
      </Col>
    </Row>
  );
};
export default Index;
