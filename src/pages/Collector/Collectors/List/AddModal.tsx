import React from 'react';
import { Modal, Form, Input, Button, Divider, Select } from 'antd';
import { useAddDevice, useCollectortSelectList } from './hooks';

interface IProps {
  open: boolean;
  onFinish: () => void;
  onCancel: () => void;
  children?: React.ReactNode;
}

const layoutCol = {
  labelCol: { span: 4 },
  wrapperCol: { span: 18 },
  autoComplete: 'off',
};

const Index: React.FC<IProps> = ({ open, onFinish, onCancel }) => {
  const { data } = useCollectortSelectList();
  const options = data?.data.map((v: any) => ({ label: v.name, value: v.id }));
  const { trigger, isMutating } = useAddDevice();

  const handleAdd = async (values: any) => {
    const model = data?.data.find((v: any) => v.id === values.model);
    const paylaod = {
      ...values,
      model: model,
    };
    await trigger(paylaod);
    onFinish();
  };

  return (
    <Modal
      footer={[
        <Button key={'1'} onClick={onCancel}>
          取消
        </Button>,
        <Button key={'2'} type="primary" loading={isMutating} form="addForm" htmlType="submit">
          提交
        </Button>,
      ]}
      title="创建模组"
      onCancel={onCancel}
      destroyOnClose={true}
      open={open}>
      <Divider />
      <Form name="addForm" onFinish={handleAdd} {...layoutCol}>
        <Form.Item
          label="sn"
          normalize={(value) => value.trim()}
          name="sn"
          rules={[
            { required: true, message: '请输入数采器sn' },
            {
              // 由数字字母组成
              pattern: /^[A-Za-z0-9]+$/,
              message: 'sn格式有误',
            },
          ]}>
          <Input maxLength={64} />
        </Form.Item>
        <Form.Item label="型号" name="model" rules={[{ required: true, message: '请选择型号' }]}>
          <Select size={'large'} placeholder="请选择型号" style={{ width: '100%' }} options={options} />
        </Form.Item>
        <Form.Item normalize={(value) => value.trim()} label="备注" name="remark">
          <Input.TextArea rows={2} maxLength={120} showCount placeholder="可选" />
        </Form.Item>
      </Form>
    </Modal>
  );
};
export default Index;
