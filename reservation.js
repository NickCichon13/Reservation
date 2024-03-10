const db = require("./db");

class Reservation {
    constructor({id, customerId, numGuests, startAt, notes}) {
      this.id = id;
      this.customerId = customerId;
      this.numGuests = numGuests;
      this.startAt = startAt;
      this.notes = notes;
    }
  
    /** formatter for startAt */
  
    getformattedStartAt() {
      return moment(this.startAt).format('MMMM Do YYYY, h:mm a');
    }
  
    /** given a customer id, find their reservations. */
  
    static async getReservationsForCustomer(customerId) {
      const results = await db.query(
            `SELECT id, 
             customer_id AS "customerId", 
             num_guests AS "numGuests", 
             start_at AS "startAt", 
             notes AS "notes"
           FROM reservations 
           WHERE customer_id = $1`,
          [customerId]
      );
  
      return results.rows.map(row => new Reservation(row));
    }

  async save(){
    if (this.id === undefined){

      const result = await db.query(
        `INSERT INTO reservation (start_at, num_guests, notes)
          VALUES ($1, $2, $3)
          RETURNING id`,
          [This.startAt, this.numGuests, this.notes]
      );
        this.id = result.rows[0].id;
    } else{
      await db.query(
        `UPDATE reservation SET start_at = $1, num_guests = $2, notes = $3
          WHERE id = $4`,
          [this.startAt, this.numGuests, this.notes, this.id]
      );
    }
  }
  }
  
  
  module.exports = Reservation;
  