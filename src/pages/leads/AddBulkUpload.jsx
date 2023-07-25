import { useState } from "react";
import { Button, Modal, Form, Input, Select } from "antd";

const AddBulkUpload = ({ bulkUpload,handlex,setBulkUpload }) => {
 

  
    return (
      <>
       <Modal
          title="BULK UPLOAD"
          bulkUpload={bulkUpload}
          onCancl={handlex}
          footer={false}
        ></Modal>
      </>    );
  };
  
  export default AddBulkUpload;
  