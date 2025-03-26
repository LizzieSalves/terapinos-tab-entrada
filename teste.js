// Função de validação e envio do formulário
function validateForm() {

  let valid = true;

  // Verifica se os campos obrigatórios estão preenchidos
  document.querySelectorAll('.form-control, .form-select').forEach(input => {
    if (input.hasAttribute('required') && input.value.trim() === '') {
      valid = false;
    } else {
      input.classList.remove('is-invalid');
    }
  });

  // console.log("validateForm() foi chamado");


  if (valid) {
    addRow(); // Adiciona a nova linha na tabela
    clearForm(); // Limpa os campos do formulário

    document.getElementById('entradaModal').addEventListener('shown.bs.modal', function () {
      this.removeAttribute('aria-hidden');
    });

    document.activeElement.blur(); // Remove o foco do elemento ativo
    var modal = bootstrap.Modal.getInstance(document.getElementById('entradaModal'));
    if (modal) modal.hide();


    var modal = bootstrap.Modal.getInstance(document.getElementById('entradaModal'));
    if (modal) modal.hide();

  }


}

// let form = document.getElementById("entradaForm");
// console.log(form); // Isso deve mostrar o formulário no console

// if (form) {
//   form.reset(); // Reseta o formulário se ele existir
// } else {
//   console.error("O formulário não foi encontrado!");
// }


// Função para limpar os campos do formulário
function clearForm() {
  document.getElementById('entradaForm').reset(); // Limpa todos os campos
  document.querySelectorAll('.form-control, .form-select').forEach(input => input.classList.remove('is-invalid'));
}



// Função para formatar valores monetários no estilo R$ X.XXX,XX
function formatarValor(input) {
  let valor = input.value.replace(/\D/g, ''); // Remove tudo que não for número

  // Remove os zeros à esquerda, mas mantém pelo menos um zero para evitar campo vazio
  valor = valor.replace(/^0+/, '') || '0';

  // Garante que pelo menos dois números estejam presentes para os centavos
  while (valor.length < 3) {
    valor = '0' + valor;
  }

  // Separa os últimos dois dígitos para os centavos
  let centavos = valor.slice(-2);
  let inteiros = valor.slice(0, -2);

  // Formata os milhares com pontos
  inteiros = inteiros.replace(/\B(?=(\d{3})+(?!\d))/g, '.');

  input.value = `R$ ${inteiros},${centavos}`;
}


// Função para adicionar uma nova linha
function addRow() {

  const dataInput = document.getElementById("dataHora").value; // Captura a data do formulário (formato: yyyy-mm-dd)
  const tipoEntrada = document.getElementById("tiposEntrada");
  const tipoEntradaValue = tipoEntrada.options[tipoEntrada.selectedIndex].text; // Nome da seleção
  const descricao = document.getElementById("descricao").value;
  const formaPagamento = document.getElementById("formaPagamento");
  const formaPagamentoValue = formaPagamento.options[formaPagamento.selectedIndex].text; // Nome da seleção
  const valor = document.getElementById("valor").value;
  const anexo = document.getElementById("anexo").value;

  // Formatar a data para o formato dd/mm/aaaa
  const dataFormatada = formatarData(dataInput);

  // Captura a data e hora atual para o envio
  const dataHoraEnvio = new Date();
  const horaFormatada = dataHoraEnvio.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });

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
  cell4.classList.add("truncate"); // Adiciona a classe truncate à descrição
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
        const conteudoDataHora = cell.textContent.trim();

        // Separar data e hora corretamente
        let [data, hora] = conteudoDataHora.split(" - ");

        // Converter data para o formato yyyy-MM-dd esperado pelo input[type="date"]
        let partesData = data.split("/");
        let dataFormatada = `${partesData[2]}-${partesData[1]}-${partesData[0]}`; // yyyy-MM-dd

        //     // / Converter data para o formato yyyy-MM-dd esperado pelo input[type="date"]
        // let dataFormatada = formataData(data);

        cell.innerHTML = `
          <input type="date" value="${dataFormatada}" class="form-control">
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
      } else if (index === 5) { // Coluna de Valor (com formatação)
        let valor = cell.textContent.replace(/[^\d,]/g, ''); // Remove caracteres extras (R$, espaços, etc.)
        cell.innerHTML = `
      <input type="text" value="${valor}" class="form-control" oninput="formatarValor(this)">
    `;
      } else if (index !== 0 && index !== 6 && index !== 7) { // Ignora ID, anexo e data/hora do envio
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
    } else if (index === 2 || index === 4) { // Coluna de Tipo de Entrada ou Forma de Pagamento
      const select = cell.querySelector("select");
      if (select) {
        const originalValue = row.originalValues[index - 1]; // Valor original salvo antes da edição
        const selectedValue = select.value; // Valor atualmente selecionado

        // Se o valor não for alterado, mantém o original
        cell.textContent = (selectedValue === "" || selectedValue === select.options[0].value) ? originalValue : selectedValue;
      }
    } else if (index === 5) {
      const valor = cell.querySelector("input[type='text']");
      if (valor) {
        const originalValue = row.originalValues[index - 1]; // Valor original salvo antes da edição
        const newValue = valor.value.trim(); // Remove espaços em branco

        // Se o input estiver vazio, mantém o valor original
        cell.textContent = newValue !== "" ? newValue : originalValue;
        
      }
    }

    else if (index !== 0 && index !== 6 && index !== 7) { // Ignora a coluna de ID, anexo e data/hora do envio
      const input = cell.querySelector("input");
      if (input) {
        const originalValue = row.originalValues[index - 1]; // Valor original salvo antes da edição
        const newValue = input.value.trim(); // Remove espaços em branco

        // Se o input estiver vazio, mantém o valor original
        cell.textContent = newValue !== "" ? newValue : originalValue;
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
