import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { apiMovies } from "../../../api/apiMovies";
import { Button, Divider, message, Typography } from "antd";
import "./BookingTicket.css";
import { apiTickets } from "../../../api/apiTickets";

const { Title } = Typography;
const BookingTickets = () => {
  const [listTickets, setListTickets] = useState();
  // Danh sách ghế
  const [listSeats, setListSeats] = useState([]);
  const [messageApi, contextHolder] = message.useMessage();

  const params = useParams();
  const { maLichChieu } = params;
  const [isLoading, setIsLoading] = useState(false);

  // Lấy thông tin người dùng từ localStorage
  const currentUser = localStorage.getItem("userLogin");
  //   Chuyển ddoooir chuổi Json thành đối tượng object
  const userLogin = currentUser ? JSON.parse(currentUser) : null;

  // Hàm lấy thông tin vé từ API
  const fetchApiMovies = async () => {
    try {
      setIsLoading(true);
      apiMovies
        .getTickets(maLichChieu)
        .then((res) => {
          setListTickets(res.data.content);
          setIsLoading(false);
        })
        .catch((err) => {})
        .finally(() => {
          setIsLoading(false);
        });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    // Gọi hàm lấy thông tin vé khi component được mount
    fetchApiMovies();
  }, [maLichChieu]);

  const getInForTickets = (info) => {
    console.log(info);
    let isExist = listSeats.find((item) => item.maGhe === info.maGhe);
    // Kiểm tra ghế đã được chọn hay chưa
    if (!isExist) {
      // Nếu ghế chưa được chọn, thêm vào danh sách ghế đã chọn
      setListSeats([...listSeats, info]);
    } else {
      // Nếu ghế đã được chọn, xóa khỏi danh sách ghế đã chọn
      setListSeats(listSeats.filter((item) => item.maGhe !== info.maGhe));
    }
  };
  console.log({ listSeats });

  // Hàm render danh sách ghế
  const renderSeats = () => {
    return listSeats?.map((item, index) => {
      return item?.tenGhe + (index < listSeats.length - 1 ? ", " : "");
    });
  };

  console.log({ listTickets });

  // Hàm đặt vé
  const bookingTickets = () => {
    let data = {
      maLichChieu: listTickets?.thongTinPhim.maLichChieu,
      danhSachVe: [
        ...listSeats?.map((item) => {
          return {
            maGhe: item?.maGhe,
            giaVe: item?.giaVe,
          };
        }),
      ],
    };
    // Gọi API đặt vé
    apiTickets
      .bookTickets(data)
      .then((res) => {
        console.log(res);
        // Hiển thị thông báo thành công
        messageApi.open({
          type: "success",
          content: "Đặt vé thành công!",
          duration: 2,
        });
        setListSeats([]); // Reset danh sách ghế đã chọn
        // Reset danh sách ghế đã chọn
        fetchApiMovies();
      })
      .catch((err) => {
        console.log(err);
      });
    console.log(data);
  };

  return (
    <div className="mt-40 grid grid-cols-4 gap-4 px-3">
      {contextHolder}
      <div className="list-tickets col-span-3 px-7">
        <Divider>
          <Title level={2}>Thông tin ghế</Title>
        </Divider>
        <div className="screen">Screen</div>
        {/* Danh sách ghế */}
        <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 xl:grid-cols-14 2xl:grid-cols-16 max-w-6xl mx-auto">
          {isLoading ? (
            <div className="col-start-8 loader"></div>
          ) : (
            listTickets?.danhSachGhe.map((item, index) => {
              // Kiểm tra ghế đã được đặt hay chưa
              let isBooked = item.taiKhoanNguoiDat ? true : false;

              let isMyBooked = item.taiKhoanNguoiDat === userLogin?.taiKhoan;

              let isSelected = listSeats.find(
                (seat) => seat.maGhe === item.maGhe
              );

              return (
                <div className="col-span-1 flex justify-center" key={index}>
                  <button
                    disabled={isBooked}
                    type="button"
                    className="button"
                    onClick={() => getInForTickets(item)}
                  >
                    <div className="button-top">{item.tenGhe}</div>
                    {item.loaiGhe === "Thuong" ? (
                      <div
                        className={`button-bottom ${
                          isSelected
                            ? "!bg-blue-400"
                            : isMyBooked
                            ? "bg-green-400"
                            : isBooked
                            ? "!bg-red-400"
                            : ""
                        }`}
                      ></div>
                    ) : (
                      <div
                        style={{ backgroundColor: "#ffb03c" }}
                        className={`button-bottom ${
                          isSelected
                            ? "!bg-blue-400"
                            : isMyBooked
                            ? "!bg-green-400"
                            : isBooked
                            ? "!bg-red-400"
                            : ""
                        }`}
                      ></div>
                    )}
                    {/* <div className="button-base"></div> */}
                  </button>
                </div>
              );
            })
          )}
        </div>

        <div>
          <div className="my-10">
            <table className="w-full">
              <tr className="flex justify-between items-center">
                <th className="flex flex-col justify-center items-center">
                  Ghế đang chọn{" "}
                  <div
                    style={{ width: "50px", height: "50px" }}
                    className="bg-blue-400"
                  ></div>
                </th>
                <th className="flex flex-col justify-center items-center">
                  Ghế đã đặt
                  <div
                    style={{ width: "50px", height: "50px" }}
                    className="bg-red-400"
                  ></div>
                </th>
                <th className="flex flex-col justify-center items-center">
                  Ghế của bạn
                  <div
                    style={{ width: "50px", height: "50px" }}
                    className="bg-green-400"
                  ></div>
                </th>
                <th className="flex flex-col justify-center items-center">
                  Ghế thường
                  <div
                    style={{ width: "50px", height: "50px" }}
                    className="bg-gray-200"
                  ></div>
                </th>
                <th className="flex flex-col justify-center items-center">
                  Ghế Vip
                  <div
                    style={{ width: "50px", height: "50px" }}
                    className="bg-orange-400"
                  ></div>
                </th>
              </tr>
            </table>
          </div>
        </div>
      </div>

      <div className="info-booking-tickets col-span-1 p-10 bg-amber-200 rounded-2xl">
        <Divider>
          <Title level={2}>Thông tin đặt vé</Title>
        </Divider>{" "}
        <div className="flex items-center">
          Tên Phim:
          <Title style={{ marginBottom: "0", marginLeft: "3px" }} level={4}>
            {listTickets?.thongTinPhim.tenPhim}
          </Title>
        </div>
        <p>Địa chỉ: {listTickets?.thongTinPhim.diaChi}</p>
        <p> Giờ chiếu: {listTickets?.thongTinPhim.gioChieu}</p>
        <p> Ngày chiếu: {listTickets?.thongTinPhim.ngayChieu}</p>
        <Divider
          variant="dashed"
          style={{ borderColor: "#7cb305", borderWidth: "1.5px" }}
          dashed
        />
        <div className="flex justify-between gap-2 px-5">
          <p>Ghế: {renderSeats()}</p>
          <p>
            Giá:{" "}
            {listSeats
              ?.reduce((total, item) => total + item?.giaVe, 0)
              .toLocaleString()}{" "}
            đ
          </p>
        </div>
        <Divider
          variant="dashed"
          style={{ borderColor: "#7cb305", borderWidth: "1.5px" }}
          dashed
        />
        <div className="flex flex-col gap-2">
          <p>Người đặt: {userLogin?.hoTen}</p>
          <p>Email: {userLogin?.email}</p>
          <p>Số điện thoại: {userLogin?.soDT}</p>
        </div>
        <Button
          className="mt-10 w-full !p-5 !text-2xl !font-semibold"
          onClick={bookingTickets}
        >
          Đặt vé
        </Button>
      </div>
    </div>
  );
};

export default BookingTickets;
