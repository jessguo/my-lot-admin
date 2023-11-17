import React, { useState } from 'react';
import { Modal, Form, Input, Button, Divider, Radio, Upload, UploadProps } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { useFilrmwareUpload } from './hooks';
import { getFileExtension } from '@/utils/index';

interface IProps {
  open: boolean;
  onFinish: () => void;
  onCancel: () => void;
  children?: React.ReactNode;
}
const initialValues = Object.freeze({
  enable: '1',
  type: 'ems',
});

const layoutCol = {
  labelCol: { span: 4 },
  wrapperCol: { span: 18 },
  autoComplete: 'off',
};

const Index: React.FC<IProps> = ({ open, onFinish, onCancel }) => {
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState<any>([]);

  const { trigger, isMutating } = useFilrmwareUpload();
  const [isTGZ, setIsTGZ] = useState(false);

  const props: UploadProps = {
    name: 'file',
    maxCount: 1,
    beforeUpload: (file): boolean => {
      const istgz = getFileExtension(file.name);
      setIsTGZ(istgz);
      setFileList([file]);
      return false;
    },
  };

  const handleSubmit = async (values: any) => {
    const formData = new FormData();
    formData.append('name', values.name?.trim());
    formData.append('type', values.type?.trim());
    formData.append('enable', values.enable);
    if (!isTGZ) {
      formData.append('md5', values.md5?.trim());
      formData.append('sha256', values.sha256?.trim());
      formData.append('version', values.version?.trim());
    }
    formData.append('remark', values.remark?.trim() || '');
    formData.append('file', fileList[0] as any);
    const response = await trigger(formData);
    if (response?.isSuccess) {
      onFinish();
    }
  };

  return (
    <Modal
      footer={[
        <Button key={'1'} onClick={onCancel}>
          取消
        </Button>,
        <Button key={'2'} type="primary" loading={isMutating} form="firmwareUpdate" htmlType="submit">
          提交
        </Button>,
      ]}
      title="上传固件"
      onCancel={onCancel}
      destroyOnClose={true}
      maskClosable={false}
      open={open}>
      <Divider />
      <Form preserve={false} initialValues={initialValues} form={form} name="firmwareUpdate" onFinish={handleSubmit} {...layoutCol}>
        <Form.Item normalize={(value) => value.trim()} label="固件名称" name="name" rules={[{ required: true, message: '请输入固件名称' }]}>
          <Input placeholder="输入固件名称" maxLength={30} />
        </Form.Item>
        <Form.Item label="固件类型" name="type" rules={[{ required: true, message: '请选择固件类型' }]}>
          <Radio.Group disabled={true}>
            <Radio value="ems">EMS</Radio>
            <Radio value="pcs">PCS</Radio>
          </Radio.Group>
        </Form.Item>

        <Form.Item label="默认启用" name="enable" rules={[{ required: true, message: '请选择' }]}>
          <Radio.Group>
            <Radio value="1">启用</Radio>
            <Radio value="2">禁用</Radio>
          </Radio.Group>
        </Form.Item>

        <Form.Item label="固件文件" name="file" rules={[{ required: true, message: '请上传文件' }]}>
          <Upload {...props}>
            <Button icon={<UploadOutlined />}>Click to Upload</Button>
          </Upload>
        </Form.Item>
        {!isTGZ && (
          <Form.Item normalize={(value) => value.trim()} label="版本号" name="version" rules={[{ required: true, message: '请输入版本号' }]}>
            <Input placeholder="eg. 1.0.0" maxLength={30} />
          </Form.Item>
        )}

        {!isTGZ && (
          <Form.Item
            label="md5"
            name="md5"
            rules={[
              { required: true, message: '请输入md5' },
              { min: 32, message: 'MD5长度应为32位' },
              { max: 32, message: 'MD5长度应为32位' },
            ]}>
            <Input.TextArea rows={2} placeholder="固件md5" />
          </Form.Item>
        )}

        {!isTGZ && (
          <Form.Item
            label="sha256"
            name="sha256"
            rules={[
              { required: true, message: '请输入sha256' },
              { min: 64, message: 'SHA256长度应为64位' },
              { max: 64, message: 'SHA256长度应为64位' },
            ]}>
            <Input.TextArea rows={2} placeholder="固件sha256" />
          </Form.Item>
        )}

        <Form.Item normalize={(value) => value.trim()} label="备注信息" name="remark">
          <Input.TextArea rows={2} maxLength={60} placeholder="备注信息" />
        </Form.Item>
      </Form>
    </Modal>
  );
};
export default Index;
