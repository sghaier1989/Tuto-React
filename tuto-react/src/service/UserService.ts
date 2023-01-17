import http from '../http-common';

const baseUrl = "localhost:3000/users"

class Userervice {

 findAllUsers() {
	return http.get('/' );
}

findUser(id: any) {
	return http.get(`/${id}` );
}

deleteUser(id: any) {
	return http.delete(`/${id}` );
}
  

}

export default new Userervice();
