import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PersonalInfoSection from "../Components/Personal Info/section";
import Myinfo from "../Components/Personal Info/Myinfo";
import PersonalInfoHeader from "../Components/Personal Info/PersonalinfoHeader";

function PersonalInfo() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const apiUrl = `${process.env.REACT_APP_API_BASE_URL}/user/`;
    const userId = localStorage.getItem("userId");
    const token = localStorage.getItem("token");

    if (!userId || !token) {
      navigate("/login");
      return;
    }

    fetch(`${apiUrl}${userId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(
            `Failed to fetch user information: ${response.status}`
          );
        }
        return response.json();
      })
      .then((data) => {
        setUser(data.getaUser);
        console.log("User data:", data);
      })
      .catch((error) => {
        console.error("Error fetching user:", error);
        navigate("/login");
      });
  }, [navigate]);

  return (
    <div className="ml-20">
      <PersonalInfoHeader />
      <div className="flex gap-10">
        <PersonalInfoSection info={user} />
        <Myinfo info={user} />
      </div>
    </div>
  );
}

export default PersonalInfo;
