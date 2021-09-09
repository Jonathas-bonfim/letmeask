import { useHistory } from 'react-router-dom'
import { database } from '../services/firebase'

import { useAuth } from '../hooks/useAuth'
import { Button } from '../componentes/Button'

import illustrationImg from '../assets/images/illustration.svg'
import logoImg from '../assets/images/logo.svg'
import googleIconImg from '../assets/images/google-icon.svg'
import '../styles/auth.scss';
import { FormEvent } from 'react'
import { useState } from 'react'

export function Home() {
  const history = useHistory();
  const { user, singInWithGoogle } = useAuth()
  const [roomCode, setRoomCode] = useState('');

  async function handleCreateToRoom() {
    if (!user) {
      await singInWithGoogle();
    }
    history.push('/rooms/new');
  }

  // entrar em uma sala
  async function handleJoinRoom(event: FormEvent) {
    event.preventDefault();

    if (roomCode.trim() == '') {
      return;
    }

    // pegando todos os dados da sala em questão
    const roomRef = await database.ref(`rooms/${roomCode}`).get();

    // verificando se a sala existe
    if (!roomRef.exists()) {
      alert('Room does not exists.');
      return;
    }

    if (roomRef.val().endedAt) {
      alert('Room already closed.');
      return;
    }

    // caso a sala exista ir até ela
    history.push(`/rooms/${roomCode}`);
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
          <button onClick={handleCreateToRoom} className="create-room">
            <img src={googleIconImg} alt="Logo do Google" />
            Crie sua sala com o Google
          </button>
          <div className="separator">Ou entre em uma sala</div>

          <form onSubmit={handleJoinRoom}>
            <input
              type="text"
              placeholder="Digite o código da sala"
              onChange={event => setRoomCode(event.target.value)}
              value={roomCode}
            />
            <Button type="submit">
              Entrar na sala
            </Button>
          </form>
        </div>
      </main>
    </div>
  )
}