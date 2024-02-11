import { useRoute } from '@react-navigation/native'
import React, { useState } from 'react'
import { FlatList } from 'react-native'
import Button from '../../components/Button'
import ButtonIcon from '../../components/ButtonIcon'
import Filter from '../../components/Filter'
import Header from '../../components/Header'
import Highlight from '../../components/Highlight'
import Input from '../../components/Input'
import ListEmpty from '../../components/ListEmpty'
import PlayerCard from '../../components/PlayerCard'
import { Container, Form, Headerlist, PlayersCounter } from './styles'

type RouteParams = {
  group: string;
}

export default function Players() {
  const [team, setTeam] = useState('Time A')
  const [players, setPlayers] = useState(['Rodrigo', 'João'])

  const router = useRoute()
  const { group } = router.params as RouteParams

  return (
    <Container>
      <Header showBackButton />

      <Highlight title={group} subtitle='Adicione a galera e separe os times' />

      <Form>
        <Input
          placeholder='Nome da pessoa'
          autoCorrect={false}
        />
        <ButtonIcon icon="add" />
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
        keyExtractor={item => item}
        renderItem={({ item }) => (
          <PlayerCard name={item} onRemove={() => { }} />
        )}
        ListEmptyComponent={() => (<ListEmpty message='Nenhum jogador informado neste time.' />)}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[{ paddingBottom: 100 }, players.length === 0 && { flex: 1 }]}
      />

      <Button
        title='Remover turma'
        type="SECONDARY"
      />

    </Container>
  )
}