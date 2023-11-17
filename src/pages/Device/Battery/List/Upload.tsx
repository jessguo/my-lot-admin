import React from 'react';
import { Modal, Form, Input, Button, Divider, Upload, UploadProps } from 'antd';
import { useAddDeviceBattery } from './hooks';
import { UploadOutlined } from '@ant-design/icons';

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
  const { trigger, isMutating } = useAddDeviceBattery();

  const handleAdd = async (values: any) => {
    const formData = new FormData() as any;
    formData.append('file', values.file[0].originFileObj);
    formData.append('remark', values.remark?.trim() || '');

    await trigger(formData);
    onFinish();
  };

  const normFile = (e: any) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };
  const props: UploadProps = {
    name: 'file',
    maxCount: 1,
    accept: '.xlsx,.xls,.csv',
    beforeUpload: (): boolean => {
      return false;
    },
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
      title="批量上传"
      onCancel={onCancel}
      destroyOnClose={true}
      open={open}>
      <Divider />
      <Form name="addForm" onFinish={handleAdd} {...layoutCol}>
        <Form.Item label="sn文件" name="file" rules={[{ required: true, message: '请选择文件' }]} valuePropName="list" getValueFromEvent={normFile}>
          <Upload {...props}>
            <Button icon={<UploadOutlined />}>上传文件</Button>
          </Upload>
        </Form.Item>
        <Form.Item normalize={(value) => value.trim()} label="备注" name="remark">
          <Input.TextArea rows={2} showCount maxLength={120} placeholder="可选" />
        </Form.Item>
      </Form>
    </Modal>
  );
};
export default Index;
