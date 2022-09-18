'use strict';

let banco = []

const pegarBanco = () => JSON.parse(localStorage.getItem('db_jastodo')) ?? [];

const EnviarBanco = (bnc) => localStorage.setItem('db_jastodo', JSON.stringify(bnc))

const novoItem = (texto, status = '', indice) => {
    const item = document.createElement('tr');
    item.classList.add('clsItem');
    item.innerHTML = `
    <tr>
        <th scope="row">${indice}</th>
        <td>
            <input class="form-check-input" type="checkbox" ${status} data-indice=${indice} >
        </td>
        <td>${texto}</td>
        <td>
            <button type="button" class="btn btn-outline-danger btn-sm" data-indice=${indice} >x</button>
        </td>
    </tr>
    `
    document.getElementById('tbListaTodo').appendChild(item);
}

const limparTarefas = () => {
    const tbListaTodo = document.getElementById('tbListaTodo');

    while (tbListaTodo.firstChild) {
        tbListaTodo.removeChild(tbListaTodo.lastChild)
    }
}

const atualizar = () => {
    limparTarefas();
    banco = pegarBanco();
    banco.forEach((item, indice) => novoItem(item.tarefa, item.status, indice));
}

const InserirItem = (evento) => {
    const tecla = evento.key;
    if (tecla == 'Enter') {
        const banco = pegarBanco();
        banco.push({ 'tarefa': evento.target.value, 'status': '' })
        EnviarBanco(banco);
        atualizar();
        evento.target.value = '';
    }
}

const removerItem = (indice) => {
    const banco = pegarBanco();
    banco.splice(indice, 1);
    EnviarBanco(banco);
    atualizar();
}

const atualizarItem = (indice) =>{
    const banco = pegarBanco();
    banco[indice].status = banco[indice].status == '' ? 'checked' : ''
    EnviarBanco(banco);
    atualizar();
}

const clickItem = (evento) => {
    const elemento = evento.target;
    const indice = elemento.dataset.indice;
    
    if (elemento.type == 'button') {        
        removerItem(indice);
    }
    else if (elemento.type == 'checkbox'){
        atualizarItem(indice);
    }
}

document.getElementById('txAtividade').addEventListener('keypress', InserirItem)
document.getElementById('tbListaTodo').addEventListener('click', clickItem);

atualizar();
