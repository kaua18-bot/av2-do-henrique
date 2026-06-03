// script.js - Página de listagem (Cat Facts)
const FACTS_API_BASE = 'https://catfact.ninja/facts';
const PAGE_LIMIT = 24;

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

function createFactCard(factObj, index, page = 1) {
  const col = document.createElement('div');
  col.className = 'col-12 col-sm-6 col-lg-4';

  const card = document.createElement('div');
  card.className = 'card h-100 p-3';
  const img = document.createElement('img');
  img.className = 'img-fluid mb-2';
  img.alt = 'imagem de gato';
  // imagem aleatória de gato
  img.src = `https://loremflickr.com/320/240/cat?random=${Date.now() + index}`;

  const title = document.createElement('h5');
  title.className = 'fact-title';
  title.textContent = `Fato #${(page - 1) * PAGE_LIMIT + index + 1}`;

  const excerpt = document.createElement('p');
  excerpt.className = 'card-text fact-card-text flex-grow-1';
  excerpt.textContent = factObj.fact.length > 140 ? factObj.fact.slice(0, 140) + '...' : factObj.fact;

  const meta = document.createElement('p');
  meta.className = 'text-muted small';
  meta.textContent = `Comprimento: ${factObj.length}`;

  const btn = document.createElement('a');
  btn.className = 'btn btn-primary';
  btn.textContent = 'Ver Detalhes';
  btn.href = `detalhes.html?page=1&index=${index}`;
  card.appendChild(img);
  card.appendChild(title);
  card.appendChild(excerpt);
  card.appendChild(meta);
  card.appendChild(btn);
  col.appendChild(card);

  return col;
}

async function fetchFacts(page = 1, limit = PAGE_LIMIT) {
  try {
    const res = await fetch(`${FACTS_API_BASE}?limit=${limit}&page=${page}`);
    if (!res.ok) throw new Error('Erro ao buscar fatos de gatos');
    const data = await res.json();
    return data; // contains data array
  } catch (err) {
    throw err;
  }
}

async function loadFacts() {
  toggleLoading(true);
  errorMessage.classList.add('d-none');
  cardsContainer.innerHTML = '';

  try {
    const page = 1;
    const res = await fetchFacts(page, PAGE_LIMIT);
    const facts = res.data || [];
    if (facts.length === 0) {
      showError('Nenhum fato encontrado.');
      return;
    }
    facts.forEach((f, i) => {
      const card = createFactCard(f, i, page);
      cardsContainer.appendChild(card);
    });
  } catch (err) {
    showError('Não foi possível carregar os fatos. Tente novamente mais tarde.');
    console.error(err);
  } finally {
    toggleLoading(false);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  loadFacts();
});
