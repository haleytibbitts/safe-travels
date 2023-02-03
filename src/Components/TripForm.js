import { useState, useEffect } from "react";
import FormInput from "./FormInput";

const TripForm = ({
  handleSubmit,
  handleInputChange,
  allValues,
  handleChecked,
  isChecked,
}) => {
  return (
    <form
      action="submit"
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit();
      }}
    >
      <fieldset>
        <legend>Tell us about yourself!</legend>
        <FormInput
          label="First Name:"
          dataType="name"
          inputType="text"
          handleInputChange={handleInputChange}
          allValues={allValues}
        />
        <FormInput
          label="Pronouns:"
          dataType="pronouns"
          inputType="text"
          handleInputChange={handleInputChange}
          allValues={allValues}
        />
        <FormInput
          label="Age:"
          dataType="age"
          inputType="text"
          handleInputChange={handleInputChange}
          allValues={allValues}
        />
        <FormInput
          label="Gender Identity:"
          dataType="gender"
          inputType="text"
          handleInputChange={handleInputChange}
          allValues={allValues}
        />
        <FormInput
          label="Sexual Orientation:"
          dataType="sexuality"
          inputType="text"
          handleInputChange={handleInputChange}
          allValues={allValues}
        />
        <FormInput
          label="Ethnicity:"
          dataType="ethnicity"
          inputType="text"
          handleInputChange={handleInputChange}
          allValues={allValues}
        />
      </fieldset>
      <fieldset>
        <legend>Tell us about your trip!</legend>
        <FormInput
          label="City:"
          dataType="city"
          inputType="text"
          handleInputChange={handleInputChange}
          allValues={allValues}
        />
        <FormInput
          label="Country:"
          dataType="country"
          inputType="text"
          handleInputChange={handleInputChange}
          allValues={allValues}
        />
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
          handleInputChange={handleInputChange}
          allValues={allValues}
        />
        <FormInput
          dataType="advice"
          inputType="textarea"
          label="What advice would you give others planning a similar trip?"
          handleInputChange={handleInputChange}
          allValues={allValues}
        />
      </fieldset>
      <button
        onClick={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        Log My Trip!
      </button>
    </form>
  );
};

export default TripForm;
