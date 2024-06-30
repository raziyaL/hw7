import React, {useEffect, useState} from 'react';
import Todo from "../components/Todo";

function TodosPages(props) {

    const [value, setValue] = useState("");
    const [todos, setTodos] = useState([]);



    async function funcTodos() {

        if(value.trim() === ""){
            alert("Please enter a valid todo");
            return
        }


        const data={
            title: value,
            status: false
        }

        const response = await fetch('http://localhost:8000/todos', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(data)
        });
        getTodos()
        setValue('')
    }

    async function getTodos() {
        const response = await fetch('http://localhost:8000/todos')
        const data = await response.json();
        setTodos(data)
    }

    useEffect(() => {
        getTodos()
    }, []);

    async function onDelete(id) {
        const response = await fetch(`http://localhost:8000/todos/${id}`, {
            method: 'DELETE'
        })
        getTodos()
    }

    async function onUpdate(id, newData) {
        const response = await fetch(`http://localhost:8000/todos/${id}`, {
            method: "PATCH",
            headers:{
                'Content-Type': 'application/json'},
            body: JSON.stringify({title: newData})
        })
        getTodos()
    }
    async function onStatus(id, newStatus) {
            const response = await fetch(`http://localhost:8000/todos/${id}`, {
                method: "PATCH",
                headers:{
                    'Content-Type': 'application/json'},
                body: JSON.stringify({status: newStatus})
            })

        getTodos()
    }


    return (
        <div>
            <h1>Todos list</h1>
            <input type="text"
                   value={value}
                   onChange={(e)=>setValue(e.target.value)}/>
            <button onClick={funcTodos}>add</button>
            <ul>
                {
                    todos.length > 0 ?
                        todos.map(todo =>
                            <Todo
                                key = {todo.id}
                                todo={todo}
                                deleteTodo={onDelete}
                                onUpd={onUpdate}
                                onStatus={onStatus}/> )
                        : <p>list empty</p>
                }
            </ul>
        </div>
    );
}

export default TodosPages;