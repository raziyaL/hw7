import React, {useState} from 'react';

function Todo({todo, deleteTodo, onUpd, onStatus}) {
    const [statusState, setStatus] = useState(todo.status);
    const [title, setTitle] = useState(todo.title);
    const [isEditing, setIsEditing] = useState(false);



    function handleTitle(event){
        setTitle(event.target.value)

    }
    function updateTitle() {
        onUpd(todo.id, {title });
        setIsEditing(false)
    }

    function updStatus (){
        const newStatus= !statusState;
        setStatus(newStatus)
        onStatus(todo.id, newStatus)
    }



    return (
       <li>
           <input
               type="checkbox"
               checked={statusState}
               onChange={updStatus}/>
           {isEditing ? (
                   <input
                       value={title}
                       onChange={handleTitle}
                       type="text"
                   onBlur={updateTitle}/>
               ) :
               <span
                   className={todo.status ? "active" : ""}>
               {todo.title}
           </span>
           }

           <button onClick={() => deleteTodo(todo.id)}>delete</button>
           {isEditing ? (
               <button onClick={updateTitle}>save</button>
               ): (
               <button onClick={() => setIsEditing(true)}>update</button>

           )}
       </li>
    );
}

export default Todo;