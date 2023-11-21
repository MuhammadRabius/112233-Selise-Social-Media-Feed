import React, { useState } from "react";
import { Modal, Form, Upload, Button, message } from "antd";
import { UploadOutlined, DownloadOutlined } from "@ant-design/icons";
import "./UploadModal.css";
import { ErrorExcelFileDownload } from "../../../global_state/action";
import Loader from "../../../components/loader/Loader";
import { bulkExcelUpload } from "../../../services/Services";
import LogoutModal from "../../../components/SessionOutModal/LogoutModal";
import sampleExcel from "../../../assets/sampleExcel/Lead_bulk_upload.xlsx";

const UploadModal = ({
  open,
  onCancel,
  onSubmit,
  setBulkUpModal,
  callBack,
  setCallBack,
}) => {
  const [logoutModal, setLogoutModal] = useState(false);
  const [form] = Form.useForm();
  const { Dragger } = Upload;
  const [isLoading, setLoading] = useState(false);

  const handleCancel = () => {
    form.resetFields();
    onCancel();
  };
  const handleSampleExcelDownload = () => {
    const url = sampleExcel;
    window.open(url, "_blank");
  };

  const onFinish = async (values) => {
    const data = values?.file?.fileList[0]?.originFileObj;

    try {
      setLoading(true);
      if (data) {
        const formData = new FormData();
        formData.append("file", data);
        const response = await bulkExcelUpload(formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        response?.data?.data === null
          ? message.success(response?.data?.message)
          : message.warning(response?.data?.message);

        if (response.data.data !== null) {
          ErrorExcelFileDownload(response?.data?.data);
          window.location.reload();
        }
        
        form.resetFields();
        setCallBack(!callBack);
        setBulkUpModal(false);
      } else {
        message.warning("Please Upload Excel File");
      }

      setLoading(false);
    } catch (error) {
      if (error?.response?.status === 401) {
        setLogoutModal(true);
      }
      setLoading(false);
      error.response.data.message && message.error(error.response.data.message);
    }
  };

  return (
    <>
      <Loader isLoading={isLoading} />
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
              <Button
                className="link-btn"
                type="link"
                onClick={handleSampleExcelDownload}
              >
                Sample Excel <DownloadOutlined />
              </Button>

              <Button className="upload-btn" htmlType="submit">
                Upload
              </Button>
            </div>
          </Form.Item>
        </Form>
      </Modal>
      {logoutModal && (
        <LogoutModal open={logoutModal} setLogoutModal={setLogoutModal} />
      )}
    </>
  );
};

export default UploadModal;
