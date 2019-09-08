const result = document.getElementById('result');

const fetchPokemon = (() => {
  
    const promises = [];

    for (let i = 1; i <= 150; i++) {
        const url = `https://pokeapi.co/api/v2/pokemon/${i}`;
        promises.push(fetch(url).then(res => res.json()));
    }

    Promise.all(promises).then(results => {
        
        const pokemon = results.map((data) => ({
            name: data.name,
            id: data.id,
            image: data.sprites['front_default'],
            type: data.types.map(type => type.type.name).join(', ')
        }));

        displayPokemon(pokemon);
    });
})();

const displayPokemon = (pokemon) => {
    
    const pokemoHTMLString = pokemon.map(pokeman => `
        <li class="card">
            <img class="card__image" src="${pokeman.image}">
            <h2 class="card__title">${pokeman.id} ${pokeman.name}</h2>
            <span class="card__type">Type: ${pokeman.type}</span>
        </li>
    `).join(' ');

    result.innerHTML = pokemoHTMLString;
}



