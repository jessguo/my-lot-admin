import useSWRMutation from 'swr/mutation';
import Api from '@/api/admin';

async function sendLogin(_: string, { arg }: { arg: any }) {
  return Api.login(arg);
}
export default function useUser() {
  const { data, trigger } = useSWRMutation('api/login', sendLogin);
  return {
    trigger,
    response: data,
  };
}
