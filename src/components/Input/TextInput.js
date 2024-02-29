import React from "react";
import { useFormContext } from "react-hook-form";
import styled from "styled-components";
const TextInput = ({ width, onKeyUp, className, onBlur, defaultValue, value, type, name, required, validate, pattern, placeholder, disabled, readOnly, maxLength, minLength, autoFocus}) => {
  const { register } = useFormContext();
  return (
    <>
      <TextBasic
        width={width}
        type={type}
        name={name}
        placeholder={placeholder}
        disabled={disabled}
        readOnly={readOnly}
        value={value}
        defaultValue={defaultValue}
        className={className}
        autoFocus={autoFocus}
        onKeyUp={onKeyUp}
        {...register(name, {
          required: required,
          validate: validate,
          pattern: pattern,
          onBlur: onBlur,
          maxLength: maxLength,
          minLength: minLength
        })}
      />
    </>
  )
}
export default TextInput;

const TextBasic = styled.input`
  width: ${props => props.width ? props.width : '100%'};
  border: 1px solid #CFD4DA;
  height: 36px;
  border-radius: 4px;
  font-weight: 300;
  position: relative;
  padding: 8px 12px;
  ::placeholder {
    color: #D0D0D0;
  }

`;
