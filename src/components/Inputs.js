import React, { useCallback, useMemo, useState } from "react"
import styled from "styled-components"
import {
  primaryTextColor,
  secondaryColor,
  errorColor,
  secondaryTextColor,
} from "styles/colors"
import { body1Normal, body2Normal, label2Normal, body3Normal } from "styles/textTheme"
import { SearchIconButton, VisibilityIconButton } from "components/IconButtons"

const Input = styled.input`
  display: flex;
  max-width: 400px;
  width: 100%;
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
  display: flex;
  padding-bottom: 10px;
  ${(props) => (props.size === "small" ? body3Normal : body1Normal)}
`

const ErrorText = styled.div`
  display: ${(props) => (props.visible ? "flex" : "none")};
  width: 100%;
  padding-top: 10px;
  ${label2Normal}
  color: ${errorColor};
`

export const InputTemplete = ({ labelText, errorText, inputFn, size }) => {
  const isError = errorText != null
  return (
    <>
      {labelText && <LabelText size={size}>{labelText}</LabelText>}
      {inputFn(isError)}
      <ErrorText visible={isError}>{errorText || "1"}</ErrorText>
    </>
  )
}

export const OutlineInput = ({
  labelText,
  errorText,
  placeholderText,
  size,
  onChange,
}) => {
  return (
    <InputTemplete
      size={size}
      labelText={labelText}
      errorText={errorText}
      inputFn={(isError) => {
        return (
          <Input
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

export const PasswordInput = ({
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
  labelText,
  errorText,
  placeholderText,
  onSearch,
  size,
}) => {
  const [isFocus, setIsFocus] = useState(false)
  const handleInputFocus = () => {
    setIsFocus(() => true)
  }
  const handleInputBlur = () => {
    setIsFocus(() => false)
  }

  return (
    <InputTemplete
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
              onBlur={() => handleInputBlur()}
            />
            <SearchIconButton onClick={() => onSearch()} />
          </SuffixIconInputContainer>
        )
      }}
    />
  )
}
