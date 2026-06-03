// detalhes.js - Página de detalhes (PokéAPI)
const DETAILS_API_BASE = 'https://pokeapi.co/api/v2/pokemon';

const detailsLoading = document.getElementById('loading');
const detailsContainer = document.getElementById('details-container');
const postTitle = document.getElementById('post-title');
const detailsError = document.getElementById('error-message');
const pokeImage = document.getElementById('poke-image');
const pokeTypes = document.getElementById('poke-types');
const pokeAbilities = document.getElementById('poke-abilities');
const pokeHeight = document.getElementById('poke-height');
const pokeWeight = document.getElementById('poke-weight');

function toggleDetailsLoading(show) {
  detailsLoading.style.display = show ? 'flex' : 'none';
}

function showDetailsError(message) {
  detailsError.textContent = message;
  detailsError.classList.remove('d-none');
}

async function fetchPokemon(name) {
  try {
    const res = await fetch(`${DETAILS_API_BASE}/${encodeURIComponent(name)}`);
    if (!res.ok) throw new Error('Erro ao buscar Pokémon');
    return await res.json();
  } catch (err) {
    throw err;
  }
}

async function loadDetails() {
  const params = new URLSearchParams(window.location.search);
  const name = params.get('name');

  if (!name) {
    showDetailsError('Nome do Pokémon não informado na URL.');
    return;
  }

  toggleDetailsLoading(true);
  detailsError.classList.add('d-none');

  try {
    const p = await fetchPokemon(name);
    postTitle.textContent = p.name;
    pokeImage.src = p.sprites.other['official-artwork'].front_default || p.sprites.front_default || '';
    pokeTypes.textContent = p.types.map(t => t.type.name).join(', ');
    pokeAbilities.textContent = p.abilities.map(a => a.ability.name).join(', ');
    pokeHeight.textContent = `${p.height / 10} m`;
    pokeWeight.textContent = `${p.weight / 10} kg`;
    detailsContainer.classList.remove('d-none');
  } catch (err) {
    showDetailsError('Não foi possível carregar os detalhes do Pokémon. Tente novamente.');
    console.error(err);
  } finally {
    toggleDetailsLoading(false);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  loadDetails();
});
