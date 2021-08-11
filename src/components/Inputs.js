/* eslint-disable react/jsx-props-no-spreading */
import React, { useCallback, useMemo, useState } from "react"
import styled from "styled-components"
import {
  primaryTextColor,
  secondaryColor,
  errorColor,
  secondaryTextColor,
} from "styles/colors"
import { body2Normal, label2Normal, body3Normal } from "styles/textTheme"
import { SearchIconButton, VisibilityIconButton } from "components/IconButtons"

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
  background: #fff;
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
      <div
        style={{
          display: "flex",
          flexFlow: "column",
          width: "fit-content",
          justifyContent: "flex-end",
        }}
      >
        {inputFn(isError)}
        {maxLength && (
          <LengthText color={color}>
            {currentLength} / {maxLength}
          </LengthText>
        )}
      </div>
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

export const CustomPasswordInput = ({
  labelText,
  errorText,
  placeholderText,
  size,
  onChange,
}) => {
  const [isVisible, setIsVisible] = useState()
  const [text, setText] = useState("")
  const [isFocus, setIsFocus] = useState(false)
  const secretText = useMemo(() => {
    return "*".repeat(text.length)
  }, [text])

  const onKeyDown = useCallback(
    (event) => {
      const { key } = event

      if (key === "Backspace" || key === "Delete") {
        setText(() => {
          return text.slice(0, -1)
        })
      }
    },
    [text]
  )
  const onKeyPress = useCallback(
    (event) => {
      setText(() => {
        return text + event.key
      })
    },
    [text]
  )
  const handleInputFocus = () => {
    setIsFocus(() => true)
  }
  const handleInputBlur = () => {
    setIsFocus(() => false)
    onChange(text)
  }

  return (
    <>
      <InputTemplete
        size={size}
        labelText={labelText}
        errorText={errorText}
        inputFn={(isError) => {
          return (
            <SuffixIconInputContainer isFocus={isFocus} isError={errorText != null}>
              <InnerInput
                size={size}
                isError={isError}
                placeholder={placeholderText}
                value={isVisible ? text : secretText}
                onKeyDown={(e) => onKeyDown(e)}
                onKeyPress={(e) => onKeyPress(e)}
                onFocus={() => handleInputFocus()}
                onBlur={() => handleInputBlur()}
              />
              <VisibilityIconButton
                isVisible={isVisible}
                onClick={() => {
                  setIsVisible((_isVisible) => !_isVisible)
                }}
              />
            </SuffixIconInputContainer>
          )
        }}
      />
    </>
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
