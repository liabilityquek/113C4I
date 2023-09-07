const express = require("express");
const app = express();
const port = 4000;
const path = require("path");
const cors = require('cors');
const { createUser, resetPassword } = require('../../../lib/userController');
const { createDriver, amendDriver, deleteDriver } = require('../../../lib/driverController');
const { createVehicle, amendVehicle, tagVehicle, deleteVehicle } = require('../../../lib/vehicleController');
const { getUpdatesHistory } = require('../../../lib/updatesHistoryController');

const NEXTAUTH_URL = process.env.NEXT_PUBLIC_NEXTAUTH_URL


app.use(express.json());
app.use(express.static(path.join(__dirname, "dist")));
app.use(cors({
  origin: `${NEXTAUTH_URL}`
}))

app.get("/api/server/driver-updates/:toId", getUpdatesHistory);
app.post("/api/server/user", createUser);
app.post("/api/server/reset-password", resetPassword);
app.post("/api/server/create-driver", createDriver);
app.post("/api/server/create-vehicle", createVehicle);
app.put("/api/server/amend-vehicle/:vehicleId", amendVehicle);
app.put("/api/server/amend-driver/:userId/:id", amendDriver);
app.patch("/api/server/tag-vehicle/:vehicleId", tagVehicle);
app.delete("/api/server/delete-driver/:id", deleteDriver);
app.delete("/api/server/delete-vehicle/:vehicleId", deleteVehicle);


app.listen(port, () => {
  console.log(`113C4I app listening on port ${port}`);
});

module.exports = app;