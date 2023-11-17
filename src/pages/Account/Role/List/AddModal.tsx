import React, { useEffect } from 'react';
import { Modal, Form, Input, Button, Divider, Select } from 'antd';
import { userEditRole, useAddRole, useRoleInfo, usePermissionList } from './hooks';

interface IProps {
  open: boolean;
  onFinish: () => void;
  onCancel: () => void;
  children?: React.ReactNode;
  roleId: string | null;
}

const layoutCol = {
  labelCol: { span: 4 },
  wrapperCol: { span: 18 },
  autoComplete: 'off',
};

const Index: React.FC<IProps> = ({ open, onFinish, onCancel, roleId }) => {
  const [form] = Form.useForm();
  const { trigger: edit, isMutating: isEditing } = userEditRole();
  const { trigger: create, isMutating: isAdding } = useAddRole();
  const { data: perData } = usePermissionList();
  const options = perData?.data.map((item: any) => ({
    label: item.name || item.mpResourceName,
    value: item.id,
  }));

  const { data, trigger: getInfo, reset } = useRoleInfo();

  const handleAdd = async (values: any) => {
    const response = await (roleId ? edit({ id: roleId, ...values }) : create(values));
    if (response?.isSuccess) {
      onFinish();
    }
  };

  useEffect(() => {
    if (open && roleId) {
      getInfo({ id: roleId });
    } else {
      reset();
    }
  }, [open, roleId]);

  useEffect(() => {
    if (data?.data && open && roleId) {
      form.setFieldValue('name', data.data?.name);
      form.setFieldValue('remark', data.data?.remark);
      form.setFieldValue('id', data.data?.id);
      form.setFieldValue('permissionIds', data.data?.permissionIds);
      form.setFieldValue('description', data.data?.description);
      form.setFieldValue('remark', data.data?.remark);
    }
  }, [data?.data, open, roleId]);

  // useEffect(())
  return (
    <Modal
      footer={[
        <Button key={'1'} onClick={onCancel}>
          取消
        </Button>,
        <Button disabled={!!roleId && data?.data?.type === 2} key="submit" loading={isEditing || isAdding} type="primary" form="addForm" htmlType="submit">
          提交
        </Button>,
      ]}
      title={roleId ? '编辑角色' : '创建角色'}
      onCancel={onCancel}
      width={900}
      destroyOnClose={true}
      open={open}>
      <Divider />
      <Form disabled={!!roleId && data?.data?.type === 2} preserve={false} form={form} name="addForm" onFinish={handleAdd} {...layoutCol}>
        <Form.Item normalize={(value) => value.trim()} label="name" name="name" rules={[{ required: true, message: '请输入角色' }]}>
          <Input maxLength={64} />
        </Form.Item>
        <Form.Item label="权限列表" name="permissionIds" rules={[{ required: true, message: '请选择权限列表' }]}>
          <Select mode="multiple" filterOption={(input, option) => (option?.label ?? ('' as any)).includes(input)} options={options} />
        </Form.Item>
        <Form.Item normalize={(value) => value.trim()} label="描述" name="description">
          <Input.TextArea rows={2} maxLength={120} showCount placeholder="可选" />
        </Form.Item>
        <Form.Item normalize={(value) => value.trim()} label="备注" name="remark">
          <Input.TextArea rows={2} maxLength={120} showCount placeholder="可选" />
        </Form.Item>
      </Form>
    </Modal>
  );
};
export default Index;
