const Customer = require("../models/Customer");
const bcrypt = require("bcryptjs");

// Update customer profile
const updateCustomerProfile = async (req, res) => {
  try {
    const { id } = req.params;
    const { first_name, last_name, email } = req.body;

    const customer = await Customer.findById(id);
    if (!customer) return res.status(404).json({ message: "Customer not found" });

    customer.first_name = first_name || customer.first_name;
    customer.last_name = last_name || customer.last_name;
    customer.email = email || customer.email;

    await customer.save();
    res.status(200).json({ message: "Profile updated successfully", customer });
  } catch (error) {
    console.error("Update profile error:", error);
    res.status(500).json({ message: "Failed to update profile" });
  }
};

// Change customer password
const changeCustomerPassword = async (req, res) => {
  try {
    const { id } = req.params;
    const { currentPassword, newPassword } = req.body;

    const customer = await Customer.findById(id);
    if (!customer) return res.status(404).json({ message: "Customer not found" });

    const isMatch = await bcrypt.compare(currentPassword, customer.password);
    if (!isMatch) return res.status(400).json({ message: "Incorrect current password" });

    const salt = await bcrypt.genSalt(10);
    customer.password = await bcrypt.hash(newPassword, salt);

    await customer.save();
    res.status(200).json({ message: "Password changed successfully" });
  } catch (error) {
    console.error("Change password error:", error);
    res.status(500).json({ message: "Failed to change password" });
  }
};

module.exports = {
  updateCustomerProfile,
  changeCustomerPassword,
};
