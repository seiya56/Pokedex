const pkname = document.querySelector('.pokemon_name');
const pknumber = document.querySelector('.pokemon_number');
const pkimg = document.querySelector('.pokemon');
const form = document.querySelector('.form');
const input = document.querySelector('.input_search');
const prev = document.querySelector('.btn-prev');
const next = document.querySelector('.btn-next');


let search = 1


const fetchPokemon = async (pokemon) =>{
    const APIresponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
    if(APIresponse.status===200){
        const data = await APIresponse.json();
        return data;
    }
};
const renderPokemon = async(pokemon) =>{
    pkname.innerHTML= "Loading";
    pknumber.innerHTML= '';

    const data = await fetchPokemon(pokemon);
    if(data){
        pkimg.style.display= 'block'
        pkname.innerHTML= data.name;
        pknumber.innerHTML= data.id;
        pkimg.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];
        input.value= '';
        search= data.id
    }else{
        pkimg.style.display= 'none'
        pknumber.innerHTML= '';
        pkname.innerHTML= 'Pokemon Not Found';
        
    }
};
form.addEventListener('submit',(event) =>{
    event.preventDefault();
    
    renderPokemon(input.value.toLowerCase());
});
prev.addEventListener('click',() =>{
    if(search>1){
    search -= 1;
    renderPokemon(search)  
    }
});
next.addEventListener('click',() =>{
    search += 1;
    renderPokemon(search)  
});
renderPokemon(search);
