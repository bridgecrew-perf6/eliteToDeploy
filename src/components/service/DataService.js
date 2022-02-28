import http from "../../http-common";
class DataService {
    async getAll() {
        return await http.get("/articles");
    }
    async getAllAdmin(accessToken) {
        return await http.get("/admin", {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        })
    }
    get(id) {
        return http.get(`/articles/${id}`);
    }
    async create(data, accessToken) {
        return await http.post("/articles", data, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        });
    }
    async update(id, data, accessToken) {
        return await http.put(`/articles/${id}`, data, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        });
    }
    async delete(id, accessToken) {
        return await http.delete(`/articles/${id}`, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        });
    }
    async deleteAll(accessToken) {
        return await http.delete(`/articles`, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        });
    }
    findByTitle(title) {
        return http.get(`/articles?title=${title}`);
    }

    async uploadImage(data) {
        return await http.post(`/upload`, data)
    }
}
export default new DataService();