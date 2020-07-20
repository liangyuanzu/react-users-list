import React, { ReactElement } from 'react';
import UsersModal from './UsersModal';
interface Props {}

export default function UsersList({}: Props): ReactElement {
  return (
    <div>
      <UsersModal />
      用户列表
    </div>
  );
}
