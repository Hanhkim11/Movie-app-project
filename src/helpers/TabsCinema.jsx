import React, { useEffect, useState } from "react";
import { Flex, Radio, Space, Tabs, Tag } from "antd";
import { Typography } from "antd";
import api from "../api/apiUtils";

const { Title } = Typography;

const TabsCinema = (props) => {
    console.log(props)
    const { listCinema } = props;
    const tabPosition = "left";
    const [currentPage, setCurrentPage] = useState(1);
    const [cumRapCurrentPage, setCumRapCurrentPage] = useState(1);
    const moviesPerPage = 5;
    const cumRapPerPage = 5;

    // hàm dùng để format giờ chiếu
    const layGioChieu = (lstLichChieuTheoPhimarr) => {
        return lstLichChieuTheoPhimarr.map((item, index) => {
            const [gio, phut] = item.ngayChieuGioChieu.split("T")[1].split(":");
            const checkAmPm = gio > 12 ? "PM" : "AM";
            const gioChieu = `${gio}:${phut} ${checkAmPm}`;
            return (
                <div key={index}>
                    <Tag style={{ fontSize: "1.3rem", padding: "8px" }} color="green">{gioChieu}</Tag>
                </div>
            )
        })
    }


    // hàm dùng để render cụm rạp
    const renderCumRap = (arrCumRap) => {
        // Tính toán phân trang cho cụm rạp
        const indexOfLastCumRap = cumRapCurrentPage * cumRapPerPage;
        const indexOfFirstCumRap = indexOfLastCumRap - cumRapPerPage;
        const currentCumRap = arrCumRap?.slice(indexOfFirstCumRap, indexOfLastCumRap) || [];
        const totalCumRapPages = Math.ceil((arrCumRap?.length || 0) / cumRapPerPage);

        const handleCumRapPageChange = (page) => {
            setCumRapCurrentPage(page);
        };

        return (
            <div>
                <Tabs
                    className="relative"
                    tabPosition={tabPosition}
                    items={currentCumRap?.map((item, i) => {
                        return {
                            label: (<div className="flex relative gap-2">
                                <img
                                    style={{ width: "50px", height: "50px", objectFit: "cover" }}
                                    src={"https://thumbs.dreamstime.com/b/default-image-icon-vector-missing-picture-page-website-design-mobile-app-no-photo-available-235041328.jpg"}
                                />
                                <div className="flex flex-col items-start">
                                    <p className="text-xl font-bold">{item.tenCumRap}</p>
                                    <p className="text-lg text-start text-wrap w-96">{item.diaChi}</p>
                                </div>
                            </div>
                            ),
                            key: i,
                            children: renderListPhim(item.danhSachPhim),

                        };
                    })}

                />
                {/* Phân trang cho cụm rạp */}
                {totalCumRapPages > 1 && (
                    <div className="flex justify-start mt-4 absolute" style={{ top: "50%" }}>
                        <Space>
                            {Array.from({ length: totalCumRapPages }, (_, i) => i + 1).map(page => (
                                <button
                                    key={page}
                                    onClick={() => handleCumRapPageChange(page)}
                                    className={`px-3 py-1 rounded ${cumRapCurrentPage === page
                                        ? 'bg-blue-500 text-white'
                                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                                        }`}
                                >
                                    {page}
                                </button>
                            ))}
                        </Space>
                    </div>
                )}
            </div>
        )
    }

    const renderListPhim = (arrPhim) => {

        // Lọc phim đang chiếu và sắp chiếu
        const filteredMovies = arrPhim.filter(item => item.dangChieu && item.sapChieu);

        // Tính toán phân trang
        const indexOfLastMovie = currentPage * moviesPerPage;
        const indexOfFirstMovie = indexOfLastMovie - moviesPerPage;
        const currentMovies = filteredMovies.slice(indexOfFirstMovie, indexOfLastMovie);
        const totalPages = Math.ceil(filteredMovies.length / moviesPerPage);

        const handlePageChange = (page) => {
            setCurrentPage(page);
        };

        return (
            <div>
                {currentMovies.map((item, index) => {
                    return (
                        <div className="flex gap-2 p-2" key={index}>
                            <img style={{ width: "150px", height: "250px", objectFit: "cover", borderRadius: "8px" }} src={item.hinhAnh} alt="" />
                            <div className="ml-5">
                                <p className="text-xl font-bold">{item.tenPhim}</p>
                                <div className="mt-5 grid grid-cols-6 gap-2">
                                    {layGioChieu(item.lstLichChieuTheoPhim)}
                                </div>
                            </div>
                        </div>
                    )
                })}

                {/* Phân trang */}
                {totalPages > 1 && (
                    <div className="flex justify-center mt-4">
                        <Space>
                            {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                                <button
                                    key={page}
                                    onClick={() => handlePageChange(page)}
                                    className={`px-3 py-1 rounded ${currentPage === page
                                        ? 'bg-blue-500 text-white'
                                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                                        }`}
                                >
                                    {page}
                                </button>
                            ))}
                        </Space>
                    </div>
                )}
            </div>
        )
    }

    return (
        <>
            <Tabs
                tabPosition={tabPosition}
                items={listCinema?.map((item, i) => {
                    const id = String(i + 1);
                    return {
                        label: (
                            <img
                                style={{ width: "50px", height: "50px", objectFit: "cover" }}
                                src={item.logo}
                            />
                        ),
                        key: id,
                        children: renderCumRap(item.lstCumRap),
                    };
                })}
            />
        </>
    )
}

export default TabsCinema