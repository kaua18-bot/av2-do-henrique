// detalhes.js - Página de detalhes (Cat Facts)
const FACTS_API_BASE = 'https://catfact.ninja/facts';

const detailsLoading = document.getElementById('loading');
const detailsContainer = document.getElementById('details-container');
const factTitle = document.getElementById('fact-title');
const factText = document.getElementById('fact-text');
const factLength = document.getElementById('fact-length');
const detailsError = document.getElementById('error-message');

function toggleDetailsLoading(show) {
  detailsLoading.style.display = show ? 'flex' : 'none';
}

function showDetailsError(message) {
  detailsError.textContent = message;
  detailsError.classList.remove('d-none');
}

async function fetchFacts(page = 1, limit = 24) {
  try {
    const res = await fetch(`${FACTS_API_BASE}?limit=${limit}&page=${page}`);
    if (!res.ok) throw new Error('Erro ao buscar fatos');
    return await res.json();
  } catch (err) {
    throw err;
  }
}

async function loadDetails() {
  const params = new URLSearchParams(window.location.search);
  const page = parseInt(params.get('page') || '1', 10);
  const index = parseInt(params.get('index') || '', 10);

  if (Number.isNaN(index)) {
    showDetailsError('Índice do fato não informado na URL.');
    return;
  }

  toggleDetailsLoading(true);
  detailsError.classList.add('d-none');

  try {
    const res = await fetchFacts(page, 24);
    const items = res.data || [];
    if (index < 0 || index >= items.length) {
      showDetailsError('Fato não encontrado nesta página.');
      return;
    }
    const item = items[index];
    factTitle.textContent = `Fato #${(page - 1) * 24 + index + 1}`;
    factText.textContent = item.fact;
    factLength.textContent = item.length;
    const img = document.getElementById('fact-image');
    if (img) {
      img.src = `https://loremflickr.com/640/480/cat?random=${Date.now() + index}`;
      img.alt = 'imagem de gato';
    }
    detailsContainer.classList.remove('d-none');
  } catch (err) {
    showDetailsError('Não foi possível carregar os detalhes. Tente novamente.');
    console.error(err);
  } finally {
    toggleDetailsLoading(false);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  loadDetails();
});
