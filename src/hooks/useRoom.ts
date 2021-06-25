import { useEffect, useState } from 'react'
import { database } from '../services/firebase';
import { useAuth } from './useAuth';

type FireBaseQuestions = Record<string, {
  author: {
    name: string;
    avatar: string;
  }
  content: string;
  isAnswered: boolean;
  isHighlighted: boolean;
  likes: Record<string, {
    authorId: string;
  }>;
}>

type QuestionType = {
  id: string;
  author: {
    name: string;
    avatar: string;
  }
  content: string;
  isAnswered: boolean;
  isHighlighted: boolean;
  likeCount: number;
  likeId: string | undefined;
}

export const useRoom = (roomId: string) => {
  const { user } = useAuth();
  const [questions, setQuestions] = useState<QuestionType[]>([]);
  const [title, setTilte] = useState('');

  console.log(questions);


  useEffect(() => {
    const roomRef = database.ref(`rooms/${roomId}`);

    roomRef.on('value', (room) => {
      const databaseRoom = room.val();
      const firebaseQuestions: FireBaseQuestions = databaseRoom.questions ?? {};

      const parsetQuestions = Object.entries(firebaseQuestions).map(([key, value]) => {
        Object.entries(value.likes ?? {}).find(([key, like]) => like.authorId === user?.id);
        return {
          id: key,
          content: value.content,
          author: value.author,
          isHighlighted: value.isHighlighted,
          isAnswered: value.isAnswered,
          likeCount: Object.values(value.likes ?? {}).length,
          likeId: Object.entries(value.likes ?? {}).find(([key, like]) => like.authorId === user?.id)?.[0],
        }
      })
      setTilte(databaseRoom.title);
      setQuestions(parsetQuestions);
    })
    return () => {
      roomRef.off('value');
    }
  }, [roomId, user?.id])

  return {
    questions,
    title,
  }
}
