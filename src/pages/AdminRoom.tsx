import logo from '../assets/images/logo.svg'
import { Button } from '../components/Button'
import { RoomCode } from '../components/RoomCode';
import { useHistory, useParams } from 'react-router-dom'
import '../styles/room.scss'
// import { useAuth } from '../hooks/useAuth';
import { Question } from '../components/Question';
import { useRoom } from '../hooks/useRoom';
import deletImg from '../assets/images/delete.svg'
import { database } from '../services/firebase';

type RoomParams = {
  id: string,
}

export function AdminRoom() {
  const history = useHistory();
  const params = useParams<RoomParams>();
  const roomId = params.id;
  const { title, questions } = useRoom(roomId);

  async function handleEndRoom() {
    database.ref(`rooms/${roomId}`).update({
      endedAt: new Date(),
    });

    history.push('/');
  }

  async function handleDeleteQuestion(questionId: string) {
    if (window.confirm('Voce tem certa de excluir essa pergunta.')) {
      await database.ref(`rooms/${roomId}/questions/${questionId}`).remove();
    }
  }

  return (
    <div id="page-room">
      <header>
        <div className="content">
          <img src={ logo } alt="Lemeask" />
          <div>
            <RoomCode code={ roomId } />
            <Button isOutlined onClick={ handleEndRoom }>Encerrar</Button>
          </div>
        </div>
      </header>
      <main>
        <div className="room-title">
          <h1>Sarla { title }</h1>
          { questions.length > 0 && <span>{ questions.length } perguntas</span> }
        </div>
        <div className="question-list">
          { questions.map((questions) => {
            return (
              <Question
                key={ questions.id }
                content={ questions.content }
                author={ questions.author }
              >
                <button type="button" onClick={ () => handleDeleteQuestion(questions.id) }>
                  <img src={ deletImg } alt="Remover pergunta" />
                </button>
              </Question>
            );
          }) }
        </div>
      </main>
    </div>
  );
}
