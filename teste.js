// Função de validação do formulário
function validateForm() {
    // Reseta as mensagens de erro e classes de validação
    document.querySelectorAll('.span-required').forEach(span => span.style.display = 'none');
    document.querySelectorAll('.form-control, .form-select').forEach(input => input.classList.remove('is-invalid'));

    let valid = true;

    // Validação de campo Data
    const data = document.getElementById('data');
    const dataError = document.getElementById('data-error');
    if (!data.value) {
        valid = false;
        data.classList.add('is-invalid');
        dataError.style.display = 'inline'; // Mostra a mensagem de erro
    }

    // Validação de campo Tipo de Entrada
    const tipoEntrada = document.getElementById('tipoEntrada');
    const tipoEntradaError = document.getElementById('tipoEntrada-error');
    if (tipoEntrada.value === "Selecione o tipo de pagamento") {
        valid = false;
        tipoEntrada.classList.add('is-invalid');
        tipoEntradaError.style.display = 'inline'; // Mostra a mensagem de erro
    }

    // Validação de campo Descrição
    const descricao = document.getElementById('descricao');
    const descricaoError = document.getElementById('descricao-error');
    if (!descricao.value) {
        valid = false;
        descricao.classList.add('is-invalid');
        descricaoError.style.display = 'inline'; // Mostra a mensagem de erro
    }

    // Validação de campo Forma de Pagamento
    const formaPagamento = document.getElementById('formaPagamento');
    const formaPagamentoError = document.getElementById('formaPagamento-error');
    if (formaPagamento.value === "Selecione o tipo de pagamento") {
        valid = false;
        formaPagamento.classList.add('is-invalid');
        formaPagamentoError.style.display = 'inline'; // Mostra a mensagem de erro
    }

    // Validação de campo Valor (apenas números)
    const valor = document.getElementById('valor');
    const valorError = document.getElementById('valor-error');
    const valorValue = valor.value.trim();
    if (!valorValue || isNaN(valorValue.replace(/[^\d,]/g, '').replace(',', '.'))) {
        valid = false;
        valor.classList.add('is-invalid');
        valorError.style.display = 'inline'; // Mostra a mensagem de erro
    }

    // Se o formulário for válido, podemos "salvar" os dados e fechar o modal
    if (valid) {
        // Simula o salvamento, aqui você pode adicionar a lógica para enviar os dados
        alert("Formulário validado e salvo com sucesso!");

        // Adiciona uma nova linha na tabela após a confirmação
        addRow();

        // Limpa os campos do formulário
        clearForm();

        // Fechar o modal
        var modal = bootstrap.Modal.getInstance(document.getElementById('exampleModal'));
        modal.hide(); // Fecha o modal
    }

    return valid;
}

// Função para limpar os campos do formulário
function clearForm() {
    const form = document.getElementById('form');
    form.reset();  // Limpa todos os campos do formulário

    // Limpar qualquer classe de erro
    document.querySelectorAll('.form-control, .form-select').forEach(input => input.classList.remove('is-invalid'));
    document.querySelectorAll('.span-required').forEach(span => span.style.display = 'none');
}

// Função para garantir que o campo valor aceite apenas números
document.getElementById('valor').addEventListener('input', function (event) {
    let valor = event.target.value;
    // Substitui todos os caracteres não numéricos
    event.target.value = valor.replace(/[^0-9.,]/g, '');
});

// Função para formatar o valor como moeda (R$ 1.000,00) enquanto o usuário digita
document.getElementById('valor').addEventListener('input', function (event) {
    let valor = event.target.value;

    // Remover tudo o que não for número ou vírgula
    valor = valor.replace(/[^\d,]/g, '');  // Remove caracteres não numéricos, mas mantém a vírgula

    // Se houver algum valor, começa a formatação
    if (valor) {
        // Primeiro, separa a parte inteira da parte decimal (caso exista)
        let [inteiro, decimal] = valor.split(',');

        // Formatar a parte inteira com separador de milhar (ponto)
        inteiro = inteiro.replace(/\B(?=(\d{3})+(?!\d))/g, '.');  // Adiciona ponto como separador de milhar

        // Limitar a parte decimal a 2 casas decimais
        if (decimal) {
            decimal = decimal.substring(0, 2);  // Limita a parte decimal a 2 dígitos
        }

        // Combina as partes inteira e decimal
        if (decimal) {
            valor = `${inteiro},${decimal}`;
        } else {
            valor = inteiro; // Se não tiver parte decimal, apenas a parte inteira
        }
    }

    // Coloca o símbolo "R$" na frente do valor
    event.target.value = 'R$ ' + valor;
});

// Função para adicionar uma nova linha
function addRow() {
    const data = document.getElementById("data").value;
    const tipoEntrada = document.getElementById("tipoEntrada");
    const tipoEntradaValue = tipoEntrada.options[tipoEntrada.selectedIndex].text; // Nome da seleção
    const descricao = document.getElementById("descricao").value;
    const formaPagamento = document.getElementById("formaPagamento");
    const formaPagamentoValue = formaPagamento.options[formaPagamento.selectedIndex].text; // Nome da seleção
    const valor = document.getElementById("valor").value;
    const anexo = document.getElementById("anexo").value;

    // Criar uma nova linha
    const table = document.querySelector("#tabela-container table tbody");
    const newRow = table.insertRow();

    // Adicionar células à linha
    const cell1 = newRow.insertCell(0);
    const cell2 = newRow.insertCell(1);
    const cell3 = newRow.insertCell(2);
    const cell4 = newRow.insertCell(3);
    const cell5 = newRow.insertCell(4);
    const cell6 = newRow.insertCell(5);
    const cell7 = newRow.insertCell(6);
    const cell8 = newRow.insertCell(7);

    // Preencher as células com os dados
    cell1.textContent = table.rows.length; // ID
    cell2.textContent = data;
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
    document.getElementById("data").value = "";
    document.getElementById("tipoEntrada").value = "";
    document.getElementById("descricao").value = "";
    document.getElementById("formaPagamento").value = "";
    document.getElementById("valor").value = "";
    document.getElementById("anexo").value = "";
}

// Função para editar uma linha
function editRow(button) {
    const row = button.closest("tr"); // Encontra a linha mais próxima
    const cells = row.querySelectorAll("td");

    // Verifica se a linha já está em modo de edição
    if (row.classList.contains("editing")) {
        // Sai do modo de edição e salva os valores
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
            } else if (index !== 6) { // Ignora a coluna de anexo
                const input = cell.querySelector("input");
                if (input) {
                    cell.textContent = input.value; // Salva o valor do input
                }
            }
        });
        row.classList.remove("editing");
        button.innerHTML = `<i class="bi bi-pen-fill text-warning"></i>`; // Volta ao ícone de editar
    } else {
        // Armazena os valores originais antes de entrar no modo de edição
        row.originalValues = [];
        cells.forEach((cell, index) => {
            if (index !== 6) { // Ignora a coluna de anexo
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
            } else if (index !== 6) { // Ignora a coluna de anexo
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
        } else if (index !== 6) { // Ignora a coluna de anexo
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

    cells.forEach((cell, index) => {
        if (index !== 6) { // Ignora a coluna de anexo
            cell.textContent = row.originalValues[index]; // Restaura o valor original
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

// Delegação de eventos para o ícone de excluir
document.querySelector('table tbody').addEventListener('click', function (e) {
    if (e.target && e.target.matches('i.bi-trash-fill')) {
        const row = e.target.closest('tr');
        row.remove(); // Remove a linha
    }
});