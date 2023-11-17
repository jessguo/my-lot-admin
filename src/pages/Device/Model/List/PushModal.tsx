import React, { useEffect } from 'react';
import { Modal, Form, Input, Button, Divider, Select, notification } from 'antd';
import { useDeviceFirmawreList } from '@/hooks';
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
  const { isLoading, options, trigger: getSelect } = useDeviceFirmawreList();
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
      notification.success({
        message: '推送成功',
        description: response.message,
      });
    }
    onFinish();
  };

  useEffect(() => {
    if (info.id && open) {
      getSelect();
      form.setFieldValue('name', info.name);
      form.setFieldValue('id', info.id);
      form.setFieldValue('firmwareId', '');
    }
  }, [info, open]);

  return (
    <Modal
      footer={[
        <Button key={'1'} onClick={onCancel}>
          取消
        </Button>,
        <Button key={'2'} type="primary" loading={isMutating} form="pushFirmawre" htmlType="submit">
          提交
        </Button>,
      ]}
      title="固件推送"
      onCancel={onCancel}
      destroyOnClose={true}
      open={open}>
      <Divider />
      <Form preserve={false} form={form} name="pushFirmawre" onFinish={handleAdd} {...layoutCol}>
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
