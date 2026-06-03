// script.js - Página de listagem (PokéAPI)
const POKE_LIST_URL = 'https://pokeapi.co/api/v2/pokemon?limit=24';

const loadingElement = document.getElementById('loading');
const cardsContainer = document.getElementById('cards-container');
const errorMessage = document.getElementById('error-message');

function toggleLoading(show) {
  loadingElement.style.display = show ? 'flex' : 'none';
}

function showError(message) {
  errorMessage.textContent = message;
  errorMessage.classList.remove('d-none');
}

function createPokemonCard(pokemon) {
  const col = document.createElement('div');
  col.className = 'col-12 col-sm-6 col-lg-4';

  const card = document.createElement('div');
  card.className = 'card h-100 text-center p-3';

  const img = document.createElement('img');
  img.src = pokemon.sprites.front_default || '';
  img.alt = pokemon.name;
  img.className = 'poke-img mx-auto';

  const title = document.createElement('h5');
  title.className = 'poke-name mt-2';
  title.textContent = pokemon.name;

  const types = document.createElement('p');
  types.className = 'text-muted';
  types.textContent = pokemon.types.map(t => t.type.name).join(', ');

  const btn = document.createElement('a');
  btn.className = 'btn btn-primary';
  btn.textContent = 'Ver Detalhes';
  btn.href = `detalhes.html?name=${pokemon.name}`;

  card.appendChild(img);
  card.appendChild(title);
  card.appendChild(types);
  card.appendChild(btn);
  col.appendChild(card);

  return col;
}

async function fetchPokemonList() {
  try {
    const res = await fetch(POKE_LIST_URL);
    if (!res.ok) throw new Error('Erro ao buscar lista de Pokémon');
    const data = await res.json();
    return data.results; // array with name and url
  } catch (err) {
    throw err;
  }
}

async function fetchPokemonDetails(urlOrName) {
  try {
    const res = await fetch(typeof urlOrName === 'string' && urlOrName.startsWith('http') ? urlOrName : `https://pokeapi.co/api/v2/pokemon/${urlOrName}`);
    if (!res.ok) throw new Error('Erro ao buscar detalhes do Pokémon');
    return await res.json();
  } catch (err) {
    throw err;
  }
}

async function loadPokemons() {
  toggleLoading(true);
  errorMessage.classList.add('d-none');
  cardsContainer.innerHTML = '';

  try {
    const list = await fetchPokemonList();
    // fetch details in parallel to get images and types
    const detailPromises = list.map(item => fetchPokemonDetails(item.url));
    const pokemons = await Promise.all(detailPromises);
    pokemons.forEach(p => {
      const card = createPokemonCard(p);
      cardsContainer.appendChild(card);
    });
  } catch (err) {
    showError('Não foi possível carregar a Pokédex. Tente novamente mais tarde.');
    console.error(err);
  } finally {
    toggleLoading(false);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  loadPokemons();
});
