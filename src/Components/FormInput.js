const FormInput = ({
  handleInputChange,
  allValues,
  dataType,
  label,
  inputType,
  isChecked,
}) => {
  if (inputType === "textarea") {
    return (
      <div className="input-container">
        <label htmlFor={dataType}>{label}</label>
        <textarea
          name={dataType}
          id={dataType}
          cols="30"
          rows="10"
          onChange={handleInputChange}
        ></textarea>
      </div>
    );
  } else {
    return (
      <div className="input-container">
        <label htmlFor={dataType}>{label}</label>
        <input
          type={inputType}
          id={dataType}
          onChange={handleInputChange}
          name={dataType}
          value={inputType === "checkbox" ? isChecked : allValues[dataType]}
          min={inputType === "range" ? 0 : undefined}
          max={inputType === "range" ? 5 : undefined}
          required="required"
        />
      </div>
    );
  }
};

export default FormInput;
