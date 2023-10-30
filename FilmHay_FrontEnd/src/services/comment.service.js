import createApiClient from "./api.service"

class commentService {
    constructor(baseUrl = "/api/comment") {
        this.api = createApiClient(baseUrl);
    }
    async getAll() {
        return (await this.api.get("/")).data;
    }
    async postCmt(data) {
        return (await this.api.post("/postCmt",data)).data;
    }
    async deleteAll() {
        return (await this.api.delete("/")).data;
    }
    async getCommentBySlug(data) {
        return (await this.api.post("/slug",data)).data;
    }
    async update(id, data) {
        return (await this.api.put(`/${id}`, data)).data;
    }
    async delete(id) {
        return (await this.api.delete(`/${id}`)).data;
        }
        

}

export default new commentService();