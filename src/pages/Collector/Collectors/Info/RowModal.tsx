import React, { useEffect } from 'react';
import { Modal, Form, Input, Button, Divider, Select, InputNumber, Radio } from 'antd';
import { useSendRowCMD } from './hooks';

interface IProps {
  sn: string;
  open: boolean;
  onFinish: () => void;
  onCancel: () => void;
  children?: React.ReactNode;
}
const initialValues = {
  period: 60,
  base64: 1,
};
const options = [1, 2, 3, 4, 5].map((v) => ({
  label: `业务${v}`,
  value: v,
}));

const Index: React.FC<IProps> = ({ open, onFinish, onCancel, sn }) => {
  const [form] = Form.useForm();
  const { trigger, isMutating } = useSendRowCMD();
  const handSubmit = async (values: any) => {
    const response = await trigger({ ...values, sn: sn, cmd: 1000 });
    if (response?.isSuccess) {
      onFinish();
    }
  };
  useEffect(() => {
    if (open && open) {
      sn && form.setFieldValue('sn', sn);
    }
  }, [sn, open]);

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
      title="穿透命令"
      destroyOnClose={true}
      onCancel={onCancel}
      open={open}>
      <Divider />
      <Form preserve={false} form={form} name="updateForm" labelCol={{ span: 5 }} wrapperCol={{ span: 18 }} initialValues={initialValues} onFinish={handSubmit} autoComplete="off">
        <Form.Item label="sn" name="sn">
          <Input disabled={true} />
        </Form.Item>
        <Form.Item label="业务类型" name="type" rules={[{ required: true, message: '请选择业务类型' }]}>
          <Select size={'large'} placeholder="请选择业务类型" style={{ width: '100%' }} options={options} />
        </Form.Item>
        <Form.Item normalize={(value) => value.trim()} label="消息周期(s)" name="period" rules={[{ required: true, message: '请输入消息周期' }]}>
          <InputNumber step={1} style={{ width: '100%' }} min={0} />
        </Form.Item>
        <Form.Item label="Base64" name="base64" rules={[{ required: true, message: '请选择Base64' }]}>
          <Radio.Group>
            <Radio value={1}>是</Radio>
            <Radio value={2}>否</Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item normalize={(value) => value.trim()} label="消息内容" name="data" rules={[{ required: true, message: '请输入消息内容' }]}>
          <Input.TextArea showCount={true} rows={4} maxLength={256} />
        </Form.Item>
      </Form>
    </Modal>
  );
};
export default Index;
