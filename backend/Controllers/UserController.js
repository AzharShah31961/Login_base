const UserAccount = require("../Models/User_Model");

// CREATE: Add a new User
async function createUser(req, res) {
  try {
    const { name, email, password, role } = req.body;

    // Create a new user
    const newUser = new UserAccount({ name, email, password, role });
    const savedUser = await newUser.save();

    res.status(201).json({
      message: "User created successfully",
      data: savedUser,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

// READ: Get all Users
async function getAllUsers(req, res) {
  try {
    // Fetch all users and populate their roles
    const users = await UserAccount.find().populate("role", "Rolename");

    res.status(200).json({ data: users });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// READ: Get a User by ID
async function getUserById(req, res) {
  try {
    const user = await UserAccount.findById(req.params.id).populate(
      "role",
      "Rolename Status"
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ data: user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// UPDATE: Update a User by ID
async function updateUser(req, res) {
  try {
    const { name, email, password, role } = req.body;

    // Update the user
    const updatedUser = await UserAccount.findByIdAndUpdate(
      req.params.id,
      { name, email, password, role },
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      message: "User updated successfully",
      data: updatedUser,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

// DELETE: Delete a User by ID
async function deleteUser(req, res) {
  try {
    const deletedUser = await UserAccount.findByIdAndDelete(req.params.id);

    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Export all CRUD functions
module.exports = {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
};
