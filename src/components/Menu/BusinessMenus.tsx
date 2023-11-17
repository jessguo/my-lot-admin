import React, { useEffect, useState } from 'react';
import { Menu } from 'antd';
import type { MenuProps } from 'antd';
import { useNavigate, useLocation } from 'react-router-dom';
import { getPathNameToArrary, getBusinessMenus } from '@/routes/index';

const Index: React.FC = () => {
  const navigate = useNavigate();
  const pathname = useLocation().pathname;
  const [businessMenus, setBusinessMenus] = useState([]);
  const [path, setPath] = useState('device');

  const handleRouter: MenuProps['onClick'] = (e) => {
    navigate(e.key);
  };

  useEffect(() => {
    const pathArr = getPathNameToArrary(pathname);
    const layout = pathArr[0];
    const layoutName = layout;
    if (layoutName) {
      const businessMenus = getBusinessMenus(layoutName)?.filter((v) => v.icon);
      const menuPath = pathArr[1];
      setBusinessMenus(businessMenus as any);
      setPath(menuPath);
    }
  }, [pathname]);

  return <Menu theme="light" selectedKeys={[path]} items={businessMenus} onClick={handleRouter} />;
};

export default Index;
