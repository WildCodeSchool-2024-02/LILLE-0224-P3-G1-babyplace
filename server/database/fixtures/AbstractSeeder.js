// Import database client
const database = require("../client");

// Declare an object to store created objects from their names
const refs = {};

class AbstractSeeder {
  constructor({ table, truncate = true, dependencies = [] }) {
    // thx https://www.codeheroes.fr/2017/11/08/js-classes-abstraites-et-interfaces/
    if (this.constructor === AbstractSeeder) {
      throw new TypeError(
        "Abstract class 'AbstractSeed' cannot be instantiated directly"
      );
    }

    this.table = table;

    this.truncate = truncate;

    this.dependencies = dependencies;

    this.promises = [];

    this.refs = refs;
  }

  async #doInsert(data) {
    // Extract ref name (if it exists)
    const { refName, ...values } = data;

    // Prepare the SQL statement: "insert into <table>(<fields>) values (<placeholders>)"
    const fields = Object.keys(values).join(",");
    const placeholders = new Array(Object.keys(values).length)
      .fill("?")
      .join(",");

    const sql = `insert into ${this.table}(${fields}) values (${placeholders})`;

    // Perform the query and if applicable store the insert id given the ref name
    const [result] = await database.query(sql, Object.values(values));

    if (refName != null) {
      const { insertId } = result;

      refs[refName] = { ...values, insertId };
    }
  }

  insert(data) {
    this.promises.push(this.#doInsert(data));
  }

  async truncateTable() {
    if (this.truncate) {
      await database.query(`TRUNCATE TABLE ${this.table}`);
    }
  }

  async runDependencies() {
    await Promise.all(
      this.dependencies.map(async (Dependency) => {
        const dep = new Dependency();
        await dep.seed();
      })
    );
  }

  // eslint-disable-next-line class-methods-use-this
  async run() {
    throw new Error("You must implement this function");
  }

  async seed() {
    await this.runDependencies();
    await this.truncateTable();
    await this.run();
    await Promise.all(this.promises);
  }

  // eslint-disable-next-line class-methods-use-this
  getRef(name) {
    return refs[name];
  }
}

// Ready to export
module.exports = AbstractSeeder;
