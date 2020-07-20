import PropTypes from "prop-types";
import React from "react";
import InputMask from "react-input-mask";
import { BoxInputStyled, CssTextField } from "./styles";
export function Input({
  width,
  label,
  name,
  height,
  value,
  onChange,
  disabled,
  mask,
  placeholder,
  maskPlaceholder,
  maxLength,
  testid,
}) {
  const handleChange = (event) => {
    onChange({
      [name]: event.target.value.replace(/[\D]+/g, ""),
    });
  };

  return (
    <>
      <InputMask mask={mask} maskChar={maskPlaceholder}>
        {(inputProps) => (
          <BoxInputStyled width={width} height={height}>
            <CssTextField
              {...inputProps}
              placeholder={placeholder}
              label={label}
              name={name}
              margin="normal"
              disabled={disabled}
              value={value}
              onChange={handleChange}
              inputProps={{
                maxLength,
                "data-testid": testid,
              }}
              key={name}
            />
          </BoxInputStyled>
        )}
      </InputMask>
    </>
  );
}

Input.defaultProps = {
  height: null,
  value: "",
  errorMessage: null,
  placeholder: null,
  maskPlaceholder: "",
  mask: null,
  valueSent: false,
  maxLength: null,
  testid: "",
};

Input.propTypes = {
  placeholder: PropTypes.string,
  width: PropTypes.number.isRequired,
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  height: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  mask: PropTypes.string,
  maskPlaceholder: PropTypes.string,
  maxLength: PropTypes.number,
  testid: PropTypes.string,
};

export default Input;
