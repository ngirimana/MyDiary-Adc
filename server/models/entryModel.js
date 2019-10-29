import dotenv from 'dotenv';


dotenv.config();

class Entry {
  constructor(id, createOn, userid, title, description, updatedOn) {
    this.id = id;
    this.createOn = createOn;
    this.userid = userid;
    this.title = title;
    this.description = description;
    this.updatedOn = updatedOn;
  }
}
export default Entry;
