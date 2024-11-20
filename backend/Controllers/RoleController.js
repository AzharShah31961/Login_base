const Roles = require("../Models/Role_Model");

// CREATE: Add a new Role
async function createRole(req, res) {
  try {
    const { Rolename, Status } = req.body;
    const newRole = new Roles({ Rolename, Status });
    const savedRole = await newRole.save();
    res
      .status(201)
      .json({ message: "Role created successfully", data: savedRole });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

// READ: Get all Roles
async function getAllRoles(req, res) {
  try {
    const roles = await Roles.find();
    res.status(200).json({ data: roles });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// READ: Get a Role by ID
async function getRoleById(req, res) {
  try {
    const role = await Roles.findById(req.params.id);
    if (!role) {
      return res.status(404).json({ message: "Role not found" });
    }
    res.status(200).json({ data: role });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// UPDATE: Update a Role by ID
async function updateRole(req, res) {
  try {
    const { Rolename, Status } = req.body;
    const updatedRole = await Roles.findByIdAndUpdate(
      req.params.id,
      { Rolename, Status },
      { new: true, runValidators: true }
    );
    if (!updatedRole) {
      return res.status(404).json({ message: "Role not found" });
    }
    res
      .status(200)
      .json({ message: "Role updated successfully", data: updatedRole });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

// DELETE: Delete a Role by ID
async function deleteRole(req, res) {
  try {
    const deletedRole = await Roles.findByIdAndDelete(req.params.id);
    if (!deletedRole) {
      return res.status(404).json({ message: "Role not found" });
    }
    res.status(200).json({ message: "Role deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Export all functions as a module
module.exports = {
  createRole,
  getAllRoles,
  getRoleById,
  updateRole,
  deleteRole,
};
