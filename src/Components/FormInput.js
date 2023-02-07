const FormInput = ({
  handleInputChange,
  allValues,
  dataType,
  label,
  inputType,
  isChecked,
  placeholder,
}) => {
  if (inputType === "textarea") {
    return (
      <div className={"input-container " + dataType}>
        <label htmlFor={dataType}>{label}</label>
        <textarea
          name={dataType}
          id={dataType}
          cols="30"
          rows="10"
          value={allValues[dataType]}
          placeholder={placeholder}
          onChange={handleInputChange}
        ></textarea>
      </div>
    );
  } else {
    return (
      <div className={"input-container " + dataType}>
        <label htmlFor={dataType}>{label}</label>
        {dataType === "safetyRating" ? (
          <p>{allValues.safetyRating}</p>
        ) : undefined}
        <input
          type={inputType}
          id={dataType}
          onChange={handleInputChange}
          name={dataType}
          value={inputType === "checkbox" ? isChecked : allValues[dataType]}
          min={inputType === "range" ? 0 : undefined}
          max={inputType === "range" ? 5 : undefined}
          placeholder={placeholder}
        />
      </div>
    );
  }
};

export default FormInput;
