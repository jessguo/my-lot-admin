import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
type State = {
  token: string;
  userInfo: any;
  permissionList: any[];
  permissionStringList: string[];
};

type Actions = {
  login: (pamram: any) => void;
  logout: () => void;
};

const initialState: State = Object.freeze({
  token: '',
  userInfo: {},
  permissionList: [],
  permissionStringList: [],
});
const useUser = create<State & Actions>()(
  persist(
    (set, _) => ({
      ...initialState,
      login: (payload) => {
        const permissionList = payload.data?.permissionList;
        set({
          token: payload.data.token,
          userInfo: payload.data,
          permissionList: permissionList,
          permissionStringList: permissionList
            .map((item: any) => item.mpResourceName)
            .filter((v: string) => v.startsWith('mprn:iot-admin'))
            .map((v: string) => v.replace('mprn:iot-admin:', '')),
        });
      },
      logout: () => {
        useUser.persist.clearStorage();
        set(initialState);
      },
    }),

    {
      name: 'mangopower-storge',
      storage: createJSONStorage(() => localStorage), // (optional) by default, 'localStorage' is used
    },
  ),
);

export default useUser;
