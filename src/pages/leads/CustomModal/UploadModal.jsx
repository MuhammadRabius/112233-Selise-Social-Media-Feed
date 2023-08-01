import React, { useState } from "react";
import { Modal, Form, Upload, Button, Spin, message } from "antd";
import { UploadOutlined, LoadingOutlined } from "@ant-design/icons";
import "./UploadModal.css";
import { bulkExcelUpload } from "../Service/lead_service";

const UploadModal = ({ open, onCancel, onSubmit, setBulkUpModal }) => {
  const [form] = Form.useForm();
  const { Dragger } = Upload;
  const [isLoading, setLoading] = useState(false);

  // Spin
  const antIcon = (
    <LoadingOutlined
      style={{
        fontSize: 24,
      }}
      spin
    />
  );
  // Modal X btn-----
  const handleCancel = () => {
    form.resetFields();
    onCancel();
  };

  // File Upload Content
  const onFinish = async (values) => {
    console.log(values);
    const data = values?.file?.fileList[0]?.originFileObj;

    try {
      // Create a new FormData object and append the file to it
      setLoading(true);
      if (data) {
        const formData = new FormData();
        formData.append("file", data);
        const response = await bulkExcelUpload(formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        message.success(response.data.message);
        form.resetFields();
        setBulkUpModal(false);
      } else {
        message.warning("Please Upload Excel File");
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      error.response.data.message && message.error(error.response.data.message);
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <>
      <Spin indicator={antIcon} spinning={isLoading}>
        <Modal
          className="bulk_up_container"
          title="BULK UPLOAD"
          open={open}
          onCancel={handleCancel}
          footer={null}
        >
          <Form
            form={form}
            name="excel_upload_form"
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            initialValues={{
              remember: true,
            }}
          >
            <Form.Item
              name="file"
              rules={[
                {
                  required: true,
                  message: "Please select an Excel file to upload!",
                },
              ]}
            >
              <Dragger
                name="file"
                accept=".xls,.xlsx"
                multiple={false}
                beforeUpload={() => false}
                maxCount={1}
              >
                <p className="ant-upload-drag-icon">
                  <UploadOutlined />
                </p>
                <p className="ant-upload-text">
                  Drag & Drop File <br /> Or <br /> Browse File
                </p>
              </Dragger>
            </Form.Item>

            <Form.Item>
              <div className="upload_container">
                <Button className="upload-btn" htmlType="submit">
                  Upload
                </Button>
              </div>
            </Form.Item>
          </Form>
        </Modal>
      </Spin>
    </>
  );
};

export default UploadModal;
