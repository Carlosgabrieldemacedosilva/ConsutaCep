import './App.css';
import {useState} from 'react';
import {FiSearch}  from "react-icons/fi";
import api from './cepApi';


function App() {
  const [input,setInput] = useState('');
  const [cep, setCep] = useState({});

  async function handleSearch(){
    if (input === ""){
      alert("Campo vazio preencha os dados")
      return;
    }

    try{
      const response = await api.get(`${input}/json`);
      setCep(response.data);
    }catch{
      alert('Nao foi possivel encontrar os dados');
    }
    setInput("");
  }


  return (
    <div className="container">
        <h1 className='title'> Buscador de CEP </h1>
        <div className="containerInput">
          <input type="text" placeholder="Digite seu cep ..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          />
          
          <button className="buttonSearch"
          onClick={handleSearch}>
            <FiSearch size={25} color="#FFF"/>
          </button>
        </div>
        
        {Object.keys(cep).length > 0 &&(
          <div className='main'>
            <h2>CEP: {cep.cep} </h2>
            <span>{cep.logradouro}</span>
            <span>{cep.complemento}</span>
            <span>{cep.bairro}</span>
            <span>{cep.localidade}</span>
          </div>
        )}
    </div>
  );
}

export default App;
