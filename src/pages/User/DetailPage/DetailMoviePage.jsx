import React, { useEffect, useState } from 'react'
import { NavLink, useParams } from 'react-router-dom'
import { apiMovies } from '../../../api/apiMovies'
import { Button, Divider, Modal, Rate, Tabs, Tag, Typography, Progress, notification } from 'antd'
import { CalendarOutlined } from '@ant-design/icons'
import './detailMoviePage.css'
import TabsCinema from '../../../helpers/TabsCinema'
import { IoMdFlame } from "react-icons/io";

const { Title } = Typography

const conicColors = {
    '0%': '#87d068',
    '50%': '#ffe58f',
    '100%': '#ffccc7',
};

const DetailMoviePage = () => {
    const { id } = useParams()
    const [movieDetail, setMovieDetail] = useState()
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [urlVideo, setUrlVideo] = useState(null)
    const [keyVideo, setKeyVideo] = useState(0)
    const [showTimeMovie, setShowTimeMovie] = useState([])

    const [api, contextHolder] = notification.useNotification();

    const currentUser = localStorage.getItem("userLogin");

    const userLogin = currentUser ? JSON.parse(currentUser) : null;

    // Hàm mở thông báo cho trailer
    const openNotification = () => {
        api.info({
            message: `Thông báo`,
            description:
                'Video trailer đang được cập nhập. Vui lòng quay lại sau!',
            placement: "top",
        });
    };


    // Hàm chuyển đổi URL YouTube thành embed URL
    const getYouTubeEmbedUrl = (url) => {
        if (!url) return ''

        // Xử lý các định dạng URL YouTube khác nhau
        const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/
        const match = url.match(regExp)

        if (match && match[2].length === 11) {
            return `https://www.youtube.com/embed/${match[2]}`
        }
        return url
    }

    useEffect(() => {
        apiMovies.getMovieDetail(id)
            .then(res => {
                setMovieDetail(res.data.content)
            })
        apiMovies.getShowTimeMovie(id)
            .then(res => {
                console.log(res.data.content)
                setShowTimeMovie(res.data.content.heThongRapChieu)
            })
    }, [id])

    // hàm dùng để format giờ chiếu
    const layGioChieu = (gioChieuPhim) => {
        // return lstLichChieuTheoPhimarr.map((item, index) => {
        const [gio, phut] = gioChieuPhim.ngayChieuGioChieu.split("T")[1].split(":");
        const checkAmPm = gio > 12 ? "PM" : "AM";
        const gioChieu = `${gio}:${phut} ${checkAmPm}`;
        const isLogin = userLogin ? userLogin.taiKhoan : null;


        return (
            <div>
                <NavLink to={`${isLogin ? `/booking-tickets/${gioChieuPhim.maLichChieu}` : '/login'}`} className="border-2 p-1 text-lg rounded-xl">
                    {gioChieu}
                </NavLink>
            </div>
        )
    }


    const renderCumRap = (item) => {
        return item.map((cumRap, index) => {
            return (<div key={index}>
                <div className='flex mb-4'>
                    <img style={{ width: "60px", height: "60px" }} src={cumRap.hinhAnh} />
                    <div className='ml-3 h-full'>
                        <p className='text-xl font-bold'>{cumRap.tenCumRap}</p>
                        <p className='mb-5'>{cumRap.diaChi}</p>
                        <div className='flex flex-wrap gap-4'>
                            {cumRap.lichChieuPhim.map((gioChieu, index) => {
                                return (
                                    layGioChieu(gioChieu)
                                )
                            })}
                        </div>
                    </div>
                </div>
            </div>
            )
        })
    }
    console.log(movieDetail)
    return (<>
        {contextHolder}
        <div className='container mx-auto mt-40 detail-movie-page'>
            <div className='flex justify-around'>
                <img style={{ width: "300px", height: "450px", objectFit: "cover" }} src={movieDetail?.hinhAnh} alt="" />
                <div className='w-2/3'>
                    <Divider style={{ border: "2px" }}><Title level={1}>{movieDetail?.tenPhim}</Title></Divider>
                    <div className='flex flex-col justify-between h-2/3 gap-2'>
                        <div className='flex items-center'>
                            {/* thông tin phim */}
                            <div className='flex flex-col gap-4'>
                                <p className='text-xl text-gray-500'><CalendarOutlined /> Ngày chiếu: {new Date(movieDetail?.ngayKhoiChieu).toLocaleDateString()}</p>
                                <p className='text-gray-500 text-wrap w-3/4'>Mô tả: {movieDetail?.moTa}</p>
                                <Button
                                    onClick={() => {
                                        if (movieDetail?.trailer.length > 0) {
                                            setIsModalOpen(true)
                                            setUrlVideo(getYouTubeEmbedUrl(movieDetail?.trailer))
                                            setKeyVideo(keyVideo + 1)
                                        } else (
                                            openNotification()
                                        )
                                    }}
                                    type='primary' className='w-40'>Xem Trailer</Button>
                            </div>
                            {/* progress đánh giá */}
                            <Progress
                                size={200}
                                strokeWidth={10}
                                type="dashboard"
                                percent={movieDetail?.danhGia * 10}
                                strokeColor={conicColors}
                                format={percent => {
                                    return <div className=''>
                                        <IoMdFlame
                                            color={movieDetail?.hot ? "#ff9c00f2" : "gray"}
                                            size={130}
                                            style={{ left: "18%", top: "-58px" }}
                                            className='absolute -z-10'
                                        />
                                        <div className='text-black'>
                                            {percent / 10 + "/10"}
                                        </div>
                                    </div>
                                }
                                }
                            />
                        </div>

                        <div className='mt-10'>
                            <Title level={3}>Lịch chiếu phim</Title>
                            {showTimeMovie?.length > 0 ? (
                                <Tabs
                                    tabPosition='left'
                                    items={showTimeMovie.map((item, index) => {
                                        return {
                                            label: (
                                                <img
                                                    style={{ width: "50px", height: "50px", objectFit: "cover" }}
                                                    src={item.logo}
                                                />
                                            ),
                                            key: index,
                                            children: renderCumRap(item.cumRapChieu)
                                        }
                                    })}
                                />
                            ) :
                                (<>
                                    <Title level={4} className='text-red-500'>Không có lịch chiếu</Title>
                                </>)
                            }
                        </div>
                    </div>
                </div>
            </div>

            {/* modal hiển thị trailer */}
            <Modal
                open={isModalOpen}
                onCancel={() => {
                    setIsModalOpen(false)
                    setUrlVideo(null)
                }}
                footer={null}
                width={1000}
                destroyOnHidden={true}
                className='detail-movie-page-modal'
            >
                <div className='w-full' style={{ height: "600px" }}>
                    {urlVideo && (
                        <iframe
                            className='w-full h-full'
                            key={keyVideo}
                            src={urlVideo}
                            title="YouTube video player"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        >Nội dung phim</iframe>
                    )}
                </div>
            </Modal>
        </div>
    </>

    )
}

export default DetailMoviePage