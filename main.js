import './style.css'
import '@picocss/pico'
const perfilLocalizar = document.querySelector('#consultarCep')
const inputNome = perfilLocalizar.nome // seleciona o input do a partir do formulário
const divDados = document.querySelector('#dados')
const btnConsultarPerfil = document.querySelector('#btnConsultarPerfil')


perfilLocalizar.addEventListener('submit', function (event) {
  event.preventDefault() // anula comportamento padrão de envio do form ao clicar no botão
  ativaLoader(true)
  localizadorPerfil(inputNome.value) // invoca a função passando o nome digitado por parâmetro
})

async function localizadorPerfil(nome) {
  let response = await fetch(`https://api.github.com/users/${nome}`)
  let dadosPerfil = await response.json()
  if (dadosPerfil.message === 'Not Found') {
    divDados.innerHTML = `
      <div class="erro">Usuario não encontrado!</div>
    `
  } else {
    divDados.innerHTML = `
    <img src="${dadosPerfil.avatar_url}" alt="">
    <p> ${dadosPerfil.name}</p> 
    <a href="${dadosPerfil.html_url}">Perfil no GitHub</a>   
  `
  }
  ativaLoader(false)
}

function ativaLoader(ativo) {
  if (ativo) {
    btnConsultarPerfil.setAttribute('aria-busy', 'true')
    btnConsultarPerfil.textContent = 'Buscado Perfil...'
  } else {
    btnConsultarPerfil.removeAttribute('aria-busy')
    btnConsultarPerfil.textContent = 'Buscar'
  }
}