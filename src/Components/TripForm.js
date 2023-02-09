import { BiBookHeart, BiInfoCircle } from "react-icons/bi";
import AnimatedPage from "./AnimatedPage";
import FormInput from "./FormInput";
import Swal from "sweetalert2";

const TripForm = ({
  handleSubmit,
  handleInputChange,
  allValues,
  handleChecked,
  isChecked,
  countryData,
}) => {
  // Ensure that users fill out all fields before submission can be processed
  const validateForm = () => {
    if (
      allValues.name &&
      allValues.pronouns &&
      allValues.age &&
      allValues.gender &&
      allValues.sexuality &&
      allValues.ethnicity &&
      allValues.country &&
      allValues.city &&
      allValues.arrivalDate &&
      allValues.returnDate &&
      allValues.faves &&
      allValues.advice
    ) {
      handleSubmit();
      Swal.fire(tripLogged);
    } else {
      Swal.fire(formError);
    }
  };

  // Alert to inform user submission was successful
  const tripLogged = {
    title: `Thanks, ${allValues.name}!`,
    text: ` Your trip to ${allValues.city} has been recorded.`,
    color: "#fff",
    icon: "success",
    iconColor: "#fff",
    background: `linear-gradient(
      90deg,
      rgb(28, 127, 238) 25%,
      rgb(95, 21, 242) 50%,
      rgb(186, 12, 248) 75%,
      rgb(251, 7, 217) 100%
    )`,
    confirmButtonColor: "#000",
  };

  // Alert to inform user that they missed some fields
  const formError = {
    title: `Oops!`,
    text: `Please fill out all of the fields.`,
    color: "#fff",
    icon: "warning",
    iconColor: "#fff",
    background: `linear-gradient(
      90deg,
      rgb(28, 127, 238) 25%,
      rgb(95, 21, 242) 50%,
      rgb(186, 12, 248) 75%,
      rgb(251, 7, 217) 100%
    )`,
    confirmButtonColor: "#000",
  };

  // Informational pop-up explaining why they need to include their personal details
  const formInfo = {
    title: `"Why are the details about my identity important?"`,
    text: `Our identities shape how we navigate and experience the world around us. This can be a blessing, but it can also be a great source of anxiety for many marginalized folks when it comes to traveling. By sharing your details and a first-hand account of your experiences, you can help other members of your community see what different parts of the world are like from your shared perspective.`,
    color: "#fff",
    icon: "info",
    iconColor: "#fff",
    background: `linear-gradient(
      90deg,
      rgb(28, 127, 238) 25%,
      rgb(95, 21, 242) 50%,
      rgb(186, 12, 248) 75%,
      rgb(251, 7, 217) 100%
    )`,
    confirmButtonColor: "#000",
  };

  return (
    <AnimatedPage>
      <form
        action="submit"
        className="trip-form wrapper"
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        <legend>Tell us about yourself!</legend>
        <fieldset id="userQs" className="user-qs">
          <FormInput
            label="First Name:"
            dataType="name"
            inputType="text"
            placeholder="Carmen (Sandiego)"
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
          <BiInfoCircle
            className="icon"
            aria-label="Information about form"
            onClick={(e) => {
              e.preventDefault();
              Swal.fire(formInfo);
            }}
          />
        </fieldset>
        <legend id="tripQ-start">Tell us about your trip!</legend>
        <fieldset id="tripQs" className="trip-qs">
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
              validateForm();
            }}
          >
            <BiBookHeart className="icon" />
            Log My Trip!
          </button>
        </fieldset>
      </form>
    </AnimatedPage>
  );
};

export default TripForm;
