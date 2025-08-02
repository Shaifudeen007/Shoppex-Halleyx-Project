import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import html2canvas from "html2canvas";

function ShopPage() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const [orderSummary, setOrderSummary] = useState(null);
  const summaryRef = useRef(null);
  const navigate = useNavigate(); // for navigating to homepage

  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")) || {});
  const [profile, setProfile] = useState({
    first_name: user?.first_name || "",
    last_name: user?.last_name || "",
    email: user?.email || "",
  });
  const [passwords, setPasswords] = useState({ current: "", new: "", confirm: "" });
  const customerId = user?._id;

  const fetchProducts = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/products");
      const data = Array.isArray(res.data) ? res.data : res.data.products;
      setProducts(data || []);
    } catch (error) {
      console.error("Failed to load products:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const addToCart = (product) => {
    const exists = cart.find((item) => item._id === product._id);
    if (!exists) setCart((prev) => [...prev, product]);
  };

  const placeOrder = async () => {
    if (cart.length === 0) return alert("Cart is empty!");

    try {
      const payload = {
        items: cart.map((item) => ({ productId: item._id, quantity: 1 })),
        customerId,
      };
      const res = await axios.post("http://localhost:5000/api/orders", payload);
      const orderId = res?.data?._id || "Unknown";
      const total = cart.reduce((sum, item) => sum + item.price, 0);

      setOrderSummary({
        orderId,
        total,
        itemCount: cart.length,
        timestamp: new Date().toLocaleString(),
      });
    } catch (error) {
      console.error("❌ Failed to place order:", error?.response?.data || error.message);
      alert("❌ Failed to place order.");
    }
  };

  const handleScreenshot = async () => {
    if (!summaryRef.current) return;
    const canvas = await html2canvas(summaryRef.current);
    const img = canvas.toDataURL("image/png");

    const link = document.createElement("a");
    link.download = `order_summary_${orderSummary.orderId}.png`;
    link.href = img;
    link.click();
  };

  const confirmClosePopup = () => {
    setCart([]);
    setOrderSummary(null);
  };

  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswords((prev) => ({ ...prev, [name]: value }));
  };

  const updateProfile = async () => {
    try {
      const res = await axios.put(`http://localhost:5000/api/customers/${user._id}`, profile);
      alert("Profile updated!");
      const updatedUser = { ...user, ...profile };
      setUser(updatedUser);
      localStorage.setItem("user", JSON.stringify(updatedUser));
    } catch (err) {
      alert("Failed to update profile.");
      console.error(err);
    }
  };

  const changePassword = async () => {
    if (passwords.new !== passwords.confirm) return alert("New passwords do not match.");
    try {
      const payload = {
        currentPassword: passwords.current,
        newPassword: passwords.new,
      };
      await axios.put(`http://localhost:5000/api/customers/${user._id}/change-password`, payload);
      alert("Password changed successfully!");
      setPasswords({ current: "", new: "", confirm: "" });
    } catch (err) {
      alert("Failed to change password.");
      console.error(err);
    }
  };

  return (
    <div className="bg-blue-50 min-h-screen p-6">
      {/* Go to Home Button */}
      <div className="flex justify-end mb-4">
        <button
          onClick={() => navigate("/")}
          className="bg-red-500 hover:bg-gray-600 text-white px-4 py-2 rounded"
        >
          Log out
        </button>
      </div>

      <h1 className="text-3xl font-bold text-center text-blue-700 mb-6">Shop Products</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* LEFT COLUMN: Profile Settings */}
        <div className="bg-white rounded-xl shadow p-6 col-span-1 space-y-6">
          <div>
            <h2 className="text-xl font-semibold mb-2 text-blue-600">My Profile</h2>
            {["first_name", "last_name", "email"].map((field) => (
              <div key={field} className="mb-3">
                <label className="text-sm block text-gray-700 mb-1 capitalize">
                  {field.replace("_", " ")}
                </label>
                <input
                  type={field === "email" ? "email" : "text"}
                  name={field}
                  value={profile[field]}
                  onChange={handleProfileChange}
                  className="w-full border rounded px-3 py-2 bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
            ))}
            <button
              onClick={updateProfile}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded py-2 mt-2 transition"
            >
              Save Changes
            </button>
          </div>

          <div className="border-t pt-4">
            <h3 className="text-blue-600 font-medium mb-2">Change Password</h3>
            {["current", "new", "confirm"].map((field) => (
              <input
                key={field}
                type="password"
                name={field}
                placeholder={field.charAt(0).toUpperCase() + field.slice(1) + " Password"}
                value={passwords[field]}
                onChange={handlePasswordChange}
                className="w-full mb-2 border rounded px-3 py-2 bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            ))}
            <button
              onClick={changePassword}
              className="w-full bg-blue-500 hover:bg-blue-600 text-white rounded py-2 mt-1"
            >
              Change Password
            </button>
          </div>
        </div>

        {/* RIGHT COLUMN: Product Listings */}
        <div className="lg:col-span-2">
          {cart.length > 0 && (
            <div className="mb-4 text-center">
              <p className="text-lg font-medium text-blue-800">{cart.length} item(s) in cart</p>
              <button
                onClick={placeOrder}
                className="mt-2 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
              >
                Place Order
              </button>
            </div>
          )}

          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
            {products.map((product) => (
              <div
                key={product._id}
                className="bg-white rounded-xl shadow-md hover:shadow-lg transition p-4"
              >
                <img
                  src={product.image?.trim() || "/placeholder.png"}
                  alt={product.name}
                  className="w-full h-48 object-cover rounded-lg"
                />
                <div className="mt-2">
                  <h2 className="text-lg font-semibold text-blue-800">{product.name}</h2>
                  <p className="text-sm text-gray-600 line-clamp-2 mb-2">
                    {product.description || "No description available."}
                  </p>
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-green-600">₹{product.price}</span>
                    <button
                      onClick={() => addToCart(product)}
                      className="bg-blue-500 hover:bg-blue-600 text-white text-sm px-3 py-1 rounded"
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Order Summary Modal */}
      {orderSummary && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div
            ref={summaryRef}
            className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md text-center"
          >
            <h2 className="text-xl font-bold mb-3 text-green-700">Order Placed Successfully 🎉</h2>
            <p><strong>Order ID:</strong> {orderSummary.orderId}</p>
            <p><strong>Items:</strong> {orderSummary.itemCount}</p>
            <p><strong>Total:</strong> ₹{orderSummary.total}</p>
            <p><strong>Date:</strong> {orderSummary.timestamp}</p>

            <div className="flex gap-4 justify-center mt-4">
              <button
                onClick={handleScreenshot}
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-1 rounded"
              >
                📸 Save Screenshot
              </button>
              <button
                onClick={confirmClosePopup}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ShopPage;
