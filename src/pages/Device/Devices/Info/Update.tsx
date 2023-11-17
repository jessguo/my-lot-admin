import React, { useEffect } from 'react';
import { Modal, Form, Input, Button, Divider, Select } from 'antd';
import { useDeviceFirmawreList } from '@/hooks';
import { useUpdateFirmwarge } from './hooks';

interface IProps {
  sn: string;
  open: boolean;
  onFinish: () => void;
  onCancel: () => void;
  children?: React.ReactNode;
}

const Index: React.FC<IProps> = ({ open, onFinish, onCancel, sn }) => {
  const [form] = Form.useForm();
  //

  const { trigger, isMutating } = useUpdateFirmwarge();
  const { options, isLoading, trigger: getSelectList } = useDeviceFirmawreList();

  const handleAdd = async (values: any) => {
    await trigger({ ...values, sn });
    onFinish();
  };

  useEffect(() => {
    if (open) {
      getSelectList();
      form.setFieldValue('sn', sn);
    }
  }, [open]);

  return (
    <Modal
      footer={[
        <Button key={'1'} onClick={onCancel}>
          取消
        </Button>,
        <Button key={'2'} type="primary" loading={isMutating} form="updateForm" htmlType="submit">
          提交
        </Button>,
      ]}
      title="固件升级"
      destroyOnClose={true}
      onCancel={onCancel}
      open={open}>
      <Divider />
      <Form preserve={false} form={form} name="updateForm" labelCol={{ span: 4 }} wrapperCol={{ span: 18 }} initialValues={{ remember: true }} onFinish={handleAdd} autoComplete="off">
        <Form.Item label="sn" name="sn">
          <Input disabled={true} />
        </Form.Item>
        <Form.Item label="固件" name="firmwareId" rules={[{ required: true, message: '请选择' }]}>
          <Select loading={isLoading} size={'large'} placeholder="请选择" style={{ width: '100%' }} options={options} />
        </Form.Item>
      </Form>
    </Modal>
  );
};
export default Index;
