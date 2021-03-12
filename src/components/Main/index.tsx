import { useCallback, useRef, useState } from 'react'
import { FormHandles } from '@unform/core'
import { Form } from '@unform/web'

import * as S from './styles'
import Checkbox from 'components/Checkbox'
import Input from 'components/Input'
import Textarea from 'components/Textarea'
import Button from 'components/Button'

interface CheckboxOption {
  id: string
  value: string
  label: string
}

const Main = ({
  title = 'Gerador de Banners',
  description = 'Gerando banners para README.md e criando projetos fantasticos'
}) => {
  const formRef = useRef<FormHandles>(null)
  const [image, setImage] = useState('')

  const checkboxOptions: CheckboxOption[] = [
    { id: 'node', value: 'node', label: 'Node' },
    { id: 'react-native', value: 'react-native', label: 'React Native' },
    { id: 'reactjs', value: 'reactjs', label: 'ReactJS' },
    { id: 'sass', value: 'sass', label: 'Sass' },
    { id: 'typescript', value: 'typescript', label: 'TypeScript' },
    { id: 'webpack', value: 'webpack', label: 'Webpack' }
  ]

  const handleSubmit = useCallback(async (data) => {
    const { name, description, techs } = data

    const baseUrl =
      process.env.NODE_ENV === 'development'
        ? 'http://localhost:3000'
        : 'https://banners-generator.vercel.app'

    setImage(
      `${baseUrl}/api/thumbnail.png?name=${name}&description=${description}&techs=${techs}`
    )
  }, [])

  return (
    <S.Wrapper>
      <S.Header>
        <S.Title>{title}</S.Title>
        <S.Description>{description}</S.Description>
      </S.Header>
      <Form ref={formRef} onSubmit={handleSubmit}>
        <Input name="name" placeholder="Nome do projeto" />
        <Textarea name="description" placeholder="Detalhes do Projeto" />
        <Checkbox name="techs" options={checkboxOptions} />
        <Button type="submit">Gerar Banner</Button>
      </Form>

      {image && <img src={image} alt="" />}
    </S.Wrapper>
  )
}

export default Main
