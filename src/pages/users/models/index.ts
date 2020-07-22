import { Effect, Reducer, Subscription } from 'umi';
import { getRemoteList, delItem } from '../service';
import { message } from 'antd';
import { SingleUserType } from '../data.d';

export interface UserState {
  data: SingleUserType[];
  meta: {
    total: number;
    per_page: number;
    page: number;
  };
}

interface UserModelType {
  namespace: 'users';
  state: UserState;
  reducers: {
    getList: Reducer<UserState>;
  };
  effects: {
    getRemote: Effect;
    delete: Effect;
  };
  subscriptions: {
    setup: Subscription;
  };
}

const UserModel: UserModelType = {
  namespace: 'users',
  state: {
    data: [],
    meta: {
      total: 0,
      per_page: 5,
      page: 1,
    },
  },
  reducers: {
    getList(state, { payload }) {
      return payload;
    },
  },
  effects: {
    *getRemote({ payload: { page, per_page } }, { put, call }) {
      const data = yield call(getRemoteList, { page, per_page });
      if (data) {
        yield put({
          type: 'getList',
          payload: data,
        });
      }
    },
    *delete({ payload: { id } }, { put, call, select }) {
      const data = yield call(delItem, id);
      const { page, per_page } = yield select((state: any) => state.users.meta);
      if (data) {
        yield put({
          type: 'getRemote',
          payload: {
            page,
            per_page,
          },
        });
        message.success('删除成功');
      } else {
        message.error('删除失败');
      }
    },
  },
  subscriptions: {
    setup({ history, dispatch }) {
      return history.listen(({ pathname }) => {
        if (pathname === '/users') {
          dispatch({
            type: 'getRemote',
            payload: {
              page: 1,
              per_page: 5,
            },
          });
        }
      });
    },
  },
};
export default UserModel;
