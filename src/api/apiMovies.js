import api from "./apiUtils";

// api dùng để lấy thông tin nội dung
const getMovieDetail = async (id) => {
    return api.get(`QuanLyPhim/LayThongTinPhim?MaPhim=${id}`)
}

// api dùng để lấy toàn bộ danh sách phim
const getAllMovies = async () => {
    return api.get("QuanLyPhim/LayDanhSachPhim?maNhom=GP01")
}

// api dùng để lấy thông tin lịch chiếu của 1 bộ phim
const getShowTimeMovie = async (maPhim) => {
    return await api.get(`QuanLyRap/LayThongTinLichChieuPhim?MaPhim=${maPhim}`)
}

// api dùng để get danh sách ghế
const getTickets = async (maLichChieu) => {
    return await api.get(`QuanLyDatVe/LayDanhSachPhongVe?MaLichChieu=${maLichChieu}`)
}

export const apiMovies = {
    getMovieDetail,
    getAllMovies,
    getShowTimeMovie,
    getTickets
}