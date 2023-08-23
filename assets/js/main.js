const pokemonOl = document.querySelector(".pokemons");
const buttonLoadMoreButton = document.querySelector("#loadMoreButton");

let maxRecords = 15;
const limit = 5;
let offset = 0;

const maxPokemons = 11;

// funcao para retornar um item de lista
function convertPokemonLi(pokemon) {
    return `
        <li class="pokemon ${pokemon.type}" >
            <span class="number">#${pokemon.id}</span>
            <span class="name">${pokemon.name}</span>

            <div class="detail">
                <ol class="types">
                ${pokemon.types
                    .map((response) => `<li class="type">${response}</li>`)
                    .join("")}

                </ol>

                <img
                    src="${pokemon.photo}"
                    alt=""
                />
            </div>
        </li>`;
}

// capturando lista de pokemons

function loadMoreButton(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((resultsListPokemon) => {
        const newLi = resultsListPokemon
            .map((result) => convertPokemonLi(result))
            .join("");

        pokemonOl.innerHTML += newLi;
    });
}

loadMoreButton(offset, limit);

// botao de clicar e incrementar mais pokemons

buttonLoadMoreButton.addEventListener("click", () => {
    offset += limit;

    let qtdRecordsNextPage = offset + limit;

    if (qtdRecordsNextPage >= maxRecords) {
        const newLimit = maxRecords - offset;
        loadMoreButton(offset, newLimit);

        buttonLoadMoreButton.parentElement.removeChild(buttonLoadMoreButton);
    } else {
        loadMoreButton(offset, limit);
    }
});
