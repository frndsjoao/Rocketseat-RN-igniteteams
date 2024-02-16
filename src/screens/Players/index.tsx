import { useNavigation, useRoute } from '@react-navigation/native'
import React, { useEffect, useRef, useState } from 'react'
import { Alert, FlatList, TextInput } from 'react-native'
import Button from '../../components/Button'
import ButtonIcon from '../../components/ButtonIcon'
import Filter from '../../components/Filter'
import Header from '../../components/Header'
import Highlight from '../../components/Highlight'
import Input from '../../components/Input'
import ListEmpty from '../../components/ListEmpty'
import PlayerCard from '../../components/PlayerCard'
import { groupRemoveByName } from '../../storage/group/groupRemoveByName'
import { PlayerStorageDTO } from '../../storage/players/PlayerStorageDTO'
import { playerAddByGroup } from '../../storage/players/playerAddByGroup'
import { playerRemoveByGroup } from '../../storage/players/playerRemoveByGroup'
import { playersGetByGroupAndTeam } from '../../storage/players/playersGetByGroupAndTeam'
import { AppError } from '../../utils/AppError'
import { Container, Form, Headerlist, PlayersCounter } from './styles'

type RouteParams = {
  group: string;
}

export default function Players() {
  const [newPlayerName, setNewPlayerName] = useState('')
  const [team, setTeam] = useState('Time A')
  const [players, setPlayers] = useState<PlayerStorageDTO[]>([])

  const inputRef = useRef<TextInput>(null)
  const router = useRoute()
  const navigation = useNavigation()
  const { group } = router.params as RouteParams

  async function handleAddPlayer() {
    if (newPlayerName.trim().length === 0) {
      return Alert.alert("Novo Jogador", 'Informe o nome do jogador.')
    }

    const newPlayer = { name: newPlayerName, team: team }

    try {
      await playerAddByGroup(newPlayer, group)

      inputRef.current?.blur()
      setNewPlayerName('')

      fetchPlayersByTeam()
    } catch (error) {
      if (error instanceof AppError) {
        Alert.alert("Novo Jogador", error.message)
      } else {
        Alert.alert('Novo Jogador', 'Não foi possível incluir um novo jogador.')
        console.log(error)
      }
    }

  }

  async function handleRemovePlayer(playerName: string) {
    try {
      await playerRemoveByGroup(playerName, group)

      fetchPlayersByTeam()
    } catch (error) {
      if (error instanceof AppError) {
        Alert.alert("Remover Jogador", error.message)
      } else {
        Alert.alert('Remover Jogador', 'Não foi possível remover este jogador.')
        console.log(error)
      }
    }

  }

  async function onGroupRemove() {
    try {
      await groupRemoveByName(group)

      navigation.navigate('groups')
    } catch (error) {
      if (error instanceof AppError) {
        Alert.alert("Remover Grupo", error.message)
      } else {
        Alert.alert('Remover Grupo', 'Não foi possível remover este grupo.')
        console.log(error)
      }
    }
  }

  async function handleRemoveGroup() {
    Alert.alert('Remover Grupo', 'Você tem certeza que deseja apagar este grupo?', [
      { text: 'Não', style: 'cancel' },
      { text: 'Sim', onPress: () => onGroupRemove() }
    ])
  }

  async function fetchPlayersByTeam() {
    try {
      const playersByTeam = await playersGetByGroupAndTeam(group, team)
      setPlayers(playersByTeam)
    } catch (error) {
      Alert.alert('Jogadores', 'Não foi possível carregar os jogadores do time.')
    }
  }

  useEffect(() => {
    fetchPlayersByTeam()
  }, [team])

  return (
    <Container>
      <Header showBackButton />

      <Highlight title={group} subtitle='Adicione a galera e separe os times' />

      <Form>
        <Input
          inputRef={inputRef}
          placeholder='Nome da pessoa'
          autoCorrect={false}
          onChangeText={setNewPlayerName}
          value={newPlayerName}
          onSubmitEditing={handleAddPlayer}
          returnKeyType='done'
        />
        <ButtonIcon icon="add" onPress={handleAddPlayer} />
      </Form>

      <Headerlist>
        <FlatList
          horizontal
          data={['Time A', 'Time B']}
          keyExtractor={item => item}
          renderItem={({ item }) => (
            <Filter
              title={item}
              isActive={item === team}
              onPress={() => setTeam(item)}
            />
          )}
        />

        <PlayersCounter>{players.length}</PlayersCounter>
      </Headerlist>

      <FlatList
        data={players}
        keyExtractor={item => item.name}
        renderItem={({ item }) => (
          <PlayerCard name={item.name} onRemove={() => handleRemovePlayer(item.name)} />
        )}
        ListEmptyComponent={() => (<ListEmpty message='Nenhum jogador informado neste time.' />)}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[{ paddingBottom: 100 }, players.length === 0 && { flex: 1 }]}
      />

      <Button
        title='Remover grupo'
        type="SECONDARY"
        onPress={handleRemoveGroup}
      />

    </Container>
  )
}