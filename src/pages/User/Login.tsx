import React, { useState } from 'react';
import { Form, Input, Button, Space, Row, Col } from 'antd';
import { useNavigate } from 'react-router-dom';
import cls from './index.module.less';
import useStore from '@/store/index';
import { useInterval } from 'ahooks';
import { checkPermisson } from '@/utils/index';

import logo from '@/assets/logo.png';
import { useGetCaptrue, useReset, useLogin } from './hooks';
import { useForm } from 'antd/es/form/Form';
const wrapperCol = {
  offset: 6,
  span: 18,
};
interface IProps {
  onChange: () => void;
}
const Index = () => {
  const [showLogin, setShowLogin] = useState(true);

  const Login: React.FC<IProps> = ({ onChange }) => {
    const { trigger: submitLogin, isMutating } = useLogin();
    const navigate = useNavigate();
    const login = useStore((state) => state.login);

    const onFinish = async (values: any) => {
      const response = await submitLogin(values);
      if (response?.isSuccess) {
        login(response);
        const permissionStringList = response?.data?.permissionList
          .map((item: any) => item.mpResourceName)
          .filter((v: string) => v.startsWith('mprn:iot-admin'))
          .map((v: string) => v.replace('mprn:iot-admin:', ''));

        if (checkPermisson('device:list:read', permissionStringList)) {
          navigate('/device/list');
        } else {
          navigate('/welcome');
        }
      }
    };
    return (
      <Form name="basic" labelCol={{ span: 6 }} wrapperCol={{ span: 18 }} className={cls.formStyles} autoComplete="true" onFinish={onFinish}>
        <Form.Item
          label="用户名"
          normalize={(value) => value.trim()}
          name="username"
          validateTrigger="onBlur" // 在这里设置校验时机
          rules={[
            { required: true, message: '请输入用户名' },
            { type: 'email', message: '邮箱格式错误' },
          ]}>
          <Input placeholder="请输入用户名" />
        </Form.Item>

        <Form.Item normalize={(value) => value.trim()} label="密码" name="password" rules={[{ required: true, message: '请输入密码' }]}>
          <Input.Password placeholder="请输入密码" />
        </Form.Item>
        <Form.Item normalize={(value) => value.trim()} wrapperCol={wrapperCol}>
          <Row justify={'space-between'}>
            <Button loading={isMutating} type="primary" htmlType="submit">
              登录
            </Button>
            <Button onClick={onChange} type="link">
              忘记密码
            </Button>
          </Row>
        </Form.Item>
      </Form>
    );
  };

  const Reset: React.FC<IProps> = ({ onChange }) => {
    const { trigger: getCaptrue, isMutating: isCaping } = useGetCaptrue();
    const { trigger: restPassword, isMutating: isLoading } = useReset();
    const [count, setCount] = useState(60);
    const [running, setRunning] = useState<boolean>(false);
    const [form] = useForm();
    const handleGetGap = async () => {
      const isVal = await form.validateFields(['username']);
      if (isVal) {
        const username = form.getFieldValue('username')?.trim();
        await getCaptrue({ username });
        setRunning(true);
      }
    };
    useInterval(
      () => {
        if (count <= 1) {
          setRunning(false);
          setCount(60);
        } else {
          setCount(count - 1);
        }
      },
      running ? 1000 : undefined,
    );

    const onFinish = async (values: any) => {
      // 获取表单数据
      const response = await restPassword(values);
      if (response?.isSuccess) {
        onChange();
      }
    };

    return (
      <Form form={form} name="rest" labelCol={{ span: 6 }} wrapperCol={{ span: 18 }} className={cls.formStyles} autoComplete="true" onFinish={onFinish}>
        <Form.Item
          normalize={(value) => value.trim()}
          label="用户名"
          name="username"
          validateTrigger="onBlur" // 在这里设置校验时机
          rules={[
            { required: true, message: '请输入用户名' },
            { type: 'email', message: '邮箱格式错误' },
          ]}>
          <Input maxLength={64} placeholder="请输入用户名" />
        </Form.Item>

        <Form.Item normalize={(value) => value.trim()} label="密码" name="password" rules={[{ required: true, message: '请输入密码' }]}>
          <Input.Password />
        </Form.Item>
        <Form.Item label="验证码">
          <Row gutter={8}>
            <Col span={16}>
              <Form.Item normalize={(value) => value.trim()} name="captcha" noStyle rules={[{ required: true, message: '请输入验证码' }]}>
                <Input placeholder="请输入密码" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Button loading={isCaping} onClick={handleGetGap} type="primary" disabled={running}>
                {!running ? '验证码' : `${count}s`}
              </Button>
            </Col>
          </Row>
        </Form.Item>

        <Form.Item wrapperCol={wrapperCol}>
          <Row justify={'space-between'}>
            <Button loading={isLoading} type="primary" htmlType="submit">
              重制密码
            </Button>
            <Button onClick={onChange} type="link">
              返回登陆
            </Button>
          </Row>
        </Form.Item>
      </Form>
    );
  };

  return (
    <div className={cls.loginBox}>
      <Space>
        <img className={cls.logoPng} src={logo} alt="logo" />
        <h2>MangoPower Admin</h2>
      </Space>
      {showLogin ? <Login onChange={() => setShowLogin((pre) => !pre)} /> : <Reset onChange={() => setShowLogin((pre) => !pre)} />}
    </div>
  );
};
export default Index;
