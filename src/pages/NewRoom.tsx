import illustration from '../assets/images/illustration.svg';
import logimg from '../assets/images/logo.svg';
import '../styles/auth.scss'
import { Button } from '../components/Button';
import { Link, useHistory } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { FormEvent, useState } from 'react';
import { database } from '../services/firebase';



export function NewRoom() {
  const { user } = useAuth();
  const [newRoom, setNewRoom] = useState('');
  const history = useHistory();

  async function handleCreateRoom(event: FormEvent) {
    event.preventDefault();
    if (newRoom.trim() === '') {
      return;
    }

    const roomRef = database.ref('rooms');

    const firebaseRoom = await roomRef.push({
      title: newRoom,
      authorId: user?.id,
    })

    history.push(`rooms/${firebaseRoom.key}`)
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
          <h1>{ user?.name }</h1>
          <h2>Criar uma nova sala</h2>
          <form onSubmit={ handleCreateRoom }>
            <input
              type="text"
              placeholder="Nome da sala"
              onChange={ (event) => setNewRoom(event.target.value) }
              value={ newRoom }
            />
            <Button type="submit">Criar Sala</Button>
          </form>
          <p>
            Quer entrar em uma sala existente <Link to="/">clique aqui</Link>
          </p>
        </div>
      </main>
    </div>
  )
}
