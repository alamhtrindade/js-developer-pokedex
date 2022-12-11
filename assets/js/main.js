const pokemonList = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMoreButton')

const maxRecords = 151
const limit = 10
let offset = 0;

function convertPokemonToLi(pokemon) {
    return `
        <li class="pokemon ${pokemon.type}" onclick="openCloseModal()">
            <span class="number">#${pokemon.number}</span>
            <span class="name">${pokemon.name}</span>

            <div class="detail">
                <ol class="types">
                        ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                 </ol>

                <img src="${pokemon.photo}"
                    alt="${pokemon.name}">
            </div>
            <div id="pokemonDetailsModal" class="pokemonDetailsModal">
                <div class="modalContent">
                    <div class="headerModal">
                        <h3 class="titleModal">About</h3>
                        <span class="closeModal"> x </span>
                    </div>
                    <div class="pokemonsInfo">
                        <span class="infos">Species: </span><span class="infosPokemons"> ${pokemon.species}</span><br>
                        <span class="infos">Height: </span><span class="infosPokemons">${pokemon.height}</span><br>
                        <span class="infos">Weight: </span><span class="infosPokemons">${pokemon.weight}</span><br>
                        <span class="infos">Abilidades: </span><span class="infosPokemons">${pokemon.abilities}</span><br>
                    </div>
                </div>
            </div>
        </li>

    `
}


function loadPokemonItens(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons.map(convertPokemonToLi).join('')
        pokemonList.innerHTML += newHtml
    })
}

loadPokemonItens(offset, limit)

loadMoreButton.addEventListener('click', () => {
    offset += limit
    const qtdRecordsWithNexPage = offset + limit

    if (qtdRecordsWithNexPage >= maxRecords) {
        const newLimit = maxRecords - offset
        loadPokemonItens(offset, newLimit)

        loadMoreButton.parentElement.removeChild(loadMoreButton)
    } else {
        loadPokemonItens(offset, limit)
    }
})

function openCloseModal(){
    
    let thisModal = document.getElementById("pokemonDetailsModal")

    if(getComputedStyle(thisModal).display == 'none'){
        thisModal.style.display = 'block'
        document.body.style.overflow = 'hidden'
    }else{
        thisModal.style.display = 'none'
        document.body.style.overflow = 'auto'
    } 
}
