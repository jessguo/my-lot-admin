import React from 'react';
import { Switch, SwitchProps } from 'antd';
import { hasPermission } from '@/utils/index';

interface Iprops extends SwitchProps {
  auth: string;
}
const Index: React.FC<Iprops> = ({ auth, ...rest }) => {
  const isAuth = hasPermission(auth);
  return <Switch {...rest} disabled={!isAuth} />;
};

export default Index;
