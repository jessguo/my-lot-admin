import { Suspense, useEffect } from 'react';
import { Spin, ConfigProvider, theme } from 'antd';
import { RouterProvider } from 'react-router-dom';

// import { SWRConfiguration } from 'swr';
import router from '@/routes/index';
const themeCofig = {
  // token: theme.compactAlgorithm,
  algorithm: theme.compactAlgorithm,
};
// const swrConfig: SWRConfiguration = {
//   onErrorRetry: (error, key, config, revalidate, { retryCount }) => {
//     // 请求错误 不重试
//     return;
//     // debugger;
//     // if (error.status === 401) return;
//     // if (error.status === 404) return;
//     // // 最多重试 3 次。
//     // if (retryCount >= 3) return;

//     // // 20秒后重试。
//     // setTimeout(() => revalidate({ retryCount: retryCount }), 20000);
//   },
// };
// const getApp = async () => {
//   const respose = await post(Api.APP_VERSION);
//   // debugger;
//   if (respose.status === 0) {
//     const appid = respose.data.find((item: any) => item.name === 'mp-iot-admin')?.id || '';
//     localStorage.setItem('appId', appid);
//   }
// };

const App = () => {
  useEffect(() => {
    // getApp();
  }, []);
  return (
    <Suspense fallback={<Spin size="large" />}>
      <ConfigProvider theme={themeCofig}>
        <RouterProvider router={router} />
      </ConfigProvider>
    </Suspense>
  );
};

export default App;
