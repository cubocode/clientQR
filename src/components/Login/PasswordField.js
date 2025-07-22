import React, { useState } from 'react';
import { Form } from 'react-bootstrap';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

function PasswordField({ 
  label, 
  name, 
  value, 
  onChange, 
  required, 
  disabled,
  isValid,
  validationMessage
}) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <Form.Group className="mb-3">
      <Form.Label style={{ display: "flex", textAlign: "left" }}>
        {label}
      </Form.Label>
      <div className="position-relative">
        <Form.Control
          type={showPassword ? "text" : "password"}
          name={name}
          value={value}
          onChange={onChange}
          required={required}
          disabled={disabled}
          isInvalid={isValid === false}
          className={isValid === true ? "is-valid" : ""}
        />
        <button
          type="button"
          className="position-absolute"
          style={{
            right: "10px",
            top: "50%",
            transform: "translateY(-50%)",
            background: "none",
            border: "none",
            cursor: disabled ? "not-allowed" : "pointer",
            opacity: disabled ? 0.5 : 1
          }}
          onClick={() => !disabled && setShowPassword(!showPassword)}
        >
          {showPassword ? <FaEyeSlash /> : <FaEye />}
        </button>
      </div>
      {validationMessage && (
        <Form.Control.Feedback type={isValid ? "valid" : "invalid"}>
          {validationMessage}
        </Form.Control.Feedback>
      )}
    </Form.Group>
  );
}

export default PasswordField; 