import React, { FC } from 'react';

import { connect, Dispatch, Loading, UserState } from 'umi';
import { Popconfirm } from 'antd';
import ProTable, { ProColumns } from '@ant-design/pro-table';

import UserPagination from './UserPagination';
import { SingleUserType } from '../data';
import styles from '../index.less';

interface UserPageProps {
  users: UserState;
  dispatch: Dispatch;
  userListLoading: boolean;
}

interface UserTableProps {
  users: UserState;
  userListLoading: boolean;
}

const UserTable: FC<UserTableProps> = ({ users, userListLoading }) => {
  const columns: ProColumns<SingleUserType>[] = [
    {
      title: 'ID',
      dataIndex: 'id',
      valueType: 'digit',
      key: 'id',
    },
    {
      title: '姓名',
      dataIndex: 'name',
      valueType: 'text',
      key: 'name',
      render: (text: any) => <a>{text}</a>,
    },
    {
      title: '创建事件',
      dataIndex: 'create_time',
      valueType: 'dateTime',
      key: 'create_time',
    },
    {
      title: '操作',
      valueType: 'option',
      key: 'action',
      render: (text: any, record: SingleUserType) => [
        <a key={text}>编辑</a>,
        <Popconfirm title="确定删除吗?" okText="Yes" cancelText="No" key={text}>
          <a>删除</a>
        </Popconfirm>,
      ],
    },
  ];

  return (
    <ProTable
      rowKey="id"
      columns={columns}
      dataSource={users.data}
      loading={userListLoading}
      search={false}
      pagination={false}
      options={{
        density: true,
        fullScreen: true,
        reload: () => {},
        setting: true,
      }}
      headerTitle="用户列表"
    />
  );
};

const UserListPage: FC<UserPageProps> = ({
  users,
  dispatch,
  userListLoading,
}) => {
  return (
    <div className={styles.listTable}>
      <UserTable users={users} userListLoading={userListLoading} />
      <UserPagination users={users} dispatch={dispatch} />
    </div>
  );
};

const mapStateToProps = ({
  users,
  loading,
}: {
  users: UserState;
  loading: Loading;
}) => {
  return {
    users,
    userListLoading: loading.models.users,
  };
};

export default connect(mapStateToProps)(UserListPage);
