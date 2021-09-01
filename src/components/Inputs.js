/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from "react"
import styled from "styled-components"
import {
  primaryTextColor,
  secondaryColor,
  errorColor,
  secondaryTextColor,
} from "styles/colors"
import { body2Normal, label2Normal, body3Normal } from "styles/textTheme"
import { SearchIconButton } from "components/IconButtons"

const Input = styled.input`
  display: flex;
  width: 320px;
  height: fit-content;
  box-sizing: border-box;
  padding: ${(props) => (props.size === "small" ? "14px" : "16px")};
  margin: 0;
  align-items: center;
  border: 1px solid ${(props) => (props.isError ? errorColor : primaryTextColor)};
  border-radius: 4px;
  &:focus {
    border-color: ${secondaryColor};
    outline: none;
  }
  ${(props) => (props.size === "small" ? body3Normal : body2Normal)}
  ::placeholder {
    color: ${secondaryTextColor};
  }
`

const InnerInput = styled(Input)`
  border: none;
  flex: 1;
  &:focus {
    border-color: ${secondaryColor};
    outline: none;
  }
`

const SuffixIconInputContainer = styled.div`
  display: flex;
  max-width: 400px;
  width: 100%;
  height: fit-content;
  box-sizing: border-box;
  margin: 0;
  align-items: center;
  border-width: 1px;
  border-style: solid;
  border-color: ${(props) =>
    props.isError ? errorColor : props.isFocus ? secondaryColor : primaryTextColor};
  border-radius: 4px;
  background: white;
  padding-right: 4px;
`

const LabelText = styled.div`
  display: inline-block;
  padding-bottom: 10px;
  padding-left: 1px;
  ${body3Normal}
  color: ${(props) => props.color};
`

const ErrorText = styled.div`
  display: ${(props) => (props.visible ? "flex" : "none")};
  width: 100%;
  padding-top: 10px;
  ${label2Normal}
  color: ${errorColor};
`

const LengthText = styled.div`
  display: inline-block;
  text-align: right;
  font-size: 13px;
  padding-top: 6px;
  padding-right: 4px;
  color: ${(props) => props.color};
`

const InputWrapper = styled.div`
  display: flex;
  flex-flow: column;
  width: fit-content;
  justify-content: flex-end;
`

export const InputTemplete = ({
  labelText,
  errorText,
  inputFn,
  size,
  className,
  currentLength = 0,
  maxLength,
  color = primaryTextColor,
}) => {
  const isError = errorText != null
  return (
    <div className={className} style={{ width: "fit-content" }}>
      {labelText && (
        <LabelText size={size} color={color}>
          {labelText}
        </LabelText>
      )}
      <InputWrapper>
        {inputFn(isError)}
        {maxLength && (
          <LengthText color={color}>
            {currentLength} / {maxLength}
          </LengthText>
        )}
      </InputWrapper>
      <ErrorText visible={isError}>{errorText || ""}</ErrorText>
    </div>
  )
}

export const OutlineInput = ({
  value,
  defaultValue,
  labelText,
  errorText,
  placeholderText,
  size,
  onChange,
  readOnly,
  className,
  maxLength,
  color,
}) => {
  const [length, setLength] = useState(0)
  return (
    <InputTemplete
      className={className}
      size={size}
      labelText={labelText}
      errorText={errorText}
      currentLength={length}
      maxLength={maxLength}
      color={color}
      inputFn={(isError) => {
        return (
          <Input
            isError={isError}
            placeholder={placeholderText}
            size={size}
            onChange={(e) => {
              const data = e.target.value
              setLength(data.length)
            }}
            onBlur={(e) => onChange(e.target.value)}
            readOnly={readOnly}
            {...(value != null ? { value } : { defaultValue })}
            maxLength={maxLength}
          />
        )
      }}
    />
  )
}

export const PasswordInput = ({
  labelText,
  errorText,
  placeholderText,
  size,
  onChange,
  color,
}) => {
  return (
    <InputTemplete
      size={size}
      labelText={labelText}
      errorText={errorText}
      color={color}
      inputFn={(isError) => {
        return (
          <Input
            type="password"
            isError={isError}
            placeholder={placeholderText}
            size={size}
            onBlur={(e) => onChange(e.target.value)}
          />
        )
      }}
    />
  )
}

export const SearchInput = ({
  value,
  defaultValue,
  labelText,
  errorText,
  placeholderText,
  onSearch,
  size,
  className,
}) => {
  const [isFocus, setIsFocus] = useState(false)
  const [searchData, setSearchData] = useState(defaultValue || value)

  const handleInputFocus = () => {
    setIsFocus(() => true)
  }
  const handleInputBlur = (data) => {
    setIsFocus(() => false)
    setSearchData(() => data)
  }

  return (
    <InputTemplete
      className={className}
      size={size}
      labelText={labelText}
      errorText={errorText}
      inputFn={(isError) => {
        return (
          <SuffixIconInputContainer isFocus={isFocus}>
            <InnerInput
              size={size}
              isError={isError}
              placeholder={placeholderText}
              onFocus={() => handleInputFocus()}
              onBlur={(event) => handleInputBlur(event.target.value)}
              {...(value != null ? { value } : { defaultValue })}
            />
            <SearchIconButton onClick={() => onSearch(searchData)} />
          </SuffixIconInputContainer>
        )
      }}
    />
  )
}
