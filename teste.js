// Função de validação e envio do formulário
function validateForm() {
  console.log("validateForm() foi chamado");


  let valid = false; // Assume que não há valores preenchidos corretamente
  const inputs = document.querySelectorAll('.form-control[required], .form-select[required]');

  // Verifica se pelo menos um campo tem um valor válido
  inputs.forEach(input => {
    if (input.tagName === 'SELECT') {
      if (input.value.trim() !== '') {
        valid = true;
      }
    } else {
      if (/\d/.test(input.value.trim())) { // Pelo menos um número no input
        valid = true;
      }
    }
  });

 

  if (valid) {
    addRow(); // Adiciona a nova linha na tabela
    clearForm(); // Limpa os campos do formulário

    var modal = bootstrap.Modal.getInstance(document.getElementById('entradaModal'));
    if (modal) modal.hide();
    
  }

  
}

let form = document.getElementById("entradaForm");
console.log(form); // Isso deve mostrar o formulário no console

if (form) {
    form.reset(); // Reseta o formulário se ele existir
} else {
    console.error("O formulário não foi encontrado!");
}


// Função para limpar os campos do formulário
function clearForm() {
  document.getElementById('entradaForm').reset(); // Limpa todos os campos
  document.querySelectorAll('.form-control, .form-select').forEach(input => input.classList.remove('is-invalid'));
}

// Função para formatar valores monetários
function formatarValor(input) {
  let valor = input.value.replace(/\D/g, '');
  valor = valor.split('').reverse().join('');

  if (valor.length >= 2) {
    valor = valor.slice(0, -2) + ',' + valor.slice(-2);
  }

  valor = valor.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
  input.value = 'R$ ' + valor;
}


// Função para adicionar uma nova linha
function addRow() {

  function addRow() {
    console.log("Adicionando nova linha na tabela...");
  }
  
  
try {
  // Código suspeito de erro
} catch (e) {
  console.error("Erro capturado:", e);
  alert("Erro capturado! Veja o console.");
}


  const dataInput = document.getElementById("dataHora").value; // Captura a data do formulário (formato: yyyy-mm-dd)
  const tipoEntrada = document.getElementById("tiposEntrada");
  const tipoEntradaValue = tipoEntrada.options[tipoEntrada.selectedIndex].text; // Nome da seleção
  const descricao = document.getElementById("descricao").value;
  const formaPagamento = document.getElementById("formaPagamento");
  const formaPagamentoValue = formaPagamento.options[formaPagamento.selectedIndex].text; // Nome da seleção
  const valor = document.getElementById("valor").value;
  const anexo = document.getElementById("anexo").value;

  // Formatar a data para o formato dd/mm/aaaa (apenas para exibição na tabela)
  const dataFormatada = formatarData(dataInput);

  // Captura a data e hora atual para o envio
  const dataHoraEnvio = new Date();
  const horaFormatada = dataHoraEnvio.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }); // Formato: hh:mm

  // Criar uma nova linha
  const table = document.querySelector("#tabela-container table tbody");
  const newRow = table.insertRow();

  // Adicionar células à linha
  const cell1 = newRow.insertCell(0); // ID
  const cell2 = newRow.insertCell(1); // Data do formulário (formatada)
  const cell3 = newRow.insertCell(2); // Tipo de Entrada
  const cell4 = newRow.insertCell(3); // Descrição
  const cell5 = newRow.insertCell(4); // Forma de Pagamento
  const cell6 = newRow.insertCell(5); // Valor
  const cell7 = newRow.insertCell(6); // Anexo
  const cell8 = newRow.insertCell(7); // Ações

  // Preencher as células com os dados
  cell1.textContent = table.rows.length; // ID
  cell2.textContent = `${dataFormatada} - ${horaFormatada}`; // Usa a data formatada (dd/mm/aaaa)
  cell3.textContent = tipoEntradaValue;  // Exibe o nome do tipo de entrada
  cell4.textContent = descricao; // Usa o valor real do select
  cell5.textContent = formaPagamentoValue; // Exibe o nome da forma de pagamento
  cell6.textContent = 'R$ ' + valor; // Usa o valor real do select
  cell7.innerHTML = `<input class="form-control" type="file" multiple>`;
  cell8.innerHTML = `
    <button onclick="editRow(this)">
      <i class="bi bi-pen-fill text-warning"></i>
    </button>
    <button type="button">
      <i class="bi bi-trash-fill text-danger delete-btn"></i>
    </button>
  `;

  // Limpar os campos de entrada
  document.getElementById("dataHora").value = ""; // Limpa o campo de data
  document.getElementById("tiposEntrada").value = "";
  document.getElementById("descricao").value = "";
  document.getElementById("formaPagamento").value = "";
  document.getElementById("valor").value = "";
  document.getElementById("anexo").value = "";
}

// Função para formatar a data no formato dd/mm/aaaa
function formatarData(data) {
  const [ano, mes, dia] = data.split('-'); // Divide a data em partes
  return `${dia}/${mes}/${ano}`; // Retorna no formato dd/mm/aaaa
}


// Função para editar uma linha
function editRow(button) {
  const row = button.closest("tr"); // Encontra a linha mais próxima
  const cells = row.querySelectorAll("td");

  // Verifica se a linha já está em modo de edição
  if (row.classList.contains("editing")) {
    // Sai do modo de edição e salva os valores
    saveRow(button);
  } else {
    // Armazena os valores originais antes de entrar no modo de edição
    row.originalValues = [];
    cells.forEach((cell, index) => {
      if (index !== 0 && index !== 6 && index !== 7) { // Ignora a coluna de ID, anexo e data/hora do envio
        row.originalValues.push(cell.textContent); // Salva o valor original
      }
    });

    // Entra no modo de edição
    cells.forEach((cell, index) => {
      if (index === 1) { // Coluna de Data/Hora
        const [data, hora] = cell.textContent.split(" - "); // Separa data e hora
        cell.innerHTML = `
          <input type="date" value="${data}" class="form-control">
          <input type="time" value="${hora || ''}" class="form-control mt-1">
        `;
      } else if (index === 2) { // Coluna de Tipo de Entrada
        const tipoEntrada = cell.textContent;
        cell.innerHTML = `
          <select class="form-select">
            <option value="Consulta" ${tipoEntrada === "Consulta" ? "selected" : ""}>Consulta</option>
            <option value="Revisão" ${tipoEntrada === "Revisão" ? "selected" : ""}>Revisão</option>
            <option value="Retorno" ${tipoEntrada === "Retorno" ? "selected" : ""}>Retorno</option>
            <option value="Outro" ${tipoEntrada === "Outro" ? "selected" : ""}>Outro</option>
          </select>
        `;
      } else if (index === 4) { // Coluna de Forma de Pagamento
        const formaPagamento = cell.textContent;
        cell.innerHTML = `
          <select class="form-select">
            <option value="Dinheiro" ${formaPagamento === "Dinheiro" ? "selected" : ""}>Dinheiro</option>
            <option value="Débito" ${formaPagamento === "Débito" ? "selected" : ""}>Débito</option>
            <option value="Crédito" ${formaPagamento === "Crédito" ? "selected" : ""}>Crédito</option>
            <option value="Pix" ${formaPagamento === "Pix" ? "selected" : ""}>Pix</option>
          </select>
        `;
      } else if (index !== 0 && index !== 6 && index !== 7) { // Ignora a coluna de ID, anexo e data/hora do envio
        const text = cell.textContent;
        cell.innerHTML = `<input type="text" value="${text}" class="form-control">`; // Transforma em input
      }
    });
    row.classList.add("editing");
    // Substitui os botões de editar/excluir por salvar/cancelar
    const actionsCell = row.querySelector("td:last-child");
    actionsCell.innerHTML = `
      <button onclick="saveRow(this)">
        <i class="bi bi-check-circle-fill text-success"></i>
      </button>
      <button onclick="cancelEdit(this)">
        <i class="bi bi-x-circle-fill text-danger"></i>
      </button>
    `;
  }
}

// Função para salvar a edição
function saveRow(button) {
  const row = button.closest("tr");
  const cells = row.querySelectorAll("td");

  cells.forEach((cell, index) => {
    if (index === 1) { // Coluna de Data/Hora
      const inputDate = cell.querySelector("input[type='date']");
      const inputTime = cell.querySelector("input[type='time']");
      if (inputDate && inputTime) {
        const data = inputDate.value;
        const hora = inputTime.value || new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        cell.textContent = `${data} - ${hora}`; // Formata a data e hora
      }
    } else if (index === 2) { // Coluna de Tipo de Entrada
      const select = cell.querySelector("select");
      if (select) {
        cell.textContent = select.value; // Salva o valor selecionado
      }
    } else if (index === 4) { // Coluna de Forma de Pagamento
      const select = cell.querySelector("select");
      if (select) {
        cell.textContent = select.value; // Salva o valor selecionado
      }
    } else if (index !== 0 && index !== 6 && index !== 7) { // Ignora a coluna de ID, anexo e data/hora do envio
      const input = cell.querySelector("input");
      if (input) {
        cell.textContent = input.value; // Salva o valor do input
      }
    }

  });

  // Volta aos botões de editar/excluir
  const actionsCell = row.querySelector("td:last-child");
  actionsCell.innerHTML = `
    <button onclick="editRow(this)">
      <i class="bi bi-pen-fill text-warning"></i>
    </button>
    <button type="button">
      <i class="bi bi-trash-fill text-danger delete-btn"></i>
    </button>
  `;
  row.classList.remove("editing");
}

// Função para cancelar a edição
function cancelEdit(button) {
  const row = button.closest("tr");
  const cells = row.querySelectorAll("td");

  // Restaura os valores originais
  cells.forEach((cell, index) => {
    if (index !== 0 && index !== 6 && index !== 7) { // Ignora a coluna de ID, anexo e data/hora do envio
      cell.textContent = row.originalValues[index - 1]; // Restaura o valor original
    }
  });

  // Volta aos botões de editar/excluir
  const actionsCell = row.querySelector("td:last-child");
  actionsCell.innerHTML = `
    <button onclick="editRow(this)">
      <i class="bi bi-pen-fill text-warning"></i>
    </button>
    <button type="button">
      <i class="bi bi-trash-fill text-danger delete-btn"></i>
    </button>
  `;
  row.classList.remove("editing");
}

// Delegação de eventos para o ícone de exclusão
document.querySelector("#tabela-container table tbody").addEventListener("click", function (event) {
  if (event.target.classList.contains("delete-btn")) {
    // Exibe um alerta de confirmação
    const confirmacao = confirm("Tem certeza que deseja excluir esta linha?");

    // Se o usuário confirmar, remove a linha
    if (confirmacao) {
      const row = event.target.closest("tr"); // Encontra a linha mais próxima
      row.remove(); // Remove a linha
    }
  }
});

// function validateForm() {
//   console.log("Validando formulário...");
// }
