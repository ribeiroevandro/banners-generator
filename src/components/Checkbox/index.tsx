import { useEffect, useRef, InputHTMLAttributes } from 'react'
import { useField } from '@unform/core'
import * as S from './styles'

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  name: string
  options: {
    id: string
    value: string
    label: string
  }[]
}

const Checkbox = ({ name, options, ...rest }: Props) => {
  const inputRefs = useRef<HTMLInputElement[]>([])
  const { fieldName, registerField, defaultValue = [] } = useField(name)

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRefs.current,
      getValue: (refs: HTMLInputElement[]) => {
        return refs.filter((ref) => ref.checked).map((ref) => ref.value)
      },
      clearValue: (refs: HTMLInputElement[]) => {
        refs.forEach((ref) => {
          ref.checked = false
        })
      },
      setValue: (refs: HTMLInputElement[], values: string[]) => {
        refs.forEach((ref) => {
          if (values.includes(ref.id)) {
            ref.checked = true
          }
        })
      }
    })
  }, [defaultValue, fieldName, registerField])

  return (
    <S.Wrapper>
      {options.map((option, index) => (
        <label htmlFor={option.id} key={option.id}>
          <input
            defaultChecked={defaultValue.find((dv: string) => dv === option.id)}
            ref={(ref) => {
              inputRefs.current[index] = ref as HTMLInputElement
            }}
            value={option.value}
            type="checkbox"
            id={option.id}
            {...rest}
          />
          {option.label}
        </label>
      ))}
    </S.Wrapper>
  )
}

export default Checkbox
