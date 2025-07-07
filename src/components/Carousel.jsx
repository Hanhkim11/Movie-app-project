import React, { useEffect, useState } from "react";
import Axios from "axios";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import api from "../api/apiUtils";

const Carousel = () => {
  const [banner, setBanner] = useState([]);
  let settings = {
    autoplay: true,
    // dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  const fetchBanners = async () => {
    await api.get("QuanLyPhim/LayDanhSachBanner")
      .then((res) => {
        setBanner(res.data.content);
      })
      .catch((error) => {
        console.log("error", error);
      });
  };
  useEffect(() => {
    fetchBanners();
  }, []);
  return (
    <div>
      <Slider {...settings}>
        {banner?.map((banner, index) => (
          <div key={index} className="bg-center">
            <img
              src={banner.hinhAnh}
              alt={banner.maBanner}
              style={{
                width: "200%",
                height: "200%",
                objectFit: "cover",
              }}
            />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Carousel;
