import React, { useCallback, useMemo, useState } from "react"
import styled from "styled-components"
import {
  primaryTextColor,
  secondaryColor,
  errorColor,
  secondaryTextColor,
} from "styles/colors"
import { body1Normal, body2Normal, label2Normal } from "styles/textTheme"
import { SearchIconButton, VisibilityIconButton } from "components/IconButtons"

const Input = styled.input`
  display: flex;
  max-width: 400px;
  width: 100%;
  height: fit-content;
  box-sizing: border-box;
  padding: 14px;
  margin: 0;
  align-items: center;
  border: 1px solid ${(props) => (props.isError ? errorColor : primaryTextColor)};
  border-radius: 4px;
  &:focus {
    border-color: ${secondaryColor};
    outline: none;
  }
  ${body2Normal}
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
  ${body1Normal}
`

const ErrorText = styled.div`
  display: flex;
  padding-top: 10px;
  ${label2Normal};
  color: ${errorColor};
`

export const InputTemplete = ({ labelText, errorText, inputFn }) => {
  const isError = errorText != null
  return (
    <>
      {labelText && <LabelText>{labelText}</LabelText>}
      {inputFn(isError)}
      {isError && <ErrorText>{errorText}</ErrorText>}
    </>
  )
}

export const OutlineInput = ({ labelText, errorText, placeholderText }) => {
  return (
    <InputTemplete
      labelText={labelText}
      errorText={errorText}
      inputFn={(isError) => {
        return <Input isError={isError} placeholder={placeholderText} />
      }}
    />
  )
}

export const PasswordInput = ({ labelText, errorText, placeholderText }) => {
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
  }

  return (
    <>
      <InputTemplete
        labelText={labelText}
        errorText={errorText}
        inputFn={(isError) => {
          return (
            <SuffixIconInputContainer isFocus={isFocus}>
              <InnerInput
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

export const SearchInput = ({ labelText, errorText, placeholderText, onSearch }) => {
  const [isFocus, setIsFocus] = useState(false)
  const handleInputFocus = () => {
    setIsFocus(() => true)
  }
  const handleInputBlur = () => {
    setIsFocus(() => false)
  }

  return (
    <InputTemplete
      labelText={labelText}
      errorText={errorText}
      inputFn={(isError) => {
        return (
          <SuffixIconInputContainer isFocus={isFocus}>
            <InnerInput
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
