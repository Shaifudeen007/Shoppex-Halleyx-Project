import { jwtDecode } from 'jwt-decode';

function ImpersonationBanner() {
  try {
    const token = localStorage.getItem('token');
    if (token) {
      const decoded = jwtDecode(token);
      if (decoded.role === 'customer' && decoded.impersonatedByAdmin) {
        return (
          <div className="bg-yellow-300 p-2 text-center">
            Impersonation Mode Active
          </div>
        );
      }
    }
  } catch (e) {
    console.error("Invalid token or decoding failed", e);
  }

  return null;
}

export default ImpersonationBanner;
