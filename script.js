const containerVideos = document.querySelector(".videos__container")
const barraDePesquisa = document.querySelector(".pesquisar__input")
const btnCategoria = document.querySelectorAll(".superior__item")

async function buscarEMostrarVideos() {
    try {
        const busca = await fetch("http://localhost:3000/videos")
        const videos = await busca.json()

        videos.forEach((video) => {
            if(video.categoria == "") {
                throw new Error("Vídeo sem categoria!");
            }
            containerVideos.innerHTML += `
                <li class="videos__item">
                    <iframe src="${video.url}" title="${video.titulo}" frameborder="0" allowfullscreen></iframe>
                    <div class="descricao-video">
                        <img class="img-canal" src="${video.imagem}">
                        <h3 class="titulo-video">${video.titulo}</h3>
                        <p class="titulo-canal">${video.descricao}</p>
                        <p class="categoria" hidden>${video.categoria}</p>
                    </div>
                </li>
            `
        })
    }
    catch(error) {
        containerVideos.innerHTML = `<p>Houve um erro ao carregar os vídeos: <strong>${error}</strong></p>`
    }
}

buscarEMostrarVideos()

/**
 * Filtrar Vídeos pela Barra de Pesquisa
 */
barraDePesquisa.addEventListener("input", filtrarPesquisa)
function filtrarPesquisa() {
    const videos = document.querySelectorAll(".videos__item")
    let valorFiltro = barraDePesquisa.value.toLowerCase()
    
    videos.forEach((video) => {
        const titulo = video.querySelector(".titulo-video").textContent.toLowerCase()
        video.style.display = titulo.includes(valorFiltro) ? "block" : "none"
    })
}


/**
 * Filtrar Vídeos pelo Botão da respectiva Categoria
 */
btnCategoria.forEach((botao) => {
    const nomeCategoria = botao.getAttribute("name")
    botao.addEventListener("click", () => filtrarPorCategoria(nomeCategoria))
})
function filtrarPorCategoria(filtro) {
    const videos = document.querySelectorAll(".videos__item")
    for(let video of videos) {
        let categoria = video.querySelector(".categoria").textContent.toLowerCase()
        let valorFiltro = filtro.toLowerCase()

        if(!categoria.includes(valorFiltro) && valorFiltro != "tudo") {
            video.style.display = "none"
        }
        else {
            video.style.display = "block"
        }
    }
}