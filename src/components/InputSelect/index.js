import PropTypes from "prop-types";
import React, { useState } from "react";
import {
  BoxSelectStyled,
  CssForm,
  CssMenuItem,
  CssSelect,
  SelectLabel,
} from "./styles";

function InputSelect({
  name,
  values,
  disabled,
  valueChange,
  label,
  changeValue,
  width,
  maxLength,
  testid,
}) {
  const [state, setState] = useState({
    value: values[0].label,
  });

  const handleChange = (event) => {
    setState(() => {
      return {
        value: event.target.value,
      };
    });
  };
  return (
    <>
      <BoxSelectStyled width={width}>
        <SelectLabel>{label}</SelectLabel>
        <CssForm>
          <CssSelect
            value={changeValue ? changeValue : state.value}
            disabled={disabled}
            onChange={(e) => {
              handleChange(e);
              valueChange({ [name]: e.target.value });
            }}
            key={name}
            inputProps={{
              "data-testid": testid,
            }}
          >
            {values.map((select) => {
              return (
                <CssMenuItem key={select.label} value={select.label}>
                  {select.label}
                </CssMenuItem>
              );
            })}
          </CssSelect>
        </CssForm>
      </BoxSelectStyled>
    </>
  );
}

InputSelect.defaultProps = {
  searchIcon: false,
  valueChange: () => {},
  changeValue: null,
  testid: "",
};

InputSelect.propTypes = {
  name: PropTypes.string.isRequired,
  values: PropTypes.array.isRequired,
  valueChange: PropTypes.func,
  changeValue: PropTypes.string,
  label: PropTypes.string,
  testid: PropTypes.string,
};

export default InputSelect;
