import React, { useEffect } from 'react';
import { Form, Input, Button, Row, Col, Select, Space } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import { selectOptions } from '../config';
import AuthButton from '@/components/AuthButton';
import { useDownload } from './hooks';

interface FilterProps {
  onFinish: (v: any) => void;
  onAdd: () => void;
  onRest: () => void;
  filter: any;
  show: boolean;
  onAddList: () => void;
}

const Index: React.FC<FilterProps> = ({ onFinish, onRest, filter, show }) => {
  const [form] = Form.useForm();
  const { trigger, isMutating } = useDownload();

  const handleSubmit = (values: any) => {
    onFinish(values);
  };

  const handleReset = () => {
    form.resetFields();
    onRest();
  };

  const handleDownLoad = () => {
    const values = form.getFieldsValue();

    trigger({
      filters: values,
    });
  };

  useEffect(() => {
    if (filter && !show) {
      form.setFieldsValue({ ...filter });
    }
  }, [filter, show]);
  return (
    <Row justify={'space-between'}>
      <Col flex={1}>
        <Form form={form} onFinish={handleSubmit}>
          <Row gutter={16}>
            <Col span={4}>
              <Form.Item name="sn" normalize={(value) => value.trim()}>
                <Input prefix={<EditOutlined />} placeholder="请输入sn" allowClear />
              </Form.Item>
            </Col>
            <Col span={4}>
              <Form.Item name="status">
                <Select allowClear options={selectOptions} placeholder="请选择在线状态" />
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
        {/* <AuthButton auth="collector:create" onClick={onAdd} type="primary">
          新增
        </AuthButton>
        <AuthButton auth="collector:create" onClick={onAddList} type="link">
          批量新增
        </AuthButton> */}
        <AuthButton loading={isMutating} auth="collector:export:read" onClick={handleDownLoad} type="link">
          下载
        </AuthButton>
      </Col>
    </Row>
  );
};
export default Index;
