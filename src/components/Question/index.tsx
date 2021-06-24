import { ReactNode } from 'react'
import './question.scss';

type QuestonProps = {
  content: string;
  author: {
    name: string;
    avatar: string;
  }
  children?: ReactNode;
}

export const Question = ({ content, author, children }: QuestonProps) => {
  return (
    <div className="question">
      <p>{ content }</p>
      <footer>
        <div className="user-info">
          <img src={ author.avatar } alt={ author.name } />
          <span>{ author.name }</span>
        </div>
        <div>
          { children }
        </div>
      </footer>
    </div>
  )
}
