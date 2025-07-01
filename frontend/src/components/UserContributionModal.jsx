import React, { useEffect, useState } from "react";
import axios from "axios";
import { X } from "lucide-react";

const UserContributionsModal = ({ userId, isOpen, onClose }) => {
  const [contributions, setContributions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [totalVerified, setTotalVerified] = useState(0);
  const BASE_URL = import.meta.env.VITE_APP_BASE_URI;

  // Fetch whenever the modal opens or userId changes
  useEffect(() => {
    if (!isOpen || !userId) return;

    const fetchContributions = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get(
          `${BASE_URL}/api/contributions/user/${userId}`
        );

        setContributions(data);

        const verifiedTotal = data
          .filter((c) => c.status === "verified")
          .reduce((sum, c) => sum + c.amount, 0);

        setTotalVerified(verifiedTotal);
      } catch (err) {
        setError(
          err.response?.data?.message || "Could not load contributions."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchContributions();
  }, [isOpen, userId]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="relative w-full max-w-2xl rounded-2xl bg-white p-6 shadow-xl dark:bg-gray-900">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 rounded-full p-1 hover:bg-gray-200 dark:hover:bg-gray-500"
          aria-label="Close"
        >
          <X className="h-5 w-5" />
        </button>

        <h2 className="mb-4 text-2xl font-semibold">Your Contributions</h2>

        {loading && <p className="text-center">Loading…</p>}

        {error && <p className="text-center text-red-600">{error}</p>}

        {!loading && !error && (
          <>
            {contributions.length === 0 ? (
              <p className="text-center">No contributions yet.</p>
            ) : (
              <div className="space-y-4">
                <div className="max-h-72 overflow-y-auto">
                  <table className="min-w-full divide-y divide-gray-300 dark:divide-gray-700 text-sm">
                    <thead className="bg-gray-100 dark:bg-gray-800">
                      <tr>
                        <th className="px-4 py-2 text-left font-medium">
                          Date
                        </th>
                        <th className="px-4 py-2 text-left font-medium">
                          Amount&nbsp;(₦)
                        </th>
                        <th className="px-4 py-2 text-left font-medium">
                          Status
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
                      {contributions.map((c) => (
                        <tr key={c._id}>
                          <td className="px-4 py-2">
                            {new Date(c.date).toLocaleDateString()}
                          </td>
                          <td className="px-4 py-2">
                            ₦{c.amount.toLocaleString()}
                          </td>
                          <td className="px-4 py-2 capitalize">{c.status}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="flex justify-end">
                  <span className="text-lg font-semibold">
                    Total&nbsp;Verified:&nbsp;₦{totalVerified.toLocaleString()}
                  </span>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default UserContributionsModal;