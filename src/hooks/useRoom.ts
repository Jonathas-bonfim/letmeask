import { useEffect, useState } from "react";
import { database } from "../services/firebase";
import { useAuth } from "./useAuth";

// transformando os dados do firebase de objetos para Strings
type FirebaseQuestions = Record<string, {
  author: {
    name: string;
    avatar: string;
  }
  content: string;
  isAnswered: boolean;
  isHighlighted: boolean;
  likes: Record<string, {
    authorId: string;
  }>
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

export function useRoom(roomId: string) {
  const { user } = useAuth();
  const [questions, setQuestions] = useState<QuestionType[]>([]);
  const [title, setTitle] = useState('');

  useEffect(() => {
    // obtendo as perguntas da sala
    const roomRef = database.ref(`rooms/${roomId}`);

    // buscando os dados das perguntas (exclusivo do firebase)
    // para ouvir o evento uma vez usa o ONCE para ouvir mais de uma vez ON
    // TODO: IMPLEMENTAR MÉTODO PARA CARREGAR A PARTE MODIFICADA DO APP
    roomRef.on('value', room => {
      const databaseRoom = room.val();
      const firebaseQuestions: FirebaseQuestions = databaseRoom.questions ?? {};

      const parsedQuestions = Object.entries(firebaseQuestions ?? {}).map(([key, value]) => {
        return {
          id: key,
          content: value.content,
          author: value.author,
          isHighlighted: value.isHighlighted,
          isAnswered: value.isAnswered,
          likeCount: Object.values(value.likes ?? {}).length,
          // verificando se o usuário logado deu like
          // hasLiked: Object.values(value.likes ?? {}).some(
          //   // pegando todos os likes e verificando se o usuário do like é igual o usuário logado no sistema 
          //   like => like.authorId == user?.id
          // )

          // obtendo valores do like
          likeId: Object.entries(value.likes ?? {}).find(([key, like]) => like.authorId == user?.id)?.[0]
        }
      })
      // console.log(parsedQuestions)
      setTitle(databaseRoom.title);
      setQuestions(parsedQuestions);
    })

    return () => {
      roomRef.off('value');
    }
  }, [roomId, user?.id]);

  return { questions, title }
}