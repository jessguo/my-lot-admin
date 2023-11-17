import React from 'react';
import { hasPermission } from '@/utils/index';

// const prefix = 'mprn:app:';

interface Iprops extends Props {
  auth: string;
}
const Index: React.FC<Iprops> = ({ auth, children }) => {
  const isAuth = hasPermission(auth);

  return isAuth ? <>{children}</> : <></>;
};

export default Index;
