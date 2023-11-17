import React from 'react';
import { Button, ButtonProps } from 'antd';
import { hasPermission } from '@/utils/index';

interface Iprops extends ButtonProps {
  auth: string;
}
const Index: React.FC<Iprops> = ({ auth, disabled, ...rest }) => {
  const isAuth = hasPermission(auth);
  return <Button {...rest} disabled={!isAuth || disabled} />;
};

export default Index;
