import "./TripForm.scss";
import { useState } from "react";

const TripForm = ({ onSubmit }) => {
  const [suggestions, setSuggestions] = useState([]);
  const [tripDetails, setTripDetails] = useState({
    location: "",
    duration: 1,
    climate: "",
    month: "",
  });

  const fetchSuggestions = async (query) => {
    if (query.length < 3) return;
    try {
      // const response = await axios.get(
      //   `/api/location-suggestions?query=${query}`
      // );
      // setSuggestions(response.data.suggestions);
      setSuggestions(["Porto, Portugal", "Portugal", "Poland"]);
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

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(tripDetails);
  };

  return (
    <form className="trip-form" onSubmit={handleSubmit}>
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
            className="trip-form__btn-days trip-form__btn-days--decrease"
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
            className="trip-form__btn-days trip-form__btn-days--increase"
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

      <button type="submit" className="trip-form__submit">
        Generate Packing List
      </button>
    </form>
  );
};

export default TripForm;
