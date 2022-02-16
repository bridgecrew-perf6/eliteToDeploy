import http from "../../http-common";
class CalendarService {
    async getAllAppointments() {
        return await http.get("/appointment")
    }

    async create(data, accessToken) {
        return await http.post("/appointment", data, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        });
    }

    async delete(id) {
        return await http.delete(`/appointment/${id}`);
    }

    async update(id, data) {
        return await http.put(`/appointment/${id}`, data)
    }
}

export default new CalendarService();