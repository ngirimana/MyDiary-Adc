import dotenv from 'dotenv';


dotenv.config();
export const entries = [];
class Entry {
  constructor(slug, createOn, userid, title, description, updatedOn) {
    this.slug = slug;
    this.createOn = createOn;
    this.userid = userid;
    this.title = title;
    this.description = description;
    this.updatedOn = updatedOn;
  }
}
export default Entry;
