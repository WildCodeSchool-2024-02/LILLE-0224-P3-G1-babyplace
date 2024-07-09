const AbstractRepository = require("./AbstractRepository");

class NurseryRepository extends AbstractRepository {
  constructor() {
    // Call the constructor of the nursery class (AbstractRepository)
    // and pass the table name "nursery" as configuration
    super({ table: "nursery" });
  }

  // The C of CRUD - Create operation

  async create(nursery) {
    const [result] = await this.database.query(
      `insert into ${this.table} (nursery_name, nursery_role, nursery_street, nursery_street_number, latitude,longitude,city,capacity,price,nursery_phone, nursery_mail,image1, image2, image3, nursery_password, activity1, activity2, activity3, certification1, certification2, certification3, about) values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        nursery.nursery_name,
        nursery.nusery_role,
        nursery.nursery_street,
        nursery.nursery_street_number,
        nursery.latitude,
        nursery.longitude,
        nursery.city,
        nursery.capacity,
        nursery.price,
        nursery.nursery_phone,
        nursery.nursery_mail,
        nursery.image1,
        nursery.image2,
        nursery.image3,
        nursery.nursery_password,
        nursery.activity1,
        nursery.activity2,
        nursery.activity3,
        nursery.certification1,
        nursery.certification2,
        nursery.certification3,
        nursery.about,
      ]
    );

    // Return the ID of the newly inserted nursery
    return result.insertId;
  }

  // The Rs of CRUD - Read operations
  async readAll() {
    // Execute the SQL SELECT query to retrieve all nurseries from the "nursery" table
    const [rows] = await this.database.query(`select * from ${this.table}`);

    // Return all the nurseries
    return rows;
  }

  async read(id) {
    // Execute the SQL SELECT query to retrieve a specific nursery by its ID
    const [rows] = await this.database.query(
      `select * from ${this.table} where nursery_id = ?`,

      [id]
    );

    // Return the first row of the result, which represents the nursery
    return rows[0];
  }

  // The U of CRUD - Update operation
  // TODO: Implement the update operation to modify an existing nursery

  // async update(nursery) {
  //   ...
  // }

  // The D of CRUD - Delete operation
  // TODO: Implement the delete operation to remove a nursery by its ID

  // async delete(id) {
  //   ...
  // }
}

module.exports = NurseryRepository;
