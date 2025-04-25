import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { fireDB } from "../../firebaseConfig/firebaseConfig";
import { format } from "date-fns";

const CustomerDetails = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const querySnapshot = await getDocs(collection(fireDB, "user"));
        const userData = querySnapshot.docs
          .map((doc) => ({ id: doc.id, ...doc.data() }))
          .filter((user) => user.role === "user");

        setUsers(userData);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  const formatFirestoreTimestamp = (timestamp) => {
    const formattedTime = timestamp?.toDate().toLocaleString("en-IN", {
      dateStyle: "medium",
      timeStyle: "short",
    });
    return formattedTime;
  };

  return (
    <div className="min-h-screen bg-[#1a1b23] text-white px-8 py-10">
      <h2 className="text-2xl font-bold mb-6">All Customers</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {users.map((user) => (
          <div
            key={user.id}
            className="bg-[#2a2b37] p-5 rounded-lg shadow-md hover:scale-[1.01] hover:bg-[#343545] transition-all"
          >
            <h3 className="text-lg font-semibold">{user.name}</h3>
            <p>
              Email: <span className="text-gray-300">{user.email}</span>
            </p>
            <p>
              Phone:{" "}
              <span className="text-gray-300">{user.phone || "N/A"}</span>
            </p>
            <p>
              Joined:{" "}
              <span className="text-gray-300">
                {formatFirestoreTimestamp(user.time)}
              </span>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CustomerDetails;
