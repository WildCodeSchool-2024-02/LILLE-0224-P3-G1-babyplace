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
      `insert into ${this.table} (nursery_name,role, nursery_street, nursery_street_number, latitude,longitude,city,capacity,price,nursery_phone, nursery_mail,image1, image2, image3, nursery_password, activity1, activity2, activity3, certification1, certification2, certification3, about) values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        nursery.nursery_name,
        nursery.role,
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
        nursery.nursery_hashedPassword,
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
    const [nurseryRows] = await this.database.query(
      `SELECT * FROM ${this.table}`
    );

    if (nurseryRows.length === 0) {
      throw new Error(`Nurseries not found`);
    }

    // Fetch all bookings for all nurseries in parallel
    const nurseryIds = nurseryRows.map((nursery) => nursery.nursery_id);
    const bookingPromises = nurseryIds.map((nurseryId) =>
      this.fetchBookingsForNursery(nurseryId)
    );

    const bookingsArrays = await Promise.all(bookingPromises);

    // Combine nurseries with their respective bookings
    const nurseries = nurseryRows.map((nursery, index) => ({
      ...nursery,
      bookings: bookingsArrays[index],
    }));

    return nurseries;
  }

  async fetchBookingsForNursery(nurseryId) {
    const [bookingRows] = await this.database.query(
      `
      SELECT 
        bo.booking_operation_id,
        bo.booking_operation_date,
        bo.slots,
        bo.state,
        bo.parent_id,
        p.parent_firstname,
        p.parent_lastname,
        p.parent_adress,
        p.parent_phone,
        p.parent_mail,
        c.child_id,
        c.child_firstname,
        c.child_lastname,
        c.child_birth,
        c.walk_status,
        c.clean_status,
        al.gluten,
        al.fruitsacoque,
        al.crustaces,
        al.celeri,
        al.oeufs,
        al.moutarde,
        al.poissons,
        al.soja,
        al.lait,
        al.sulfites,
        al.sesame,
        al.lupin,
        al.arachides,
        al.mollusques,
        al.autres
      FROM 
        booking_operation bo
        LEFT JOIN parent p ON bo.parent_id = p.parent_id
        LEFT JOIN child c ON bo.child_id = c.child_id
        LEFT JOIN allergy al ON c.child_id = al.child_id
      WHERE 
        bo.nursery_id = ?
      `,
      [nurseryId]
    );

    const bookingsMap = {};

    // Transform rows into a structured bookings array
    bookingRows.forEach((row) => {
      if (!bookingsMap[row.booking_operation_id]) {
        bookingsMap[row.booking_operation_id] = {
          booking_operation_id: row.booking_operation_id,
          booking_operation_date: row.booking_operation_date,
          slots: row.slots,
          state: row.state,
          parent: {
            parent_id: row.parent_id,
            parent_firstname: row.parent_firstname,
            parent_lastname: row.parent_lastname,
            parent_adress: row.parent_adress,
            parent_phone: row.parent_phone,
            parent_mail: row.parent_mail,
          },
          child: {
            child_id: row.child_id,
            child_firstname: row.child_firstname,
            child_lastname: row.child_lastname,
            child_birth: row.child_birth,
            walk_status: row.walk_status,
            clean_status: row.clean_status,
            allergies: {
              gluten: row.gluten,
              fruitsacoque: row.fruitsacoque,
              crustaces: row.crustaces,
              celeri: row.celeri,
              oeufs: row.oeufs,
              moutarde: row.moutarde,
              poissons: row.poissons,
              soja: row.soja,
              lait: row.lait,
              sulfites: row.sulfites,
              sesame: row.sesame,
              lupin: row.lupin,
              arachides: row.arachides,
              mollusques: row.mollusques,
              autres: row.autres,
            },
          },
        };
      }
    });

    // Return array of bookings from the map
    return Object.values(bookingsMap);
  }

  async readByEmail(email) {
    // Execute the SQL SELECT query to retrieve a specific nursery by its ID
    const [nurseryRows] = await this.database.query(
      `SELECT * FROM ${this.table} WHERE nursery_mail = ?`,
      [email]
    );
    const nursery = nurseryRows[0];
    if (!nursery) {
      throw new Error(`Nursery with email ${email} not found`);
    }

    const [bookingRows] = await this.database.query(
      `
      SELECT 
        bo.booking_operation_id,
        bo.booking_operation_date,
        bo.slots,
        bo.state,
        bo.parent_id,
        p.parent_firstname,
        p.parent_lastname,
        p.parent_adress,
        p.parent_phone,
        p.parent_mail,
        c.child_id,
        c.child_firstname,
        c.child_lastname,
        c.child_birth,
        c.walk_status,
        c.clean_status,
        al.gluten,
        al.fruitsacoque,
        al.crustaces,
        al.celeri,
        al.oeufs,
        al.moutarde,
        al.poissons,
        al.soja,
        al.lait,
        al.sulfites,
        al.sesame,
        al.lupin,
        al.arachides,
        al.mollusques,
        al.autres
      FROM 
        booking_operation bo
        LEFT JOIN parent p ON bo.parent_id = p.parent_id
        LEFT JOIN child c ON bo.child_id = c.child_id
        LEFT JOIN allergy al ON c.child_id = al.child_id
      WHERE 
        bo.nursery_id = ?
    `,
      [nursery.nursery_id]
    );

    const bookingsMap = {};

    bookingRows.forEach((row) => {
      if (!bookingsMap[row.booking_operation_id]) {
        bookingsMap[row.booking_operation_id] = {
          booking_operation_id: row.booking_operation_id,
          booking_operation_date: row.booking_operation_date,
          slots: row.slots,
          state: row.state,
          parent: {
            parent_id: row.parent_id,
            parent_firstname: row.parent_firstname,
            parent_lastname: row.parent_lastname,
            parent_adress: row.parent_adress,
            parent_phone: row.parent_phone,
            parent_mail: row.parent_mail,
          },
          child: {
            child_id: row.child_id,
            child_firstname: row.child_firstname,
            child_lastname: row.child_lastname,
            child_birth: row.child_birth,
            walk_status: row.walk_status,
            clean_status: row.clean_status,
            allergies: {
              gluten: row.gluten,
              fruitsacoque: row.fruitsacoque,
              crustaces: row.crustaces,
              celeri: row.celeri,
              oeufs: row.oeufs,
              moutarde: row.moutarde,
              poissons: row.poissons,
              soja: row.soja,
              lait: row.lait,
              sulfites: row.sulfites,
              sesame: row.sesame,
              lupin: row.lupin,
              arachides: row.arachides,
              mollusques: row.mollusques,
              autres: row.autres,
            },
          },
        };
      }
    });

    return {
      ...nursery,
      bookings: Object.values(bookingsMap),
    };
  }

  async read(id) {
    const [nurseryRows] = await this.database.query(
      `SELECT * FROM ${this.table} WHERE nursery_id = ?`,
      [id]
    );
    const nursery = nurseryRows[0];

    if (!nursery) {
      throw new Error(`Nursery with id ${id} not found`);
    }

    const [bookingRows] = await this.database.query(
      `
      SELECT 
        bo.booking_operation_id,
        bo.booking_operation_date,
        bo.slots,
        bo.state,
        bo.parent_id,
        p.parent_firstname,
        p.parent_lastname,
        p.parent_adress,
        p.parent_phone,
        p.parent_mail,
        c.child_id,
        c.child_firstname,
        c.child_lastname,
        c.child_birth,
        c.walk_status,
        c.clean_status,
        al.gluten,
        al.fruitsacoque,
        al.crustaces,
        al.celeri,
        al.oeufs,
        al.moutarde,
        al.poissons,
        al.soja,
        al.lait,
        al.sulfites,
        al.sesame,
        al.lupin,
        al.arachides,
        al.mollusques,
        al.autres
      FROM 
        booking_operation bo
        LEFT JOIN parent p ON bo.parent_id = p.parent_id
        LEFT JOIN child c ON bo.child_id = c.child_id
        LEFT JOIN allergy al ON c.child_id = al.child_id
      WHERE 
        bo.nursery_id = ?
    `,
      [id]
    );

    const bookingsMap = {};

    bookingRows.forEach((row) => {
      if (!bookingsMap[row.booking_operation_id]) {
        bookingsMap[row.booking_operation_id] = {
          booking_operation_id: row.booking_operation_id,
          booking_operation_date: row.booking_operation_date,
          slots: row.slots,
          state: row.state,
          parent: {
            parent_id: row.parent_id,
            parent_firstname: row.parent_firstname,
            parent_lastname: row.parent_lastname,
            parent_adress: row.parent_adress,
            parent_phone: row.parent_phone,
            parent_mail: row.parent_mail,
          },
          child: {
            child_id: row.child_id,
            child_firstname: row.child_firstname,
            child_lastname: row.child_lastname,
            child_birth: row.child_birth,
            walk_status: row.walk_status,
            clean_status: row.clean_status,
            allergies: {
              gluten: row.gluten,
              fruitsacoque: row.fruitsacoque,
              crustaces: row.crustaces,
              celeri: row.celeri,
              oeufs: row.oeufs,
              moutarde: row.moutarde,
              poissons: row.poissons,
              soja: row.soja,
              lait: row.lait,
              sulfites: row.sulfites,
              sesame: row.sesame,
              lupin: row.lupin,
              arachides: row.arachides,
              mollusques: row.mollusques,
              autres: row.autres,
            },
          },
        };
      }
    });

    return {
      ...nursery,
      bookings: Object.values(bookingsMap),
    };
  }
  // The U of CRUD - Update operation

  async update(nursery) {
    // Execute the SQL UPDATE query to update a nursery from the 'nursery' table
    const [rows] = await this.database.query(
      `update ${this.table} set nursery_name = ?, nursery_street = ?, nursery_street_number = ?, latitude = ?, longitude = ?, city = ?, capacity = ?, price = ?, nursery_phone = ?, nursery_mail = ?, image1 = ?, image2 = ?, image3 = ?, nursery_password = ?, activity1 = ?, activity2 = ?, activity3 = ?, certification1 = ?, certification2 = ?, certification3 = ?,  where account_id = ?`,
      [
        nursery.nursery_name,
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
      ]
    );

    // Return how many rows were affected
    return rows;
  }

  async updateContact(nursery) {
    // eslint-disable-next-line camelcase
    const { nursery_id, capacity, price, nursery_phone, nursery_mail } =
      nursery;
    // Execute the SQL UPDATE query to update a nursery from the 'nursery' table
    const [rows] = await this.database.query(
      `update ${this.table} set capacity = ?, price = ?, nursery_phone = ?, nursery_mail = ? where nursery_id = ?`,
      // eslint-disable-next-line camelcase
      [capacity, price, nursery_phone, nursery_mail, nursery_id]
    );
    return rows;
  }
  // The D of CRUD - Delete operation

  async delete(id) {
    // Execute the SQL DELETE query to delete a nursery from the 'nursery' table
    const [rows] = await this.database.query(
      `delete from ${this.table} where nursery_id = ?`,
      [id]
    );
    // Return how many rows were affected
    return rows;
  }
}

module.exports = NurseryRepository;
