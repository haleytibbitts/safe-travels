import { useState, useEffect } from "react";
import FormInput from "./FormInput";
import LoggedModal from "./LoggedModal";

const TripForm = ({
  handleSubmit,
  handleInputChange,
  allValues,
  handleChecked,
  isChecked,
  countryData,
}) => {
  const [openModal, setOpenModal] = useState(false);

  return (
    <form
      action="submit"
      className="trip-form wrapper"
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit();
      }}
    >
      <legend>Tell us about yourself!</legend>
      <fieldset id="userQs" className="userQs">
        <FormInput
          label="First Name:"
          dataType="name"
          inputType="text"
          placeholder="Carmen Sandiego"
          handleInputChange={handleInputChange}
          allValues={allValues}
        />
        <FormInput
          label="Pronouns:"
          dataType="pronouns"
          inputType="text"
          placeholder="she/her"
          handleInputChange={handleInputChange}
          allValues={allValues}
        />
        <FormInput
          label="Age:"
          dataType="age"
          inputType="text"
          placeholder="54"
          handleInputChange={handleInputChange}
          allValues={allValues}
        />
        <FormInput
          label="Gender Identity:"
          dataType="gender"
          inputType="text"
          placeholder="Cisgender Woman"
          handleInputChange={handleInputChange}
          allValues={allValues}
        />
        <FormInput
          label="Sexual Orientation:"
          dataType="sexuality"
          inputType="text"
          placeholder="Lesbian"
          handleInputChange={handleInputChange}
          allValues={allValues}
        />
        <FormInput
          label="Ethnicity:"
          dataType="ethnicity"
          inputType="text"
          placeholder="Hispanic"
          handleInputChange={handleInputChange}
          allValues={allValues}
        />
      </fieldset>
      <legend>Tell us about your trip!</legend>
      <fieldset id="tripQs" className="tripQs">
        <div className="input-container">
          <label htmlFor="country">Country:</label>
          <select id="country" name="country" onChange={handleInputChange}>
            <option value="">Select:</option>
            {countryData.length
              ? countryData.map((container, indexNumber) => {
                  return (
                    <option
                      key={container.country + indexNumber + "log"}
                      value={container.country}
                    >
                      {container.country}
                    </option>
                  );
                })
              : undefined}
          </select>
        </div>
        <div className="input-container">
          <label htmlFor="city">City:</label>
          <select id="city" name="city" onChange={handleInputChange}>
            <option value="">Select:</option>
            {countryData.length
              ? countryData.map((container) => {
                  if (container.country === allValues.country) {
                    return container.cities.map((city) => {
                      return (
                        <option key={city + allValues.country} value={city}>
                          {city}
                        </option>
                      );
                    });
                  }
                })
              : undefined}
          </select>
        </div>
        <FormInput
          dataType="arrivalDate"
          inputType="date"
          label="Date of Arrival:"
          handleInputChange={handleInputChange}
          allValues={allValues}
        />
        <FormInput
          dataType="returnDate"
          inputType="date"
          label="Date of Return:"
          handleInputChange={handleInputChange}
          allValues={allValues}
        />
        <FormInput
          dataType="partnered"
          inputType="checkbox"
          label="Were you partnered?"
          handleInputChange={handleInputChange}
          isChecked={isChecked}
        />
        <FormInput
          dataType="safetyRating"
          inputType="range"
          label="Safety Rating:"
          handleInputChange={handleInputChange}
          allValues={allValues}
        />
        <FormInput
          dataType="faves"
          inputType="textarea"
          label="What were the highlights of your trip?"
          placeholder="My favourite restaurant, the best views, the cheapest places to stay, the coolest things to see..."
          handleInputChange={handleInputChange}
          allValues={allValues}
        />
        <FormInput
          dataType="advice"
          inputType="textarea"
          label="What advice would you give others planning a similar trip?"
          placeholder="Make sure you *do this* before going *here*! Also, do NOT go *here*!"
          handleInputChange={handleInputChange}
          allValues={allValues}
        />
        <button
          className="log-trip"
          onClick={(e) => {
            e.preventDefault();
            handleSubmit();
            setOpenModal(true);
          }}
        >
          Log My Trip!
        </button>
      </fieldset>
      {openModal ? (
        <LoggedModal
          openModal={openModal}
          setOpenModal={setOpenModal}
          allValues={allValues}
        />
      ) : undefined}
    </form>
  );
};

export default TripForm;
