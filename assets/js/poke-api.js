const pokeApi = {};

function convertPokeApiDetailToPokemon(pokeDetail) {
    const pokemon = new Pokemon();

    pokemon.name = pokeDetail.name;
    pokemon.id = pokeDetail.id;

    const types = (pokemon.type = pokeDetail.types.map(
        (typeSlot) => typeSlot.type.name
    ));
    const [type] = types;

    pokemon.types = types;
    pokemon.type = type;

    pokemon.photo = pokeDetail.sprites.other.dream_world.front_default;

    return pokemon;
}

pokeApi.getPokemonDetail = (pokemon) => {
    return fetch(pokemon.url)
        .then((response) => response.json())
        .then(convertPokeApiDetailToPokemon);
};

pokeApi.getPokemons = (offset = 0, limit = 20) => {
    const url = `https://pokeapi.co/api/v2/pokemon/?offset=${offset}&limit=${limit}`;

    return fetch(url)
        .then((response) => response.json())
        .then((responseBody) => responseBody.results)
        .then((resultsUrl) =>
            resultsUrl.map((response) => pokeApi.getPokemonDetail(response))
        )
        .then((responseBodyUrls) => Promise.all(responseBodyUrls))
        .then((pokemonsDetails) => pokemonsDetails);
};
