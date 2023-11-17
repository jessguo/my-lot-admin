import React, { useEffect, useState } from 'react';
import { Menu } from 'antd';
import type { MenuProps } from 'antd';
import { useNavigate, useLocation } from 'react-router-dom';
import { layoutMenus, getPathNameToArrary } from '@/routes/index';

const Index: React.FC = () => {
  const navigate = useNavigate();
  const pathname = useLocation().pathname;
  const [path, setPath] = useState('device');

  const handleRouter: MenuProps['onClick'] = (e) => {
    navigate(e.key);
  };

  useEffect(() => {
    const pathArr = getPathNameToArrary(pathname);
    if (pathArr[0]) {
      const menu = `/${pathArr[0]}`;
      setPath(menu);
    }
  }, [pathname]);

  return <Menu theme="light" mode="horizontal" selectedKeys={[path]} items={layoutMenus} onClick={handleRouter} />;
};

export default Index;
