import http from "../http-common";

class Userervice {
  findAllUsers() {
    return http.get("/users");
  }

  creatUsers(data: any) {
    return http.post("/users/", data);
  }

  updateUsers(data: any) {
    return http.put(`/users/${data.id}`, data);
  }

  findUser(id: any) {
    return http.get(`/users/${id}`);
  }

  deleteUser(id: any) {
    return http.delete(`/users/${id}`);
  }
}

export default new Userervice();
