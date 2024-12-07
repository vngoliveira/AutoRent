import React from "react";

const FormField = ({ label, type, value, onChange }) => {
  return (
    <div>
      <label>
        {label}
        <input type={type} value={value} onChange={onChange} required />
      </label>
    </div>
  );
};

export default FormField;
