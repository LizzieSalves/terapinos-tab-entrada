// Função para adicionar uma nova linha
function addRow() {
    const data = document.getElementById("data").value;
    const tipoEntrada = document.getElementById("tipoEntrada").value;
    const descricao = document.getElementById("descricao").value;
    const formaPagamento = document.getElementById("formaPagamento").value;
    const valor = document.getElementById("valor").value;
    const anexo = document.getElementById("anexo").value;
  
    // Verificar se os campos não estão vazios
    if (data === "" || tipoEntrada === "" || descricao === "" || formaPagamento === "" || valor === "") {
      alert("Por favor, preencha todos os campos.");
      return;
    }
  
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
    cell3.textContent = descricao;
    cell4.textContent = formaPagamento;
    cell5.textContent = valor;
    cell6.textContent = tipoEntrada;
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
        } else if (index === 3) { // Coluna de Forma de Pagamento
          const select = cell.querySelector("select");
          if (select) {
            cell.textContent = select.value; // Salva o valor selecionado
          }
        } else if (index === 5) { // Coluna de Tipo de Entrada
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
        } else if (index === 3) { // Coluna de Forma de Pagamento
          const formaPagamento = cell.textContent;
          cell.innerHTML = `
            <select class="form-select">
              <option value="Dinheiro" ${formaPagamento === "Dinheiro" ? "selected" : ""}>Dinheiro</option>
              <option value="Débito" ${formaPagamento === "Débito" ? "selected" : ""}>Débito</option>
              <option value="Crédito" ${formaPagamento === "Crédito" ? "selected" : ""}>Crédito</option>
              <option value="Pix" ${formaPagamento === "Pix" ? "selected" : ""}>Pix</option>
            </select>
          `;
        } else if (index === 5) { // Coluna de Tipo de Entrada
          const tipoEntrada = cell.textContent;
          cell.innerHTML = `
            <select class="form-select">
              <option value="Consulta" ${tipoEntrada === "Consulta" ? "selected" : ""}>Consulta</option>
              <option value="Débito" ${tipoEntrada === "Débito" ? "selected" : ""}>Débito</option>
              <option value="Crédito" ${tipoEntrada === "Crédito" ? "selected" : ""}>Crédito</option>
              <option value="Pix" ${tipoEntrada === "Pix" ? "selected" : ""}>Pix</option>
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
      } else if (index === 3) { // Coluna de Forma de Pagamento
        const select = cell.querySelector("select");
        if (select) {
          cell.textContent = select.value; // Salva o valor selecionado
        }
      } else if (index === 5) { // Coluna de Tipo de Entrada
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
  
  // Adiciona o evento de clique ao botão "Salvar" do modal
  document.getElementById("btn-salvar").addEventListener("click", addRow);