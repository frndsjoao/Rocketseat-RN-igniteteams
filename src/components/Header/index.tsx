import { useNavigation } from '@react-navigation/native';
import React from 'react';
import logoImg from '../../assets/logo.png';
import { BackButton, BackIcon, Container, Logo } from './styles';

type Props = {
  showBackButton?: boolean;
}

export default function Header({ showBackButton = false }: Props) {
  const navigation = useNavigation()

  function handleGoHome() {
    navigation.navigate('groups')
  }

  return (
    <Container>
      {showBackButton && (
        <BackButton onPress={handleGoHome}>
          <BackIcon />
        </BackButton>
      )}

      <Logo source={logoImg} />
    </Container>
  )
}