// import { useState } from 'react';
// import { message } from 'antd';
// type Options = {
//   msg?: string | null | undefined;
// };
// type AsyncCallback<U, T> = (url: string, payload: U) => Promise<ResProps>;

// const useRequest = <U, T>(url: string, fetch: AsyncCallback<U, T>, { msg = null }: Options = {}) => {
//   const [data, setData] = useState(null) as any;
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null) as any;

//   const trigger = async (payload: any) => {
//     try {
//       setLoading(true);
//       const data = await fetch(url, payload);
//       setLoading(false);
//       setData(data);
//       // if (message && data.isSuccess) {
//       //   message.success(msg);
//       // }
//     } catch (error) {
//       setError(error);
//     }
//   };

//   return { data, loading, error, trigger };
// };
// export default useRequest;
