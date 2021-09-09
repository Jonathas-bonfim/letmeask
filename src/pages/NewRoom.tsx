import { useState } from 'react'
import { FormEvent } from 'react'
import { Link, useHistory } from 'react-router-dom'

import illustrationImg from '../assets/images/illustration.svg'
import logoImg from '../assets/images/logo.svg'

import { Button } from '../componentes/Button'
import { database } from '../services/firebase'
import { useAuth } from '../hooks/useAuth'

import '../styles/auth.scss'



export function NewRoom() {
  const { user } = useAuth();
  const history = useHistory();
  const [newRoom, setNewRoom] = useState('');

  // função para criar a sala
  async function handleCreateRoom(event: FormEvent) {
    event.preventDefault();

    // removendo espaços em branco
    if (newRoom.trim() == '') {
      // para não deixar criar uma sala sem nome
      return;
    }

    const roomRef = database.ref('rooms');

    // jogando uma nova sala dentro de rooms
    const firebaseRoom = await roomRef.push({
      title: newRoom,
      authorID: user?.id,

    });

    history.push(`/rooms/${firebaseRoom.key}`)
  }


  return (
    <div id="page-auth">
      <aside>
        <img src={illustrationImg} alt="Ilustração simbolizando perguntas e respostas" />
        <strong>Crie salas de Q&amp;A ao-vivo</strong>
        <p>Tire as dúvidas da sua audiência em tempo-real</p>
      </aside>
      <main>
        <div className="main-content">
          <img src={logoImg} alt="Letmeask" />
          <h2>Criar uma nova sala</h2>
          <form onSubmit={handleCreateRoom}>
            <input
              type="text"
              placeholder="Nome da sala"
              // observando para sempre que o valor do input for alterado obter ele no NewRoom
              // Ou quando o usuário digitar também...
              onChange={event => setNewRoom(event.target.value)}
              // obtem os dados digitados pelo usuário
              value={newRoom}
            />
            <Button type="submit">
              Criar sala
            </Button>
          </form>
          <p>
            Quer entrar em uma sala existente? <Link to="/">Clique Aqui</Link>
          </p>
        </div>
      </main>
    </div>
  )
}