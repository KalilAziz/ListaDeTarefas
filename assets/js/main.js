const inputTarefa = document.querySelector('.input-tarefa')
const btnTarefa = document.querySelector('.btn-tarefa')
const tarefas = document.querySelector('.tarefas')


btnTarefa.addEventListener('click', function(e){
    if(!inputTarefa.value) return //está finalizando a função se o usuário clicar enquanto não tiver texto, fazendo assim com que não aconteça resultado se o campo de texto está em branco. Como colocando normalmente o resultado deria negativo, colocamos o "!" para que saia positivo
    criaTarefa(inputTarefa.value)
    
})

//serve para que ao precionar a tecla que precisamos, aconteça tal evento
inputTarefa.addEventListener('keypress', function(e){
    //console.log(e) usamos para saber o key da tecla enter, sendo o 13
    if (e.keyCode ===13) {
        //console.log('Enter pressionado') Usado para testar
    if(!inputTarefa.value) return //está finalizando a função se o usuário clicar enquanto não tiver texto, fazendo assim com que não aconteça resultado se o campo de texto está em branco. Como colocando normalmente o resultado deria negativo, colocamos o "!" para que saia positivo
    criaTarefa(inputTarefa.value)
    }
})

//criar o li
function criaLi(){ 
    const li = document.createElement('li')
    return li
}

//cria a tarefa
function criaTarefa(textoInput){
    const li = criaLi();
    li.innerText = textoInput;
    tarefas.appendChild(li)
    limpaInput()
    criaBotaoApagar(li)
    salvarTarefas()
}

//Limpa o input e permanece com o ponteiro com focus
function limpaInput(){
    inputTarefa.value = ''
    inputTarefa.focus();
}

function criaBotaoApagar(li){
    li.innerText += ' '
    const botaoApagar = document.createElement('button')
    botaoApagar.innerText = 'Apagar'
    //botaoApagar.classList.add('apagar') poderiamos colocar uma classe no botão ou setar um atributo
    botaoApagar.setAttribute('class', 'apagar') //Dessa forma estamos colocando o atributo class com o valor apagar
    li.appendChild(botaoApagar)
}

document.addEventListener('click', function(e){
    const el = e.target

    if(el.classList.contains('apagar')){ //serve para identeificar se o botão com a classe que escolhemos foi clicado
        //console.log('apagar clicado')
        //console.log(el.parentElement) //Por causa da situação, o button fica dentro do li que desejamos apagar, então vamos apagar o pai do buttpn, usamos isso para identificar o elemento pai
        el.parentElement.remove() //Depois de identificar, basta remover
        salvarTarefas()

    }
})

function salvarTarefas(){
    const liTarefas = tarefas.querySelectorAll('li') //Estamos pegando todos os elementos li dentro de tarefas
    const listaDeTareafas = []

    for (let tarefas of liTarefas){ //Estamos pegando o conteudo de liTarefas e colocando em tarefas
        let tarefaTexto = tarefas.innerText //Estamos pegando o apenas o texto
        tarefaTexto = tarefaTexto.replace('Apagar', '').trim() //estamos substituindo a palavra apagar que veio junto por '' espaço vazio. E com o .trim removemos o espaço vazio
        listaDeTareafas.push(tarefaTexto)
    }
    //Vamos usar o JSON para converter nosso array em string que poderemos refazer essa conversão
    const tarefasJSON = JSON.stringify(listaDeTareafas)
    localStorage.setItem('tarefas', tarefasJSON) //estamos salvando no navegador o tarefasJSON, e vamos utilizar o nome tarefas para recuperar, só podemos salvar strings, por isso tivemos que converter
}

//ler as tarefas salvar no navegador e colocar de volta do li depois de recarregar o site
function adicionaTarefasSalvas(){
    const tarefas = localStorage.getItem('tarefas') //Estamos recuperando os dados do navagador novamente 
    const listaDeTarefas = JSON.parse(tarefas) //Convertemos a string novamente em array
    console.log(listaDeTarefas)
    for(let tarefa of listaDeTarefas){
        criaTarefa(tarefa)
    }
}

adicionaTarefasSalvas()
