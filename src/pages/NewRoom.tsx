import { faMoon, faSun } from '@fortawesome/free-solid-svg-icons';
import { FormEvent, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'

import illustrationImg from '../assets/images/illustration.svg'
import logoImg from '../assets/images/logo.svg';

import { Button } from '../components/Button';
import { database } from '../services/firebase';
import { useAuth } from '../hooks/useAuth';

import '../styles/auth.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


export function NewRoom() {
  const { user } = useAuth()
  const history = useHistory()
  const [newRoom, setNewRoom] = useState('');
  const [icon, setIcon] = useState(faSun)

  function changeIcon() {
    toggleTheme();
    icon === faSun ? setIcon(faMoon) : setIcon(faSun);
  }

  async function handleCreateRoom(event: FormEvent) {
    event.preventDefault();

    if (newRoom.trim() === '') {
      return;
    }

    const roomRef = database.ref('rooms');
    const firebaseRoom = await roomRef.push({/* salvar uma informação dentro da lista eu uso push */
      title: newRoom,
      authorId: user?.id,
    })
    
    history.push (`/rooms/${firebaseRoom.key}`) 
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
              onChange={event => setNewRoom(event.target.value)}
              value={newRoom}
            />
            <Button type="submit">
              Criar sala
            </Button>
          </form>
          <p>
            Quer entrar em uma sala existente? <Link to="/">clique aqui</Link>
          </p>
        </div>
      </main>
      <header>
        <button onClick={changeIcon} style={{backgroundColor: 'color'}}>
        <FontAwesomeIcon icon={icon}/>
        </button>
      </header>
    </div>
  )
}

function toggleTheme() {
  throw new Error('Function not implemented.');
}

