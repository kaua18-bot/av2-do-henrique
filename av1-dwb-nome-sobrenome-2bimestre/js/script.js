// script.js - Página de listagem
const API_URL = 'https://jsonplaceholder.typicode.com/posts';

const loadingElement = document.getElementById('loading');
const cardsContainer = document.getElementById('cards-container');
const errorMessage = document.getElementById('error-message');

// Mostra ou esconde o spinner
function toggleLoading(show) {
  loadingElement.style.display = show ? 'flex' : 'none';
}

// Mostra uma mensagem de erro
function showError(message) {
  errorMessage.textContent = message;
  errorMessage.classList.remove('d-none');
}

// Cria um card Bootstrap para um post
function createPostCard(post) {
  const col = document.createElement('div');
  col.className = 'col-12 col-sm-6 col-lg-4';

  const card = document.createElement('div');
  card.className = 'card h-100';

  const body = document.createElement('div');
  body.className = 'card-body d-flex flex-column';

  const title = document.createElement('h5');
  title.className = 'card-title';
  title.textContent = post.title;

  const excerpt = document.createElement('p');
  excerpt.className = 'card-text card-excerpt flex-grow-1';
  excerpt.textContent = post.body.length > 120 ? post.body.slice(0, 120) + '...' : post.body;

  const btnWrapper = document.createElement('div');
  btnWrapper.className = 'mt-3';

  const detailsBtn = document.createElement('a');
  detailsBtn.className = 'btn btn-primary';
  detailsBtn.textContent = 'Ver Detalhes';
  detailsBtn.href = `detalhes.html?id=${post.id}`;

  btnWrapper.appendChild(detailsBtn);
  body.appendChild(title);
  body.appendChild(excerpt);
  body.appendChild(btnWrapper);
  card.appendChild(body);
  col.appendChild(card);

  return col;
}

// Busca posts da API
async function fetchPosts() {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) throw new Error('Erro na resposta da API');
    const posts = await response.json();
    return posts;
  } catch (error) {
    throw error;
  }
}

// Carrega e renderiza os posts
async function loadPosts() {
  toggleLoading(true);
  errorMessage.classList.add('d-none');
  cardsContainer.innerHTML = '';

  try {
    const posts = await fetchPosts();
    // Limitar a exibição para 24 itens para manter layout agradável
    const limited = posts.slice(0, 24);
    limited.forEach(post => {
      const card = createPostCard(post);
      cardsContainer.appendChild(card);
    });
  } catch (err) {
    showError('Não foi possível carregar os posts. Tente novamente mais tarde.');
    console.error(err);
  } finally {
    toggleLoading(false);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  loadPosts();
});
