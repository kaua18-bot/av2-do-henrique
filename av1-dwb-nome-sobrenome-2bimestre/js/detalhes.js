// detalhes.js - Página de detalhes
const DETAILS_API_BASE = 'https://jsonplaceholder.typicode.com/posts';

const detailsLoading = document.getElementById('loading');
const detailsContainer = document.getElementById('details-container');
const postTitle = document.getElementById('post-title');
const postBody = document.getElementById('post-body');
const detailsError = document.getElementById('error-message');

function toggleDetailsLoading(show) {
  detailsLoading.style.display = show ? 'flex' : 'none';
}

function showDetailsError(message) {
  detailsError.textContent = message;
  detailsError.classList.remove('d-none');
}

async function fetchPostById(id) {
  try {
    const res = await fetch(`${DETAILS_API_BASE}/${encodeURIComponent(id)}`);
    if (!res.ok) throw new Error('Resposta da API não OK');
    const data = await res.json();
    return data;
  } catch (err) {
    throw err;
  }
}

async function loadDetails() {
  const params = new URLSearchParams(window.location.search);
  const id = params.get('id');

  if (!id) {
    showDetailsError('ID do post não informado na URL.');
    return;
  }

  toggleDetailsLoading(true);
  detailsError.classList.add('d-none');

  try {
    const post = await fetchPostById(id);
    postTitle.textContent = post.title;
    postBody.textContent = post.body;
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
