import React from "react";
import { Button, Checkbox, Form, Input } from "antd";
import dayjs from "dayjs";

const Forms = ({
  onFinish = () => {},
  onFinishFailed = () => {},
  setData = { setData },
}) => {
  const onChange = (e) => {
    const payload = {
      id: 1,
      name: "Rabiusssany",
      times: dayjs().format("HH:mm:ss"),
      post_des: e?.target?.value,
    };
    setData(payload);
    console.log("payload");
  };
  const { TextArea } = Input;

  return (
    <Form
      name="basic"
      style={{
        maxWidth: 600,
      }}
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <TextArea
        showCount
        maxLength={100}
        onChange={onChange}
        placeholder="Please Write you thoughts"
      />

      {/* <Form.Item
        label="Username"
        name="username"
        rules={[
          {
            required: true,
            message: "Please input your username!",
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[
          {
            required: true,
            message: "Please input your password!",
          },
        ]}
      >
        <Input.Password />
      </Form.Item> */}

      {/* <Form.Item
        name="remember"
        valuePropName="checked"
        wrapperCol={{
          offset: 8,
          span: 16,
        }}
      >
        <Checkbox>Remember me</Checkbox>
      </Form.Item>

      <Form.Item
        wrapperCol={{
          offset: 8,
          span: 16,
        }}
      >
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item> */}
    </Form>
  );
};

export default Forms;
