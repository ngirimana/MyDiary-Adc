import dotenv from 'dotenv';


dotenv.config();

class User {
  constructor(id, firstName, lastName, email, password) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.password = password;
  }
}
export default User;
