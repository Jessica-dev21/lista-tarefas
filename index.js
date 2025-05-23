function abrirModal(){
    overlay.classList.add('active');
     criarTarefa.classList.add('active');
}

function fecharModal(){
    overlay.classList.remove('active');
    criarTarefa.classList.remove('active');
}


function buscarTarefas(){
    fetch("http://localhost:3001/tarefas")
    .then(res => res.json())
    .then(res =>{
        inserirTarefas(res);
    })
} buscarTarefas();


function inserirTarefas(listaDeTarefas){
    if(listaDeTarefas.length > 0){
        lista.innerHTML = ""
        listaDeTarefas.map(tarefa =>{
            lista.innerHTML +=`
            <li>
                <h5>${tarefa.titulo}</h5>
                <p>${tarefa.descricao}</p>
                <div class="ictions">
                    <box-icon name='trash' size="sm" onclick="deletarTarefa(${tarefa.id})"></box-icon>
                </div>
            </li>
            `;
        })
    }
}

function novaTarefa(){
    event.preventDefault();

    let tarefa = {
        titulo: titulo.value,
        descricao: descricao.value
    }

    fetch ("http://localhost:3001/tarefas",{
        method: "POST",
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify(tarefa)
    })

    .then(res => res.json())
    .then(res => {
        console.log(res);
       
    })
    alert("Tarefa criada com sucesso!");
    fecharModal();
    buscarTarefas();
    let form = document.querySelector("#criarTarefa form");
    form.reset();
}

function deletarTarefa(id){
    newFunction();
    fetch(`http://localhost:3001/tarefas/${id}`,{
        method: "DELETE",
        })
        .then (res => res.json())
        .then(res => {
            alert("Tarefa deletada com sucesso!");
            buscarTarefas();
        })

    function newFunction() {
        alert(id);
    }
}

function pesquisarTarefa(){
    let lis = document.querySelectorAll ("ul li");
    console.log(lis);
    if(busca.value.length > 0) {
        // Adicione aqui a lógica para pesquisar e filtrar as tarefas
        // Por exemplo:
        lis.forEach(li => {
            if (li.textContent.toLowerCase().includes(busca.value.toLowerCase())) {
                li.style.display = "";
            } else {
                li.style.display = "none";
            }
        });
    } else {
        lis.forEach(li => li.style.display = "");
    }
}
