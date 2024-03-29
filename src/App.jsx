import { useState, useEffect } from 'react' //importo o hook
import './app.css'
import Axios from 'axios' //importo o axios

function App() {
  const [cards, setCards] = useState([])
  const [searchTerm, setSearchTerm] = useState('') //declaro o hook
  const [titulo, setTitulo] = useState('') //criando estado de titulo
  const [descricao, setDescricao] = useState('') //criando estado de descricao
  const [link, setLink] = useState('') //criando estado de link
  const baseURL = 'https://maratona-spna-back.onrender.com/cards' //declaro a url da API

  const cardsFiltrados = cards.filter(card => {
    return card.title.toLowerCase().includes(searchTerm.toLowerCase()) //filtrar
  })

  const handleSubmit = (e) => {//liga o clique do botão no formulário
    e.preventDefault()
    
    async function sendData() { //enviando dados pra minha API
      await Axios.post(baseURL, {
        title: titulo,
        description: descricao,
        link: link
      })
    }

    sendData() //chamando a função de enviar dados
    setTitulo('')
    setDescricao('')
    setLink('')
  }

  useEffect(()=> {
    async function getData() {
      const response = await Axios.get(baseURL) //está pegando os dados da API
      setCards(response.data) //colocando na tela os dados que vieram da API
    }
    getData()
  }, [cards]) //estado que modifica os dados na tela em tempo real, mostrando o que foi enviado. Ele carrega a página quando a variável cards é atualizada

  return (
    <>
      <header>
        <h1>Meus FlashCards de Programação</h1>
        <input 
        type="text"
        placeholder='Busque um conteúdo...'
        value={searchTerm} //valor inicial da busca
        onChange={(e) => setSearchTerm(e.target.value)} //captura input
        />
      </header>

      <div className='gallery'>
        {cardsFiltrados.map(item => {
          return (
            <>
              <div className='card'>
                <h2>{item.title}</h2>
                <p>{item.description}</p>
                <a href="{item.link}" target='_blank'>Saiba mais</a>
              </div>
            </>
          )
        })}
      </div>

    <form className='form-container' onSubmit={handleSubmit}>
        <h1>Cadastre um novo conteúdo:</h1>
        <input 
        placeholder='Título:'
        type='text'
        value={titulo} //atrelando valor do estado titulo a este elemento
        onChange={(e) => setTitulo(e.target.value)} //criando o evento de captura de input do titulo
        />
        <textarea
        placeholder='Descrição:'
        value={descricao} //atrelando valor do estado descrição a este elemento
        onChange={(e) => setDescricao(e.target.value)} //criando o evento de captura de input da descrição

        />
        <input
        placeholder='Link:'
        type='text'
        value={link} //atrelando valor do estado link a este elemento
        onChange={(e) => setLink(e.target.value)} //criando o evento de captura de input do link

        />
        <button type='submit'>Criar FlashCard</button>
      </form>
      <footer>
        <p className='read-the-docs'>
          Criado por Gabriela Bado na Maratona Quero Ser Dev.
        </p>
      </footer>
    </>
  );
}

export default App;
