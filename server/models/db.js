import dotenv from 'dotenv';
import { Pool } from 'pg';

dotenv.config();
class Model {
  constructor(table) {
    this.table = table;

    this.pool = new Pool({
      connectionString: process.env.DATABASE_URL,
    });
  }

  async select(columns, clause, values) {
    const query = `SELECT ${columns} FROM ${this.table} WHERE ${clause}`;
    const { rows } = await this.pool.query(query, values);
    return rows;
  }

  async insert(columns, selector, values) {
    const query = `INSERT INTO ${this.table} (${columns}) VALUES (${selector}) returning *`;
    const { rows } = await this.pool.query(query, values);
    return rows;
  }

  async update(columns, clause, values) {
    const query = `UPDATE ${this.table} SET ${columns} WHERE ${clause} returning *`;
    const { rows } = await this.pool.query(query, values);
    return rows[0];
  }

  async delete(clause, values) {
    const query = `DELETE FROM ${this.table} WHERE ${clause} returning *`;
    const { rows } = await this.pool.query(query, values);
    return rows[0];
  }
}

export default Model;
