import api from "./apiUtils";

// API to book tickets
const bookTickets = async (data) => {
    return await api.post("QuanLyDatVe/DatVe", data);
};

export const apiTickets = {
    bookTickets,
};
