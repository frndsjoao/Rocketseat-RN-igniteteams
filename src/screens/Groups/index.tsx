import { useFocusEffect, useNavigation } from '@react-navigation/native'
import React, { useCallback, useState } from 'react'
import { FlatList } from 'react-native'
import Button from '../../components/Button'
import GroupCard from '../../components/GroupCard'
import Header from '../../components/Header'
import Highlight from '../../components/Highlight'
import ListEmpty from '../../components/ListEmpty'
import { groupsGetAll } from '../../storage/group/groupsGetAll'
import { Container } from './styles'

export default function Groups() {
  const [groups, setGroups] = useState<string[]>([])
  const navigation = useNavigation()

  function handleNewGroup() {
    navigation.navigate('newGroup')
  }

  function handleOpenGroup(group: string) {
    navigation.navigate('players', { group })
  }

  async function fetchGroups() {
    try {
      const data = await groupsGetAll()
      setGroups(data)

    } catch (error) {
      console.log(error)
    }
  }

  useFocusEffect(useCallback(() => {
    fetchGroups()
  }, []))

  return (
    <Container>
      <Header />

      <Highlight title='Grupos' subtitle='Jogue com o seu grupo' />

      <FlatList
        data={groups}
        keyExtractor={item => item}
        style={{ width: '100%' }}
        renderItem={({ item }) => (
          <GroupCard title={item} onPress={() => handleOpenGroup(item)} />
        )}
        contentContainerStyle={groups.length === 0 && { flex: 1 }}
        ListEmptyComponent={() => (
          <ListEmpty message='Que tal cadastrar o primeiro grupo?' />
        )}
      />

      <Button
        title='Criar novo grupo'
        onPress={handleNewGroup}
      />
    </Container>
  )
}