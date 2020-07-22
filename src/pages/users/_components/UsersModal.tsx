import React, { useEffect, FC } from 'react';
import { Modal, Form, Input, message, DatePicker, Switch } from 'antd';
import { SingleUserType, FormValues } from '../data.d';
import moment from 'moment';

interface UsersModalProps {
  visible: boolean;
  record: SingleUserType | undefined;
  handleCancel: () => void;
  onFinish: (values: FormValues) => void;
  confirmLoading: boolean;
}

const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 },
};

const UsersModal: FC<UsersModalProps> = props => {
  const [form] = Form.useForm();
  const { visible, record, handleCancel, onFinish, confirmLoading } = props;

  useEffect(() => {
    record
      ? form.setFieldsValue({
          ...record,
          create_time: moment(record.create_time),
          status: Boolean(record.status),
        })
      : form.resetFields();
  }, [visible]);

  const onOk = () => {
    form.submit();
  };

  const onFinishFailed = (errorInfo: any) => {
    message.error(errorInfo.errorFields[0].errors[0]);
  };

  return (
    <div>
      <Modal
        forceRender
        title={record ? `编辑: ${record.id}` : '添加'}
        visible={visible}
        onOk={onOk}
        onCancel={handleCancel}
        confirmLoading={confirmLoading}
      >
        <Form
          name="basic"
          form={form}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          {...layout}
        >
          <Form.Item
            label="Name"
            name="name"
            rules={[{ required: true, message: 'Please input your username!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item label="邮箱" name="email">
            <Input />
          </Form.Item>

          <Form.Item label="创建时间" name="create_time">
            <DatePicker showTime />
          </Form.Item>

          <Form.Item
            label="状态"
            name="status"
            valuePropName="checked"
            initialValue={{ status: true }}
          >
            <Switch />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};
export default UsersModal;
