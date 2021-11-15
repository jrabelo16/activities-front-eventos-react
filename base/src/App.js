import { useState } from 'react';

function Tarefa(props) {
  return (
    <li>
      <span 
        onClick={() => props.handleCompletar(props.id)}
        style={{ textDecoration: props.completa ? 'line-through' : ''}}
      >
      {props.children}
      </span>
      <button onClick={() => props.handleDelete(props.id)}>X</button>
    </li>
  )
}

function App() {
  
  const [tarefas, setTarefas] = useState([]);
  
  function handleKeyDown(event) {
    if (event.key !== 'Enter') return;
    
    const novasTarefas = [...tarefas, { id: Math.random(), texto: event.target.value, completa: false }];
    setTarefas(novasTarefas);

    event.target.value = '';
  }
  
  function handleCompletar(id) {
    const novasTarefas = [...tarefas];
    const tarefaCompletada = novasTarefas.find(tarefa => tarefa.id === id);
    tarefaCompletada.completa = !tarefaCompletada.completa;
    setTarefas(novasTarefas);
  }

  function handleDelete(id) {
    const novasTarefas = tarefas.filter(tarefa => tarefa.id !== id);
    setTarefas(novasTarefas);
  }

  console.log(tarefas);

  return (
    <div className="App">
      <input type='text' onKeyDown={handleKeyDown}></input>
      <ul>
        {tarefas.map(tarefa => {
          return (
            <Tarefa 
              key={tarefa.id} 
              id={tarefa.id}
              completa={tarefa.completa} 
              handleDelete={handleDelete} 
              handleCompletar={handleCompletar}
            >
              {tarefa.texto}
            </Tarefa>            
          )
        })}
      </ul>
    </div>
  );
}

export default App;
