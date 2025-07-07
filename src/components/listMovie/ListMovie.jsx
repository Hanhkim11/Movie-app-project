import Axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Card, Rate, Spin } from "antd";
import Slider from "react-slick";
import api from "../../api/apiUtils";
import './listMovie.css'
import { useNavigate } from "react-router-dom";
import { apiMovies } from "../../api/apiMovies";

const { Meta } = Card;

const settings = {
  className: "center",
  centerMode: true,
  infinite: true,
  centerPadding: "70px",
  slidesToShow: 3,
  speed: 500,
  rows: 2,
  slidesPerRow: 2
};

const ListMovie = () => {
  const [listMovies, setListMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const [filter, setFilter] = useState({ dangChieu: true, sapChieu: true })
  const navigate = useNavigate()

  useEffect(() => {
    setIsLoading(true);
    apiMovies.getAllMovies()
      .then((res) => {
        setListMovies(res.data.content);
      })
      .catch((error) => {
        console.log("error", error);
      })
      .finally(() => {
        setIsLoading(false);
      })
  }, []);

  const renderMovies = () => {
    let filterMovies = listMovies.filter(movie => {
      if (filter.dangChieu && !filter.sapChieu) {
        return movie.dangChieu
      }
      if (!filter.dangChieu && filter.sapChieu) {
        return movie.sapChieu
      }
      return movie
    })
    return filterMovies.map((movie, index) => {
      return (
        <div className="test" key={movie.maPhim} onClick={() => navigate(`/detail-movie/${movie.maPhim}`)}>
          <Card
            hoverable
            className="w-full"
            style={{ width: 200, height: 400 }}
            cover={
              <img
                className="h-[240px] object-cover"
                style={{ height: "200px", objectFit: "cover" }}
                alt={movie.tenPhim}
                src={movie.hinhAnh}
              />
            }
          >
            <Meta
              title={movie.tenPhim}
              description={
                <div className="flex flex-col justify-between h-full">
                  <li>
                    {movie.moTa.length > 100
                      ? movie.moTa.substring(0, 60) + "..."
                      : movie.moTa}
                  </li>
                  <li>
                    <b>Đánh giá:</b>
                    <Rate allowHalf disabled defaultValue={movie.danhGia / 2} />
                  </li>
                </div>
              }
            />
          </Card>
        </div>
      );
    });
  };

  return (
    <div className="container mx-auto mt-10 list-movie">
      <h1 className="text-4xl ml-5 font-semibold">Danh sách phim</h1>
      <div className="filter flex gap-2 my-5">
        <Button onClick={() => { setFilter({ dangChieu: true, sapChieu: true }) }}>Tất cả</Button>
        <Button onClick={() => setFilter({ dangChieu: true, sapChieu: false })}>Đang chiếu</Button>
        <Button onClick={() => setFilter({ dangChieu: false, sapChieu: true })}>Sắp chiếu</Button>
      </div>
      {isLoading ? (
        <div className="flex justify-center items-center h-96">
          {/* <Spin size="large" /> */}
          <div class="loader"></div>
        </div>
      ) : (
        <div className="slider-container">
          <Slider {...settings}>
            {renderMovies()}
          </Slider>
        </div>
      )}
    </div>
  );
};

export default ListMovie;
