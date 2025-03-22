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

    // Validação de campo Valor
    const valor = document.getElementById('valor');
    const valorError = document.getElementById('valor-error');
    if (!valor.value) {
        valid = false;
        valor.classList.add('is-invalid');
        valorError.style.display = 'inline'; // Mostra a mensagem de erro
    }

    // Se o formulário for válido, podemos "salvar" os dados e fechar o modal
    if (valid) {
        // Simula o salvamento, aqui você pode adicionar a lógica para enviar os dados
        alert("Formulário validado e salvo com sucesso!");

        // Fechar o modal
        var modal = bootstrap.Modal.getInstance(document.getElementById('exampleModal'));
        modal.hide(); // Fecha o modal
    }

    return valid;
}