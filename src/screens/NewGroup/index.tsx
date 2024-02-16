import { useNavigation } from '@react-navigation/native'
import React, { useState } from 'react'
import { Alert } from 'react-native'
import Button from '../../components/Button'
import Header from '../../components/Header'
import Highlight from '../../components/Highlight'
import Input from '../../components/Input'
import { groupCreate } from '../../storage/group/groupCreate'
import { AppError } from '../../utils/AppError'
import { Container, Content, Icon } from './styles'

export default function NewGroup() {
  const [group, setGroup] = useState('')
  const navigation = useNavigation()

  async function handleCreateNew() {
    try {
      if (group.trim().length === 0) {
        return Alert.alert("Novo Grupo", 'Informe o nome do grupo.')
      }

      await groupCreate(group)
      navigation.navigate('players', { group })

    } catch (error) {
      if (error instanceof AppError) {
        Alert.alert("Novo Grupo", error.message)
      } else {
        Alert.alert('Novo Grupo', 'Não foi possível criar um novo grupo.')
        console.log(error)
      }
    }
  }

  return (
    <Container>
      <Header showBackButton />

      <Content>
        <Icon />
        <Highlight
          title='Novo grupo'
          subtitle='crie o grupo para adicionar as pessoas'
        />

        <Input
          placeholder='Nome do grupo'
          onChangeText={setGroup}
          onSubmitEditing={handleCreateNew}
          returnKeyType='done'
        />

        <Button
          title="Criar"
          style={{ marginTop: 20 }}
          onPress={handleCreateNew}
        />
      </Content>
    </Container>
  )
}