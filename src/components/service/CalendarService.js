import http from "../../http-common";
class CalendarService {
    //async or not ?
     async getAllAppointments() {
        return http.get("/appointment")
    }

    async create(data) {
        return await http.post("/appointment", data);
    }

    async delete(id, accessToken) {
        return await http.delete(`/appointment/${id}`, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        });
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