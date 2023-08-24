import React, { useState } from "react";
import { Modal, Form, Upload, Button, Spin, message } from "antd";
import { UploadOutlined, LoadingOutlined } from "@ant-design/icons";
import "./UploadModal.css";
import { bulkExcelUpload } from "../Service/lead_service";
import { ErrorExcelFileDownload } from "../../../global_state/action";
import Loader from "../../../components/Loader/Loader.tsx";

const UploadModal = ({
  open,
  onCancel,
  onSubmit,
  setBulkUpModal,
  callBack,
  setCallBack,
}) => {
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
        if (response.data.data !== null) {
          ErrorExcelFileDownload(response?.data?.data);
        }
        response?.data?.message === true
          ? message.success(response?.data?.message)
          : message.error(response?.data?.message);
        form.resetFields();
        setCallBack(!callBack);
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

  return (
    <>
      {isLoading ? (
        <Loader isLoading={isLoading} />
      ) : (
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
      )}
    </>
  );
};

export default UploadModal;
