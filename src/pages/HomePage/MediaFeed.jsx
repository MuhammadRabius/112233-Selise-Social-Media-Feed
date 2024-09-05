import React, { useState } from "react";
import SocialAppLayout from "../../components/layout/SocialAppLayout";
import "./homepage.css";

import { demo_data } from "../../utility/demo-datadb";
import Card from "../../components/CardGroup/CustomCard";
import FormModal from "../../components/ModalGroup/FormModal";
import Forms from "../../components/FormGroup/Forms";

const MediaFeed = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [data,setData]=useState([])
  const handleOnClick = (val) => {
    if (val.key == "add_post") {
      setIsModalOpen(true);
    }
  };
  return (
    <SocialAppLayout isMenu={true} handleOnClick={handleOnClick}>
      <div className="add-post-area">
        {demo_data.map((item, key) => {
          return (
            <Card key={item.id} hoverable={true} bordered={true} item={item} />
          );
        })}
      </div>
      {isModalOpen && (
        <FormModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} title='Write Here' data={data}>
          <Forms setData={setData}/>
        </FormModal>
      )}
    </SocialAppLayout>
  );
};

export default MediaFeed;
