import React from 'react';
import styles from './index.less';

export default () => {
  return (
    <div className={styles.title}>
      <h1>欢迎来到用户管理界面</h1>
      <p>请在地址栏中追加 '/users' 并回车进入系统</p>
    </div>
  );
};
