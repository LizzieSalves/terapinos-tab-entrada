console.log(window.bootstrap);


const form = document.getElementById('form');
const campos = document.querySelectorAll('.required');
const spans = document.querySelectorAll('.span-required');

// Função para exibir erro
function setError(index) {
  campos[index].classList.add('is-invalid'); // Adiciona a classe do Bootstrap
  spans[index].style.display = 'block'; // Exibe a mensagem de erro
}

// Função para remover erro
function removeError(index) {
  campos[index].classList.remove('is-invalid'); // Remove a classe de erro
  campos[index].classList.add('is-valid'); // Adiciona a classe válida
  spans[index].style.display = 'none'; // Remove a mensagem de erro
}

// Validação da data
function dataValidacao() {
  if (campos[0].value.length < 3) {
    setError(0);
    return false;
  } else {
    removeError(0);
    return true;
  }
}

// Validação do tipo de Entrada
function tipoEntradaValidacao() {
  if (!emailRegex.test(campos[1].value)) {
    setError(1);
    return false;
  } else {
    removeError(1);
    return true;
  }
}

// Validação da descrição
function descricaoValidacao() {
  if (campos[2].value.length < 11 || campos[2].value.length > 11) {
    setError(2);
    return false;
  } else {
    removeError(2);
    return true;
  }
}

// Validação do telefone
function descricaoValidacao() {
    if (campos[2].value.length < 11 || campos[2].value.length > 11) {
      setError(2);
      return false;
    } else {
      removeError(2);
      return true;
    }
  }
  

// Permitir apenas números no campo de telefone
function permitirApenasNumeros(event) {
  event.target.value = event.target.value.replace(/\D/g, '');
  telefoneValidacao(); // Chama a validação do telefone após formatar o valor
}

// Validação da mensagem
function mensagemValidacao() {
  if (campos[3].value.length < 2) {
    setError(3);
    return false;
  } else {
    removeError(3);
    return true;
  }
}

// Validação do checkbox de termos
function termosValidacao() {
  const checkbox = document.getElementById('invalidCheck3');
  if (!checkbox.checked) {
    document.getElementById('invalidCheck3Feedback').style.color = 'red';
    return false;
  } else {
    document.getElementById('invalidCheck3Feedback').style.color = '';
    return true;
  }
}

// Função para validar todo o formulário
function validarFormulario() {
  const nomeValido = nomeValidacao();
  const emailValido = emailValidacao();
  const telefoneValido = telefoneValidacao();
  const mensagemValida = mensagemValidacao();
  const termosValidos = termosValidacao();

  // Retorna true apenas se todos os campos estiverem válidos
  return nomeValido && emailValido && telefoneValido && mensagemValida && termosValidos;
}

// Adiciona o evento de submit ao formulário
form.addEventListener('submit', function (event) {
  // Impede o envio do formulário se a validação falhar
  if (!validarFormulario()) {
    event.preventDefault();
  } else {
    alert('Formulário enviado com sucesso!');
  }
});

// Adiciona o evento de input para o campo de telefone
campos[2].addEventListener('input', permitirApenasNumeros);

window.onload = function() {
    if (window.VLibras && window.VLibras.Widget) {
      new window.VLibras.Widget('https://vlibras.gov.br/app');
    } else {
      console.error('VLibras não foi carregado corretamente.');
    }
  };
  