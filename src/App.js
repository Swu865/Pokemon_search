import React, {useState} from 'react';


function App() {
  const [image,setimage] =useState([]);
  const [name, setname] = useState([]);
  const [move,setmove] = useState([]);

  const [enterName,setEntername] = useState('');
  const URL = 'https://pokeapi.co/api/v2/pokemon/'+ enterName;
  const namehandler = event =>{

    setEntername(event.target.value);
  };

  const formSubmithandler = event =>{
    event.preventDefault();
  };

  const fetchpokemon =()=>{
    fetch(URL).then(response=>{
      return response.json();
    }).then(data =>{
      setimage(data.sprites)  ;
      setname(data);
      
      setmove(data.moves.map((move)=><li>{move.move.name}</li>))
    })
  }

  
  

  return (
    
    <form onSubmit={formSubmithandler}>
    <section>
    <input  type="text" placeholder="Enter pokemon name..." onChange={namehandler}/>
    <button  onClick={fetchpokemon}>&#128269;Search</button>
    </section>
    <section>

    <img src={image.front_default} />
    <p>{name.name}</p>
    <p>{move}</p>
    </section>
  </form>
  );
    
  
}

export default App;
