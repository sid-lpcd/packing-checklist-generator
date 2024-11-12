import "./TripForm.scss";
import { useState } from "react";
import axios from "axios";

const TripForm = ({ isDarkMode }) => {
  // temp loading bar - needs update once having database
  const [loading, setLoading] = useState(false);

  const [suggestions, setSuggestions] = useState([]);
  const [tripDetails, setTripDetails] = useState({
    location: "",
    duration: 1,
    month: "",
  });

  const fetchSuggestions = async (query) => {
    if (query.length < 3) return;
    try {
      const response = await axios.get(
        `${
          import.meta.env.VITE_API
        }/api/trip/location-suggestions?query=${query}`
      );
      setSuggestions(response.data);
    } catch (error) {
      console.error("Error fetching location suggestions:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTripDetails({
      ...tripDetails,
      [name]: value,
    });
    if (name === "location") {
      fetchSuggestions(value);
    }
  };

  const handleDaysChange = (increment) => {
    setTripDetails({
      ...tripDetails,
      duration: Math.max(1, tripDetails.duration + increment), // Keep days at minimum 1
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true); // Start loading

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API}/api/trip`,
        tripDetails
      );
      console.log(response);
      // temp solution before databse implementation
      if (response.status === 201) {
        setPackingList(response.data.packingList);

        setLoading(false); // Stop loading

        // Navigate to another page and pass the data
        history.push({
          pathname: "/packing-list",
          state: { packingList: response.data.packingList }, // Pass data via state
        });
      }
    } catch (error) {
      console.error("Error generating packing list:", error);
    }
  };

  return (
    <form
      className={`trip-form ${isDarkMode ? "dark" : ""}`}
      onSubmit={handleSubmit}
    >
      <div className="trip-form__field">
        <label className="trip-form__label" htmlFor="location">
          Location
        </label>
        <input
          className="trip-form__input"
          type="text"
          id="location"
          name="location"
          value={tripDetails.location}
          onChange={handleChange}
          placeholder="Enter your destination"
          required
        />
      </div>
      {suggestions.length > 0 && (
        <ul className="trip-form__suggestions">
          {suggestions.map((suggestion, index) => (
            <li
              key={index}
              onClick={() => {
                setTripDetails({ ...tripDetails, location: suggestion });
                setSuggestions([]);
              }}
              className="trip-form__suggestion-item"
            >
              {suggestion}
            </li>
          ))}
        </ul>
      )}

      <div className="trip-form__field">
        <label className="trip-form__label" htmlFor="duration">
          Duration (days)
        </label>
        <div className="trip-form__days-input">
          <button
            type="button"
            onClick={() => handleDaysChange(-1)}
            className="trip-form__btn-days"
          >
            -
          </button>
          <input
            type="number"
            id="days"
            value={tripDetails.duration}
            readOnly
            className="trip-form__days-count"
          />
          <button
            type="button"
            onClick={() => handleDaysChange(1)}
            className="trip-form__btn-days"
          >
            +
          </button>
        </div>
      </div>

      <div className="trip-form__field">
        <label className="trip-form__label" htmlFor="month">
          Month of Travel
        </label>
        <select
          className="trip-form__select"
          id="month"
          name="month"
          value={tripDetails.month}
          onChange={handleChange}
          required
        >
          <option value="" disabled>
            Select travel month
          </option>
          {[
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December",
          ].map((month) => (
            <option key={month} value={month}>
              {month}
            </option>
          ))}
        </select>
      </div>

      <button
        type="submit"
        className="trip-form__btn-submit"
        disabled={loading}
      >
        {loading ? "Loading..." : "Generate Packing List"}
      </button>
    </form>
  );
};

export default TripForm;
