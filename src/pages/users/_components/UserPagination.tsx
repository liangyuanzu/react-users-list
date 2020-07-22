import React, { FC } from 'react';
import { Dispatch, UserState } from 'umi';
import { Pagination } from 'antd';
import styles from '../index.less';

interface UserPaginationProps {
  users: UserState;
  dispatch: Dispatch;
}

const UserPagination: FC<UserPaginationProps> = ({ users, dispatch }) => {
  const handlePagination = (page: number, pageSize?: number) => {
    dispatch({
      type: 'users/getRemote',
      payload: {
        page,
        per_page: pageSize ? pageSize : users.meta.per_page,
      },
    });
  };

  const handlePageSize = (current: number, size: number) => {
    dispatch({
      type: 'users/getRemote',
      payload: {
        page: current,
        per_page: size,
      },
    });
  };

  return (
    <Pagination
      className={styles.listPage}
      total={users.meta.total}
      onChange={handlePagination}
      onShowSizeChange={handlePageSize}
      pageSizeOptions={['5', '10', '15', '20']}
      current={users.meta.page}
      pageSize={users.meta.per_page}
      showSizeChanger
      showQuickJumper
    />
  );
};

export default UserPagination;
