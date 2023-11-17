import React, { useEffect, useState } from 'react';
import { Modal, Form, Input, Button, Divider, Select, Radio } from 'antd';
import { useCollectorUpdateFirmwarge } from './hooks';
import API, { Api } from '@/api/admin';

interface IProps {
  open: boolean;
  onFinish: () => void;
  onCancel: () => void;
  children?: React.ReactNode;
  info: any;
}

const initialValues = {
  force: '1',
};

const Index: React.FC<IProps> = ({ open, onFinish, onCancel, info }) => {
  const [form] = Form.useForm();

  const { trigger, isMutating } = useCollectorUpdateFirmwarge();
  const [options, setOptions] = useState([]);

  const handleSubmit = async (values: any) => {
    await trigger({ ...values, sn: info?.sn });
    onFinish();
  };
  const getData = async () => {
    const response = await API.post(Api.FIRMWARE_SELECT_LIST, {
      sn: info.sn,
      size: 999,
    });
    if (response.isSuccess) {
      if (response?.data) {
        const o = response.data.map((item: any) => ({
          value: item.id,
          label: item.name,
        }));
        setOptions(o);
      }
    }
  };

  useEffect(() => {
    if (info?.sn) {
      form.setFieldValue('sn', info?.sn);
      getData();
    }
  }, [info, open]);

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
      <Form preserve={false} initialValues={initialValues} form={form} name="updateForm" labelCol={{ span: 4 }} wrapperCol={{ span: 18 }} onFinish={handleSubmit} autoComplete="off">
        <Form.Item label="sn" name="sn">
          <Input maxLength={64} disabled={true} />
        </Form.Item>
        <Form.Item label="强制升级" name="force">
          <Radio.Group>
            <Radio value="1">是</Radio>
            <Radio value="2">否</Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item label="固件" name="firmwareId" rules={[{ required: true, message: '请选择' }]}>
          <Select size={'large'} placeholder="请选择" style={{ width: '100%' }} options={options} />
        </Form.Item>
      </Form>
    </Modal>
  );
};
export default Index;
