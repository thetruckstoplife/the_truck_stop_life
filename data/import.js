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

      let mcd = false; //mcdonald's
      let sub = false; //subway
      let denny = false; //denny's
      let br = false; //31

      for (const able of location.Site.Concepts) {
        if (!mcd) {
          mcd = able.Concept.Name === "McDonald's";
        }
        if (!sub) {
          sub = able.Concept.Name === "Subway";
        }
        if (!denny) {
          denny = able.Concept.Name === "Denny's";
        }
        if (!br) {
          br = able.Concept.Name === "Baskin Robbins";
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
        mcd,
        sub,
        denny,
        br,
      });
      console.log(result);
    }
  } catch (err) {
    console.error("Error inserting records", err);
  }
})();
