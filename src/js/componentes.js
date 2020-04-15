import { TodoList, Todo } from "../classes";
import { todoList } from '../index'; // importando la funcion todoList del index.js

//Referncias HTML
const divTodoList = document.querySelector('.todo-list');
const txtInput = document.querySelector('.new-todo');
const btnBorrar = document.querySelector('.clear-completed');
const ulFilter = document.querySelector('.filters');
const anchorFiltros = document.querySelectorAll('.filtro');


export const crearTodoHtml = (todo) => {

    const htmlTodo =
        ` <li class="${(todo.completado) ? 'completed' : ''}" data-id="${todo.id}">
            <div class="view">
                <input class="toggle" type="checkbox" ${(todo.completado) ? 'checked' : ''}>
                <label>${todo.tarea}</label>
                <button class="destroy"></button>
            </div>
            <input class="edit" value="Create a TodoMVC template">
        </li>`;

    const div = document.createElement('div');
    div.innerHTML = htmlTodo;

    divTodoList.append(div.firstElementChild);

    return div.firstElementChild;
}

//Eventos

txtInput.addEventListener('keyup', e => {

    if (e.keyCode === 13 && txtInput.value.length > 0) {

        const nuevoTodo = new Todo(txtInput.value); //creando nueva tarea
        todoList.nuevoTodo(nuevoTodo); //Agregando a la lista
        crearTodoHtml(nuevoTodo); // Creando el elemnto html de lista
        txtInput.value = ''; //limpiar el input

    }

});

divTodoList.addEventListener('click', e => {

    const nombreElemento = (e.target.localName); // input, label, button
    const todoElemento = e.target.parentElement.parentElement;
    const toId = todoElemento.getAttribute('data-id');

    if (nombreElemento.includes('input')) { // Click en el input
        todoList.marcarCompletado(toId);
        todoElemento.classList.toggle('completed');// toggle si existe lo quita sino lo pone.
    } else if (nombreElemento.includes('button')) { // click en el boton X.
        todoList.eliminarTodo(toId);
        divTodoList.removeChild(todoElemento);

    }
    console.log(todoList);

});

btnBorrar.addEventListener('click', () => {

    todoList.eliminarCompletados();

    for (let i = divTodoList.children.length - 1; i >= 0; i--) {

        const elemento = divTodoList.children[i];

        if (elemento.classList.contains('completed')) {
            divTodoList.removeChild(elemento);
        }
    }
});

ulFilter.addEventListener('click', e => {
    const filtro = e.target.text;
    if (!filtro) return; // === if(!filtro){return}

    anchorFiltros.forEach(elem => elem.classList.remove('selected'));
    e.target.classList.add('selected');


    for (const elemento of divTodoList.children) {
        elemento.classList.remove('hidden');
        const completado = elemento.classList.contains('completed');

        switch (filtro) {

            case 'Pendientes':
                if (completado) {
                    elemento.classList.add('hidden');
                }
                break;
            case 'Completados':
                if (!completado) {
                    elemento.classList.add('hidden');
                }
                break;

        }

    }
})