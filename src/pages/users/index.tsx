import React, { ReactElement } from 'react';
import UsersList from './_components/UsersList';
interface Props {}

function Users({}: Props): ReactElement {
  return (
    <div>
      <UsersList />
    </div>
  );
}
export default Users;
