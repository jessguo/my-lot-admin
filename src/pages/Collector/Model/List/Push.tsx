import React, { useEffect } from 'react';
import { Modal, Form, Input, Button, Divider, Select, message } from 'antd';
import { useFirmwareSelectList } from '@/hooks';
import { useUpgradeFireware } from './hooks';

interface IProps {
  open: boolean;
  onFinish: () => void;
  onCancel: () => void;
  children?: React.ReactNode;
  info: any;
}

const layoutCol = {
  labelCol: { span: 4 },
  wrapperCol: { span: 18 },
  autoComplete: 'off',
};

const Index: React.FC<IProps> = ({ open, onFinish, onCancel, info }) => {
  const { options, isLoading, trigger: getSelectList } = useFirmwareSelectList();
  const [form] = Form.useForm();

  const { trigger, isMutating } = useUpgradeFireware();

  const handleAdd = async (values: any) => {
    const paylaod = {
      id: values.id,
      firmwareId: values.firmwareId,
      force: '1',
    };
    const response = await trigger(paylaod);
    if (response?.isSuccess) {
      message.success('上传成功');
    }
    onFinish();
  };

  useEffect(() => {
    if (info.id && open) {
      getSelectList();
      form.setFieldValue('name', info.name);
      form.setFieldValue('id', info.id);
    }
  }, [info, open]);

  return (
    <Modal
      footer={[
        <Button key={'1'} onClick={onCancel}>
          取消
        </Button>,
        <Button key={'submit'} type="primary" form="firmwarePush" htmlType="submit" loading={isMutating}>
          提交
        </Button>,
      ]}
      title="固件推送"
      onCancel={onCancel}
      destroyOnClose={true}
      open={open}>
      <Divider />
      <Form preserve={false} form={form} name="firmwarePush" onFinish={handleAdd} {...layoutCol}>
        <Form.Item label="型号名称" name="name">
          <Input disabled={true} />
        </Form.Item>
        <Form.Item label="型号ID" name="id">
          <Input disabled={true} />
        </Form.Item>
        <Form.Item label="固件" name="firmwareId" rules={[{ required: true, message: '请选择固件' }]}>
          <Select loading={isLoading} size={'large'} placeholder="请选择固件" style={{ width: '100%' }} options={options} />
        </Form.Item>
      </Form>
    </Modal>
  );
};
export default Index;
