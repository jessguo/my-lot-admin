import React, { useEffect, useState } from 'react';
import { Modal, Form, Input, Button, Divider, Select, Spin } from 'antd';
import { useEditUser, userCreateUser } from './hooks';
import API, { Api } from '@/api/admin';

interface IProps {
  open: boolean;
  onFinish: () => void;
  onCancel: () => void;
  children?: React.ReactNode;
  userId: string | null;
  roleOptions: any[];
}

const layoutCol = {
  labelCol: { span: 4 },
  wrapperCol: { span: 18 },
  autoComplete: 'off',
};

const Index: React.FC<IProps> = ({ open, onFinish, onCancel, userId, roleOptions }) => {
  const [form] = Form.useForm();
  // const { trigger: getInfo, data } = useUserInfo(userId || '');
  // const [data, setData] = useState({});
  // console.log('data', data);
  const [spinning, setSpinning] = useState(false);
  const { trigger: create, isMutating: loading } = userCreateUser();
  const { trigger: edit, isMutating } = useEditUser();

  const handleAdd = async (values: any) => {
    const paylaod = {
      ...values,
    };
    const response = userId ? await edit({ ...paylaod, id: userId }) : await create({ ...paylaod });
    if (response?.isSuccess) {
      onFinish();
    }
  };
  const getInfo = async (params: any) => {
    setSpinning(true);
    const response = await API.post(Api.ACCOUNT_MANAGEMENT_READ, params);
    setSpinning(false);
    if (response?.isSuccess) {
      const info = response?.data;
      form.setFieldValue('name', info.name);
      form.setFieldValue('username', info.username);
      form.setFieldValue('nickname', info.nickname);
      form.setFieldValue('roleIds', info.roleIds);
      form.setFieldValue('remark', info.remark);
    }
  };

  useEffect(() => {
    if (open && userId) {
      getInfo({ id: userId });
    }
  }, [open, userId]);

  return (
    <Modal
      footer={[
        <Button key={'1'} onClick={onCancel}>
          取消
        </Button>,
        <Button loading={isMutating || loading} key="submit" type="primary" form="userForm" htmlType="submit">
          提交
        </Button>,
      ]}
      title={userId ? '编辑用户' : '创建用户'}
      onCancel={onCancel}
      destroyOnClose={true}
      maskClosable={false}
      open={open}>
      <Divider />
      <Spin spinning={spinning}>
        <Form preserve={false} name="userForm" onFinish={handleAdd} {...layoutCol} form={form}>
          <Form.Item normalize={(value) => value.trim()} label="用户名称" name="name">
            <Input maxLength={64} />
          </Form.Item>
          <Form.Item normalize={(value) => value.trim()} label="用户昵称" name="nickname" rules={[{ required: true, message: '请输入用户名称' }]}>
            <Input maxLength={64} />
          </Form.Item>
          <Form.Item
            label="用户账号"
            name="username"
            normalize={(value) => value.trim()}
            rules={[
              { required: true, message: '请输入username' },
              { type: 'email', message: '邮箱格式不正确' },
            ]}>
            <Input maxLength={64} disabled={!!userId} />
          </Form.Item>

          <Form.Item label="角色" name="roleIds" rules={[{ required: true, message: '请选择角色' }]}>
            <Select mode="multiple" size={'large'} placeholder="请选择角色" style={{ width: '100%' }} options={roleOptions} />
          </Form.Item>
          <Form.Item normalize={(value) => value.trim()} label="备注" name="remark">
            <Input.TextArea rows={2} maxLength={120} showCount placeholder="可选" />
          </Form.Item>
        </Form>
      </Spin>
    </Modal>
  );
};
export default Index;
