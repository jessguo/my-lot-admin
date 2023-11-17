import { redirect } from 'react-router-dom';

const RedirectPage = (path: string) => {
  if (path) {
    return redirect(path);
  }

  return <></>;
};
export default RedirectPage;
