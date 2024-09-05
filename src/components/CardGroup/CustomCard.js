import React from "react";
import { Avatar, Card } from "antd";
import {
  EditOutlined,
  EllipsisOutlined,
  SettingOutlined,
  LikeOutlined,
} from "@ant-design/icons";

const CustomCard = ({ hoverable = false, bordered = false, item }) => {
  const { Meta } = Card;

  return (
    <Card
      hoverable={hoverable}
      bordered={bordered}
      title={item?.name}
      extra={<p>{item?.times}</p>}
      style={{
        width: "80%",
        marginTop: "2%",
      }}
      cover={
        <img
          alt="example"
          src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
        />
      }
      actions={[<LikeOutlined />, <EllipsisOutlined key="ellipsis" />]}
    >
      <Meta
        avatar={
          <Avatar src="https://api.dicebear.com/7.x/miniavs/svg?seed=8" />
        }
        description={item?.post_des}
      />
    </Card>
  );
};

export default CustomCard;
