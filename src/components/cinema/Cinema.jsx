import React, { useEffect, useState } from "react";
import Axios from "axios";
import { Flex, Radio, Space, Tabs, Tag } from "antd";
import { Typography } from "antd";
import api from "../../api/apiUtils";
import axios from "axios";
import TabsCinema from "../../helpers/TabsCinema";
const { Title } = Typography;
const Cinema = () => {
  const tabPosition = "left";
  const [listCinema, setListCinema] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [cumRapCurrentPage, setCumRapCurrentPage] = useState(1);
  const moviesPerPage = 5;
  const cumRapPerPage = 5;

  const fetchListCinema = async () => {
    await api.get(
      "QuanLyRap/LayThongTinLichChieuHeThongRap?maNhom=GP01",
    )
      .then((res) => {
        setListCinema(res.data.content);
      })
      .catch((error) => {
        console.log("error", error);
      });
  };

  useEffect(() => {
    fetchListCinema();
  }, []);

  return (
    <div className="container mx-auto">
      <Title level={2} style={{ textAlign: "center", margin: "20px 0" }}>
        Cụm rạp
      </Title>
      <TabsCinema listCinema={listCinema} />
    </div>
  );
};

export default Cinema;
