const fs = require("fs");
const db = require("../server/knex.js");

(async () => {
  try {
    const locations = JSON.parse(fs.readFileSync("./data/locations.json"));
    for (const location of locations) {
      const id = location.Site.SiteId;
      const latitude = location.Site.Latitude;
      const longitude = location.Site.Longitude;
      const name = location.Site.SiteName;
      const state = location.Addresses[0].State;
      //
      let card = false; //alltrue
      let cash = false; //alltrue
      for (const pay of location.AcceptedPaymentTypes) {
        if (!card) {
          card = pay.SiteManagementItem.Title === "All Major Credit Cards";
        }
        if (!cash) {
          cash = pay.SiteManagementItem.Title === "Cash Accepted";
        }
      }
      //
      let park = false; //24-Hour-Parking
      for (const service of location.AdditionalAmenities) {
        if (!park) {
          park = service.SiteManagementItem.Title === "Overnight Parking";
        }
      }

      let shower = false; //Shower
      let wifi = false; //Wifi
      let atm = false; //atm !seems like all true
      for (const able of location.CustomFields) {
        if (!shower) {
          shower = able.CustomField.Name === "PrivateShowers";
        }
        if (!wifi) {
          wifi = able.CustomField.Name === "WirelessInternet";
        }
        if (!atm) {
          atm = able.CustomField.Name === "ATM";
        }
      }

      const result = await db("locations").insert({
        id,
        latitude,
        longitude,
        name,
        state,
        card,
        cash,
        park,
        shower,
        wifi,
        atm,
      });
      console.log(result);
    }
  } catch (err) {
    console.error("Error inserting records", err);
  }
})();
