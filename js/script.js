const API_URL = 'https://api.tvmaze.com/shows';
const seriesGrid = document.querySelector('#seriesGrid');
const loadingState = document.querySelector('#loadingState');
const errorMessage = document.querySelector('#errorMessage');
const searchInput = document.querySelector('#searchInput');
const loadMoreBtn = document.querySelector('#loadMoreBtn');
const pageInfo = document.querySelector('#pageInfo');

let allSeries = [];
let filteredSeries = [];
let currentPage = 1;
const seriesPerPage = 20;

// Busca inicial dos shows na API TVMaze usando fetch e async/await.
const fetchShows = async () => {
  try {
    showLoading(true);
    let allData = [];
    
    // Busca múltiplas páginas para obter o máximo de séries mundiais possível
    for (let page = 0; page < 15; page++) {
      try {
        const response = await fetch(`${API_URL}?page=${page}`);
        if (!response.ok) {
          if (page === 0) {
            throw new Error('Falha ao carregar os dados da API.');
          }
          break;
        }
        const data = await response.json();
        if (data.length === 0) break;
        allData = [...allData, ...data];
      } catch (err) {
        if (page === 0) throw err;
        break;
      }
    }
    
    if (allData.length === 0) {
      throw new Error('Nenhuma série encontrada.');
    }
    
    allSeries = allData;
    filteredSeries = [...allSeries];
    renderPage();
  } catch (error) {
    showError(error.message || 'Ocorreu um erro inesperado.');
  } finally {
    showLoading(false);
  }
};

// Mostra ou oculta o indicador de carregamento enquanto a requisição está em andamento.
const showLoading = (isLoading) => {
  loadingState.classList.toggle('d-none', !isLoading);
  pageInfo.textContent = isLoading ? '' : `Página ${currentPage}`;
};

const showError = (message) => {
  errorMessage.textContent = message;
  errorMessage.classList.remove('d-none');
};

const clearError = () => {
  errorMessage.classList.add('d-none');
  errorMessage.textContent = '';
};

// Retorna apenas as séries da página atual para paginação simples.
const getPageSeries = () => {
  const start = (currentPage - 1) * seriesPerPage;
  const end = start + seriesPerPage;
  return filteredSeries.slice(start, end);
};

const renderPage = () => {
  clearError();
  seriesGrid.innerHTML = '';
  const pageSeries = getPageSeries();

  if (pageSeries.length === 0) {
    seriesGrid.innerHTML = `<div class="col-12 text-center text-muted py-5"><h3>Nenhuma série encontrada.</h3><p>Tente outro termo de pesquisa ou carregue mais séries.</p></div>`;
    pageInfo.textContent = '';
    return;
  }

  pageSeries.forEach((serie) => {
    const card = createSeriesCard(serie);
    seriesGrid.appendChild(card);
  });

  const totalPages = Math.ceil(filteredSeries.length / seriesPerPage);
  const totalSeries = allSeries.length;
  const startItem = (currentPage - 1) * seriesPerPage + 1;
  const endItem = Math.min(currentPage * seriesPerPage, filteredSeries.length);
  
  pageInfo.textContent = `${startItem}-${endItem} de ${filteredSeries.length} ${filteredSeries.length === totalSeries ? `(${totalSeries} séries)` : 'resultados'}`;
  loadMoreBtn.disabled = currentPage >= totalPages;
};

// Cria o card HTML para cada série exibida no catálogo.
const createSeriesCard = (serie) => {
  const col = document.createElement('div');
  col.className = 'col-6 col-sm-4 col-md-3 col-lg-2_4';

  const card = document.createElement('article');
  card.className = 'card-series';
  card.innerHTML = `
    <img src="${serie.image?.medium || 'https://via.placeholder.com/420x594?text=Sem+imagem'}" alt="${serie.name}" class="img-fluid" />
    <div class="card-body">
      <h3 class="card-title">${serie.name}</h3>
      <p class="card-text">${serie.genres.slice(0, 2).join(' • ') || 'Gênero indisponível'}</p>
      <div class="mb-3">
        ${serie.rating?.average ? `<span class="badge bg-warning text-dark">⭐ ${serie.rating.average.toFixed(1)}</span>` : '<span class="badge bg-secondary">Sem avaliação</span>'}
      </div>
      <a href="detalhes.html?id=${serie.id}" class="btn btn-warning btn-detail w-100">Detalhes</a>
    </div>
  `;

  col.appendChild(card);
  return col;
};

// Filtra a lista de séries conforme o usuário digita no campo de pesquisa.
const handleSearch = (event) => {
  const searchTerm = event.target.value.toLowerCase().trim();
  currentPage = 1;
  
  if (searchTerm === '') {
    filteredSeries = [...allSeries];
  } else {
    filteredSeries = allSeries.filter((serie) => 
      serie.name.toLowerCase().includes(searchTerm)
    );
  }
  
  renderPage();
};

const handleLoadMore = () => {
  currentPage += 1;
  renderPage();
  window.scrollTo({ top: document.querySelector('#catalogo').offsetTop - 100, behavior: 'smooth' });
};

searchInput.addEventListener('input', handleSearch);
loadMoreBtn.addEventListener('click', handleLoadMore);

window.addEventListener('DOMContentLoaded', fetchShows);
