import { createBrowserRouter } from 'react-router-dom';
import ConfigRoutes, { IRouter } from './routes';
import { hasPermission } from '@/utils/index';

/**
 *
 * @param pathname
 * @returns {string[]}
 */
export const getPathNameToArrary = (pathname: string) => {
  const pathArr = pathname
    .split('/')
    .filter((item) => item)
    .map((v) => `${v}`);
  return pathArr;
};

// 根据routes生成menu
const getLayoutMenus = (routes: IRouter[]) => {
  const root = routes.find((t: IRouter) => t.path === '/')?.children!;
  const lays = root.filter((children: any) => children.isMenu);
  return lays.map((r: any) => ({
    key: `/${r.path}`,
    label: r.label,
    icon: r.icon || false,
  }));
};
export const getMenus = (permissionStringList: string[]) => {
  const lefMap = new Map();

  permissionStringList.forEach((v) => {
    const lef = v.split(':')[0];
    lefMap.set(lef, lef);
  });
  const root = ConfigRoutes.find((t: IRouter) => t.path === '/')?.children!;
  const lays = root.filter((children: any) => children.isMenu);
  const routeMenus = lays.map((r: any) => ({
    key: `/${r.path}`,
    label: r.label,
    icon: r.icon || false,
    auth: r.auth,
    children: r.children
      ?.filter((v: any) => v.path)
      ?.map((v: any) => ({
        key: `/${r.path}/${v.path}`,
        label: v.label,
        auth: v.auth,
        icon: v.icon || false,
      })),
  }));
  const routeMenusAuth = routeMenus.filter((item) => {
    item.children = item.children?.filter((v: any) => {
      return hasPermission(v.auth);
    });
    return lefMap.has('*') || lefMap.has(item.auth);
  });
  return routeMenusAuth;
};

export const getBusinessMenus = (routerPath = 'device') => {
  const root = ConfigRoutes.find((t: IRouter) => t.path === '/')?.children!;
  const lay = root.find((children: any) => children.path === routerPath);
  const layChildren = lay?.children?.filter((v) => v.path);
  const menus = layChildren?.map((r: any) => ({
    key: `${r.path}`,
    label: r.label,
    icon: r.icon || false,
  }));
  return menus;
};

// export const flatRouters = (root: any) => {
//   function getPath(obj: any, prefix = ''): any {
//     let paths = [];

//     if (Array.isArray(obj)) {
//       obj.forEach((child) => {
//         paths.push(...getPath(child, prefix));
//       });
//     } else if (typeof obj === 'object') {
//       const { path, children } = obj;
//       const newPrefix = path ? `${prefix}:${path}` : prefix;

//       if (children) {
//         paths.push(...getPath(children, newPrefix));
//       } else if (path) {
//         paths.push(newPrefix);
//       }
//     }
//     return paths;
//   }
//   const rootChildren = root.find((t: IRouter) => t.path === '/')?.children!;
// };
//
// export const
// 获取第一层路由
export const layoutMenus = getLayoutMenus(ConfigRoutes);

export default createBrowserRouter(ConfigRoutes as any);
