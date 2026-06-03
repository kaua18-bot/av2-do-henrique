const detailContent = document.querySelector('#detailContent');
const loadingDetail = document.querySelector('#loadingDetail');
const errorDetail = document.querySelector('#errorDetail');
const detailImage = document.querySelector('#detailImage');
const detailTitle = document.querySelector('#detailTitle');
const detailGenres = document.querySelector('#detailGenres');
const detailRating = document.querySelector('#detailRating');
const detailStatus = document.querySelector('#detailStatus');
const detailLanguage = document.querySelector('#detailLanguage');
const detailSummary = document.querySelector('#detailSummary');
const detailPremiered = document.querySelector('#detailPremiered');
const detailNetwork = document.querySelector('#detailNetwork');
const detailOfficialSite = document.querySelector('#detailOfficialSite');
const detailTags = document.querySelector('#detailTags');

// Captura o parâmetro id da URL para buscar os detalhes da série.
const getSeriesIdFromUrl = () => {
  const params = new URLSearchParams(window.location.search);
  return params.get('id');
};

const setError = (message) => {
  loadingDetail.classList.add('d-none');
  errorDetail.textContent = message;
  errorDetail.classList.remove('d-none');
};

// Controla a exibição do spinner de carregamento na página de detalhes.
const setLoading = (isLoading) => {
  loadingDetail.classList.toggle('d-none', !isLoading);
  if (!isLoading) {
    loadingDetail.classList.add('d-none');
  }
};

// Preenche a página com os detalhes da série recebida da API.
const renderDetail = (serie) => {
  detailImage.src = serie.image?.original || serie.image?.medium || 'https://via.placeholder.com/1200x675?text=S%C3%A9rie+sem+imagem';
  detailImage.alt = `Banner de ${serie.name}`;
  detailTitle.textContent = serie.name;
  detailGenres.textContent = serie.genres.join(' • ') || 'Gênero não informado';
  detailRating.textContent = serie.rating?.average ? `⭐ ${serie.rating.average.toFixed(1)}` : 'Sem avaliação';
  detailRating.className = serie.rating?.average ? 'badge bg-warning text-dark' : 'badge bg-secondary';
  detailStatus.textContent = serie.status || 'Status indisponível';
  detailLanguage.textContent = (serie.language || 'Idioma não informado').toUpperCase();
  detailSummary.innerHTML = serie.summary || '<p class="text-secondary">Resumo não disponível.</p>';
  detailPremiered.textContent = serie.premiered ? new Date(serie.premiered).toLocaleDateString('pt-BR') : 'Não informado';
  detailNetwork.textContent = serie.network?.name || serie.webChannel?.name || 'Indisponível';
  detailOfficialSite.innerHTML = serie.officialSite
    ? `<a href="${serie.officialSite}" target="_blank" rel="noopener noreferrer">Visitar site</a>`
    : 'Não disponível';
  detailTags.textContent = serie.genres.join(', ') || 'Sem gêneros';
  detailContent.classList.remove('d-none');
};

// Realiza a requisição à API de detalhes usando o ID fornecido pela URL.
const fetchDetails = async (id) => {
  try {
    if (!id) {
      throw new Error('ID da série não informado.');
    }
    const response = await fetch(`https://api.tvmaze.com/shows/${id}`);
    if (!response.ok) {
      throw new Error('Não foi possível recuperar os detalhes da série.');
    }
    const data = await response.json();
    renderDetail(data);
  } catch (error) {
    setError(error.message || 'Ocorreu um erro ao carregar detalhes.');
  } finally {
    setLoading(false);
  }
};

window.addEventListener('DOMContentLoaded', () => {
  const seriesId = getSeriesIdFromUrl();
  fetchDetails(seriesId);
});
