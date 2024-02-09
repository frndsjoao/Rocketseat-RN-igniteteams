import React from 'react'
import GroupCard from '../../components/GroupCard'
import Header from '../../components/Header'
import Highlight from '../../components/Highlight'
import { Container } from './styles'

export default function Groups() {
  return (
    <Container>
      <Header />

      <Highlight title='Turmas' subtitle='Jogue com a sua turma' />

      <GroupCard title='Turma do DBD' />
      <GroupCard title='Galera do Lolzin' />
    </Container>
  )
}