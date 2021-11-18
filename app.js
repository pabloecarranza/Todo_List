const AddButtonTask = document.querySelector("#AddBtn");
const cancelar = document.querySelector('#cancelar');
const addbtn = document.querySelector('#addbtn');
const taksHtml = document.querySelector('#crearAqui');
const inputTask = document.querySelector('#inputTask');
const delbtn = document.querySelector('#DelBtn');

// creando constructor de tareas

class Todo{
    constructor( tarea ){
        this.tarea = tarea;
        this.id = new Date().getTime();
        this.completado = false;
        this.creado = new Date();
    }
}




class TodoList{
    constructor( ){
        this.todos = [];
        this.cargarLocalStorage();
    }
    
    nuevoTodo( tarea ){
        this.todos.push( tarea );
        this.guardarLocalStorage();
    }
    
    guardarLocalStorage(){
        localStorage.setItem('tareas', JSON.stringify(this.todos) );
    }
    cargarLocalStorage( ){
        
        if(localStorage.getItem('tareas') ){
            this.todos =  JSON.parse(localStorage.getItem('tareas'));
            
            
        }else{
            this.todos = [];
        }
        
    }
    
}

const todoList = new TodoList();
todoList.todos.forEach(crearTodoHtml);






function crearTodoHtml( tarea ){
    const htmlTodo = `
    
     <div data-id="${tarea.id}"><i class="far fa-check-circle"></i></div> 
    <div class="${(tarea.completado) ? 'completado' : 'NOcompletado'}">${tarea.tarea}</div>
    <!-- <button id="BtnDel" class="btnDel btn btn-outline-danger btn-sm" data-bs-toggle="button" ><i class="fas fa-times"></i></button> -->
    
    `
    const div = document.createElement('div');
    div.innerHTML = htmlTodo;
    taksHtml.append( div);
    
}


AddButtonTask.addEventListener('click', ()=>{
    mostrarVentanta();
    
})

function mostrarVentanta(){
    document.querySelector('.addTask').style.display = 'flex';
    
}

cancelar.addEventListener('click', (event)=>{
    document.querySelector('.addTask').style.display = 'none';
    
})

addbtn.addEventListener('click', ()=>{
    
    
    
    const nuevotarea = new Todo(inputTask.value);
    
    todoList.nuevoTodo( nuevotarea );
    
    
    crearTodoHtml(nuevotarea);
    
    document.querySelector('.addTask').style.display = 'none';
    
})

inputTask.addEventListener('keyup', (event)=>{
    if(event.keyCode === 13 ){
        let task = inputTask.value
        const nuevotarea = new Todo(task);
        
        document.querySelector('.addTask').style.display = 'none';
        todoList.nuevoTodo( nuevotarea );
    
    
    crearTodoHtml(nuevotarea);
        
    }
    
})

delbtn.addEventListener('click', ()=>{
    let a = document.querySelector('#crearAqui');
    a.lastChild.remove();
    todoList.todos.pop();
    todoList.guardarLocalStorage();
})