import React, { useState, FC } from 'react';

import { connect, Dispatch, Loading, UserState } from 'umi';
import { Popconfirm, message } from 'antd';
import ProTable, { ProColumns } from '@ant-design/pro-table';

import UserPagination from './UserPagination';
import UsersModal from './UsersModal';
import { editRecord } from '../service';
import { SingleUserType, FormValues } from '../data';
import styles from '../index.less';

interface UserPageProps {
  users: UserState;
  dispatch: Dispatch;
  userListLoading: boolean;
}

interface UserTableProps {
  users: UserState;
  userListLoading: boolean;
  handleEdit: (values: any) => void;
  handleDelete: (values: any) => void;
}

const UserTable: FC<UserTableProps> = ({
  users,
  userListLoading,
  handleEdit,
  handleDelete,
}) => {
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
        <a key={text} onClick={() => handleEdit(record)}>
          编辑
        </a>,
        <Popconfirm
          title="确定删除吗?"
          okText="Yes"
          cancelText="No"
          key={text}
          onConfirm={() => handleDelete(record.id)}
        >
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
  const [modalVisible, setModalVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [record, setRecord] = useState<SingleUserType | undefined>(undefined);

  const handleReload = () => {
    dispatch({
      type: 'users/getRemote',
      payload: {
        page: users.meta.page,
        per_page: users.meta.per_page,
      },
    });
  };

  const handleEdit = (record: SingleUserType) => {
    setModalVisible(true);
    setRecord(record);
  };

  const handleDelete = (id: number) => {
    dispatch({
      type: 'users/delete',
      payload: { id },
    });
  };

  const onFinish = async (values: FormValues) => {
    setConfirmLoading(true);

    let serviceFun;
    let id = 0;
    id = record.id;
    serviceFun = editRecord;

    const result = await serviceFun({ id, values });
    if (result) {
      setModalVisible(false);
      setConfirmLoading(false);
      message.success(`${id === 0 ? '添加' : '编辑'}  成功  `);
      handleReload();
    } else {
      setConfirmLoading(false);
      message.error(`${id === 0 ? '添加' : '编辑'}  失败`);
    }
  };

  return (
    <div className={styles.listTable}>
      <UserTable
        users={users}
        userListLoading={userListLoading}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
      />
      <UserPagination users={users} dispatch={dispatch} />
      <UsersModal
        visible={modalVisible}
        handleCancel={() => setModalVisible(false)}
        record={record}
        onFinish={onFinish}
        confirmLoading={confirmLoading}
      />
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
