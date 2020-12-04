exports.up = function(knex) {
  return knex.schema.hasTable("locations").then(function(exists) {
    if (!exists) {
      return knex.schema.createTable("locations", (table) => {
        table.increments().index();

        table.float("latitude");

        table.float("longitude");

        table.text("name").notNullable();

        table.text("state").notNullable();

        table.boolean("card");

        table.boolean("cash");

        table.boolean("park");

        table.boolean("shower");

        table.boolean("wifi");

        table.boolean("atm");

        table.boolean("mcd");

        table.boolean("sub");

        table.boolean("denny");

        table.boolean("br");
      });
    }
  });
};

exports.down = function(knex) {
  return knex.schema.hasTable("locations").then(function(exists) {
    if (exists) {
      return knex.schema.dropTable("locations");
    }
  });
};
