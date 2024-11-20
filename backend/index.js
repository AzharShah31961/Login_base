const express = require("express");
const app = express();

const ConnectionDB = require("./Config/Database");
require("dotenv").config();

// MIDDLE WARE

app.use(express.json());

// API CALL KI HA CONTROLLERS SE
const {
  createRole,
  getAllRoles,
  getRoleById,
  updateRole,
  deleteRole,
} = require("./Controllers/RoleController");

const {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
} = require("./Controllers/UserController");

// ROUTE DEFIEN KIYE HA

app.route("/").get(getAllRoles).post(createRole);
app.route("/role/:id").delete(deleteRole).put(updateRole);

app.route("/user").get(getAllUsers).post(createUser);
app.route("/user/:id").delete(deleteUser).put(updateUser);

// PAGE LISTEN // MATLAB PAGE KO RUN KARNE KELIYE PORT DALE GA YAHA

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
  ConnectionDB();
});
