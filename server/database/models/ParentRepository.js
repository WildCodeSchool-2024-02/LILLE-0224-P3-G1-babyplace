const AbstractRepository = require("./AbstractRepository");

class ParentRepository extends AbstractRepository {
  constructor() {
    // Call the constructor of the parent class (AbstractRepository)
    // and pass the table name "parent" as configuration
    super({ table: "parent" });
  }

  // The C of CRUD - Create operation

  async create(parent) {
    const [result] = await this.database.query(
      `insert into ${this.table} (parent_firstname, parent_role, parent_lastname, parent_adress, parent_phone, parent_mail, parent_password) values (?, ?, ?, ?, ?, ?, ?)`,
      [
        parent.parent_role,
        parent.parent_firstname,
        parent.parent_lastname,
        parent.parent_adress,
        parent.parent_phone,
        parent.parent_mail,
        parent.parent_password,
      ]
    );

    // Return the ID of the newly inserted parent
    return result.insertId;
  }

  // The Rs of CRUD - Read operations
  async readParentsAndChildrenId(id) {
    const [rows] = await this.database.query(
      `
      SELECT 
        p.parent_id,
        p.role AS parent_role,
        p.parent_firstname,
        p.parent_lastname,
        p.parent_adress,
        p.parent_phone,
        p.parent_mail,
        p.parent_password,
        c.child_id,
        c.child_firstname,
        c.child_lastname,
        c.child_birth,
        c.walk_status,
        c.clean_status
      FROM 
        parent p
        LEFT JOIN child c ON p.parent_id = c.parent_id
      WHERE 
        p.parent_id = ?
    `,
      [id]
    );

    // Transform the result into a more convenient format
    const parentsMap = {};

    rows.forEach((row) => {
      if (!parentsMap[row.parent_id]) {
        parentsMap[row.parent_id] = {
          parent_id: row.parent_id,
          parent_role: row.parent_role,
          parent_firstname: row.parent_firstname,
          parent_lastname: row.parent_lastname,
          parent_adress: row.parent_adress,
          parent_phone: row.parent_phone,
          parent_mail: row.parent_mail,
          parent_password: row.parent_password,
          children: [],
        };
      }
      if (row.child_id) {
        parentsMap[row.parent_id].children.push({
          child_id: row.child_id,
          child_firstname: row.child_firstname,
          child_lastname: row.child_lastname,
          child_birth: row.child_birth,
          walk_status: row.walk_status,
          clean_status: row.clean_status,
        });
      }
    });

    return Object.values(parentsMap);
  }

  async readBookingsId() {
    const [rows] = await this.database.query(`
      SELECT 
        bo.booking_operation_id,
        bo.booking_operation_date,
        bo.slots,
        bo.state,
        bo.nursery_id,
        bo.parent_id,
        bo.child_id AS children_id,
        c.child_firstname,
        c.child_lastname,
        n.nursery_id,
        n.role AS nursery_role,
        n.nursery_name,
        n.nursery_street,
        n.nursery_street_number,
        n.latitude,
        n.longitude,
        n.city,
        n.capacity,
        n.price,
        n.nursery_phone,
        n.nursery_mail,
        n.image1,
        n.image2,
        n.image3,
        n.activity1,
        n.activity2,
        n.activity3,
        n.certification1,
        n.certification2,
        n.certification3,
        n.about
      FROM 
        booking_operation bo
        LEFT JOIN nursery n ON bo.nursery_id = n.nursery_id
        LEFT JOIN child c ON bo.child_id = c.child_id
    `);

    return rows;
  }

  async read(id) {
    const parents = await this.readParentsAndChildrenId(id);
    const bookings = await this.readBookingsId();

    const bookingsMap = {};

    bookings.forEach((booking) => {
      if (!bookingsMap[booking.parent_id]) {
        bookingsMap[booking.parent_id] = [];
      }
      bookingsMap[booking.parent_id].push({
        booking_operation_id: booking.booking_operation_id,
        booking_operation_date: booking.booking_operation_date,
        slots: booking.slots,
        state: booking.state,
        children_id: booking.children_id,
        child_firstname: booking.child_firstname, // Ajouter le prénom de l'enfant
        child_lastname: booking.child_lastname, // Ajouter le nom de famille de l'enfant
        nursery: {
          nursery_id: booking.nursery_id,
          nursery_role: booking.nursery_role,
          nursery_name: booking.nursery_name,
          nursery_street: booking.nursery_street,
          nursery_street_number: booking.nursery_street_number,
          latitude: booking.latitude,
          longitude: booking.longitude,
          city: booking.city,
          capacity: booking.capacity,
          price: booking.price,
          nursery_phone: booking.nursery_phone,
          nursery_mail: booking.nursery_mail,
          image1: booking.image1,
          image2: booking.image2,
          image3: booking.image3,
          activity1: booking.activity1,
          activity2: booking.activity2,
          activity3: booking.activity3,
          certification1: booking.certification1,
          certification2: booking.certification2,
          certification3: booking.certification3,
          about: booking.about,
        },
      });
    });

    return parents.map((parent) => ({
      ...parent,
      bookings: bookingsMap[parent.parent_id] || [],
    }))[0];
  }

  async readParentsAndChildren() {
    const [rows] = await this.database.query(`
      SELECT 
        p.parent_id,
        p.role AS parent_role,
        p.parent_firstname,
        p.parent_lastname,
        p.parent_adress,
        p.parent_phone,
        p.parent_mail,
        p.parent_password,
        c.child_id,
        c.child_firstname,
        c.child_lastname,
        c.child_birth,
        c.walk_status,
        c.clean_status
      FROM 
        parent p
        LEFT JOIN child c ON p.parent_id = c.parent_id
    `);

    // Transform the result into a more convenient format
    const parentsMap = {};

    rows.forEach((row) => {
      if (!parentsMap[row.parent_id]) {
        parentsMap[row.parent_id] = {
          parent_id: row.parent_id,
          parent_role: row.parent_role,
          parent_firstname: row.parent_firstname,
          parent_lastname: row.parent_lastname,
          parent_adress: row.parent_adress,
          parent_phone: row.parent_phone,
          parent_mail: row.parent_mail,
          parent_password: row.parent_password,
          children: [],
        };
      }
      if (row.child_id) {
        parentsMap[row.parent_id].children.push({
          child_id: row.child_id,
          child_firstname: row.child_firstname,
          child_lastname: row.child_lastname,
          child_birth: row.child_birth,
          walk_status: row.walk_status,
          clean_status: row.clean_status,
        });
      }
    });

    return Object.values(parentsMap);
  }

  async readBookings() {
    const [rows] = await this.database.query(`
      SELECT 
        bo.booking_operation_id,
        bo.booking_operation_date,
        bo.slots,
        bo.state,
        bo.nursery_id,
        bo.parent_id,
        bo.child_id AS children_id,
        c.child_firstname,
        c.child_lastname,
        n.nursery_id,
        n.role AS nursery_role,
        n.nursery_name,
        n.nursery_street,
        n.nursery_street_number,
        n.latitude,
        n.longitude,
        n.city,
        n.capacity,
        n.price,
        n.nursery_phone,
        n.nursery_mail,
        n.image1,
        n.image2,
        n.image3,
        n.activity1,
        n.activity2,
        n.activity3,
        n.certification1,
        n.certification2,
        n.certification3,
        n.about
      FROM 
        booking_operation bo
        LEFT JOIN nursery n ON bo.nursery_id = n.nursery_id
        LEFT JOIN child c ON bo.child_id = c.child_id
    `);

    return rows;
  }

  async readAll() {
    const parents = await this.readParentsAndChildren();
    const bookings = await this.readBookings();

    const bookingsMap = {};

    bookings.forEach((booking) => {
      if (!bookingsMap[booking.parent_id]) {
        bookingsMap[booking.parent_id] = [];
      }
      bookingsMap[booking.parent_id].push({
        booking_operation_id: booking.booking_operation_id,
        booking_operation_date: booking.booking_operation_date,
        slots: booking.slots,
        state: booking.state,
        children_id: booking.children_id,
        child_firstname: booking.child_firstname, // Ajouter le prénom de l'enfant
        child_lastname: booking.child_lastname, // Ajouter le nom de famille de l'enfant
        nursery: {
          nursery_id: booking.nursery_id,
          nursery_role: booking.nursery_role,
          nursery_name: booking.nursery_name,
          nursery_street: booking.nursery_street,
          nursery_street_number: booking.nursery_street_number,
          latitude: booking.latitude,
          longitude: booking.longitude,
          city: booking.city,
          capacity: booking.capacity,
          price: booking.price,
          nursery_phone: booking.nursery_phone,
          nursery_mail: booking.nursery_mail,
          image1: booking.image1,
          image2: booking.image2,
          image3: booking.image3,
          activity1: booking.activity1,
          activity2: booking.activity2,
          activity3: booking.activity3,
          certification1: booking.certification1,
          certification2: booking.certification2,
          certification3: booking.certification3,
          about: booking.about,
        },
      });
    });

    return parents.map((parent) => ({
      ...parent,
      bookings: bookingsMap[parent.parent_id] || [],
    }));
  }

  // The U of CRUD - Update operation
  // TODO: Implement the update operation to modify an existing parent

  // async update(parent) {
  //   ...
  // }

  // The D of CRUD - Delete operation
  // TODO: Implement the delete operation to remove a parent by its ID

  // async delete(id) {
  //   ...
  // }
}

module.exports = ParentRepository;
