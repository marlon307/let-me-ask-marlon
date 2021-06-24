import { Button } from '../components/Button';
import { useHistory } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { database } from '../services/firebase';
import { FormEvent, useState } from 'react';
import illustration from '../assets/images/illustration.svg';
import logimg from '../assets/images/logo.svg';
import googleicon from '../assets/images/google-icon.svg';
import '../styles/auth.scss';

export function Home() {
  const history = useHistory();
  const { user, signInWithGoogle } = useAuth();
  const [roomCode, setRoomCode] = useState('');

  async function handleCreatRoom() {
    if (!user) {
      await signInWithGoogle();
    }
    history.push('/rooms/new');
  }

  async function handleJoinRoom(event: FormEvent) {
    event.preventDefault();

    if (roomCode.trim() === '') {
      return;
    }

    const roomRef = await database.ref(`rooms/${roomCode}`).get();
    if (!roomRef.exists()) {
      alert('Room not exists.');
      return;
    }
    if (roomRef.val().endedAt) {
      alert('Room aleardy close.')
    }
    history.push(`rooms/${roomCode}`);
  }

  return (
    <div id="page-auth">
      <aside>
        <img src={ illustration } alt="Ilustração simbolizando perguntas e responstas" />
        <strong>Crie salas de Q&amp;A ao-vivo</strong>
        <p>Tire suas duvidas da sua audiencia em tempo-real</p>
      </aside>
      <main>
        <div className="main-content">
          <img src={ logimg } alt="Letmeask" />
          <button onClick={ handleCreatRoom } className="creat-room">
            <img src={ googleicon } alt="logo do goolge" />
            Cria sua sala com o Google</button>
          <div className="separator">Ou entre em uma sala</div>
          <form onSubmit={ handleJoinRoom }>
            <input
              type="text"
              placeholder="Digite o codigo da sala"
              onChange={ (event) => setRoomCode(event.target.value) }
              value={ roomCode }
            />
            <Button type="submit">Entrar na sala</Button>
          </form>
        </div>
      </main>
    </div>
  )
}
