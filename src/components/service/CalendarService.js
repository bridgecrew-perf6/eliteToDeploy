import http from "../../http-common";
class CalendarService {
    //async or not ?
     getAllAppointments() {
        return http.get("/appointment")
    }

    async create(data) {
        return await http.post("/appointment", data);
    }

    async delete(id) {
        return await http.delete(`/appointment/${id}`);
    }

    async update(id, data, accessToken) {
        return http.put(`/appointment/${id}`, data, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        })
    }
}

export default new CalendarService();