import useUser from '@/store/index';
export function getFileExtension(filename: string) {
  const validExtensions = ['.tar.gz', '.tgz'];
  const extension = filename.slice(-7).toLowerCase();

  // 检查文件名是否以合法扩展名结尾
  for (const validExtension of validExtensions) {
    if (extension.endsWith(validExtension)) {
      return true;
    }
  }

  return false;
}
export function checkPermisson(permissionToCheck: string, permissionStringList: any[]): boolean {
  let hasAuth = false;
  for (const permission of permissionStringList) {
    const [p0, p1, p2, p3] = permission.split(':'); // 权限列表
    const [c0, c1, c2, _] = permissionToCheck.split(':');
    if (p0 === '*') {
      hasAuth = true;
    }
    if (p0 === c0 && p1 === '*') {
      hasAuth = true;
    }
    if (p0 + p1 === c0 + c1 && p2 === '*') {
      hasAuth = true;
    }
    if (p0 + p1 + p2 === c0 + c1 + c2 && p3 === '*') {
      hasAuth = true;
    }
    if (permission === permissionToCheck) {
      hasAuth = true;
    }
  }
  return hasAuth;
}
export function hasPermission(permissionToCheck: string): boolean {
  const permissionStringList = useUser((state) => state.permissionStringList);
  return checkPermisson(permissionToCheck, permissionStringList);
}
