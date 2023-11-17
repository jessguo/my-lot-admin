import React, { Fragment } from 'react';
import { Navigate } from 'react-router-dom';
import useUser from '@/store/index';
import { checkPermisson } from '@/utils/index';

interface Iprops extends React.PropsWithChildren<any> {
  auth: string;
}
const Auth: React.FC<Iprops> = ({ auth, children }) => {
  const permissionStringList = useUser((state) => state.permissionStringList);
  const token = useUser((state) => state.token);
  const isLogin = Boolean(token);
  const hasAuth = checkPermisson(auth, permissionStringList);
  const hasAllow = hasAuth && isLogin;
  // 没有登陆 做拦截
  if (hasAllow) {
    return <Fragment>{children}</Fragment>;
  }
  return <Navigate to="/login" state={{ from: location }} />;
};

export default Auth;
