import {
  useRef,
  useEffect,
  useState,
  useCallback,
  TextareaHTMLAttributes
} from 'react'
import { useField } from '@unform/core'

import * as S from './styles'

interface InputProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  name: string
}

const Textarea = ({ name, ...rest }: InputProps) => {
  const inputRef = useRef<HTMLTextAreaElement>(null)
  const [isFocused, setIsFocused] = useState(false)
  const [isFilled, setIsFilled] = useState(false)
  const { fieldName, defaultValue, registerField, error } = useField(name)

  const handleInpuFocus = useCallback((): void => {
    setIsFocused(true)
  }, [])

  const handleInpuBlur = useCallback((): void => {
    setIsFocused(false)

    setIsFilled(!!inputRef.current?.value)
  }, [])

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'value'
    })
  }, [fieldName, registerField])

  return (
    <S.Container isErrored={!!error} isFocused={isFocused} isFilled={isFilled}>
      <textarea
        onFocus={handleInpuFocus}
        onBlur={handleInpuBlur}
        ref={inputRef}
        defaultValue={defaultValue}
        {...rest}
      />
    </S.Container>
  )
}

export default Textarea
