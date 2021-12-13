import React, { Fragment, useEffect, useState } from "react";
import EditTodo from "./EditTodo";

const ListTodos = () => {

    const [todos, setTodos] = useState([]);

    const deleteTodo = async (id) => {
        try {
            const deleteTodo = await fetch(`http://localhost:5000/todos/${id}`, {
                method: "DELETE"
            });

            setTodos(todos.filter(todo => todo.todo_id !== id))
        } catch (error) {
            console.error(error.message);
        }
    }

    const getTodos = async () => {

        try {
            const response = await fetch("http://localhost:5000/todos");
            const jsonData = await response.json();

            setTodos(jsonData);
            // console.log(jsonData);
        } catch (error) {
            console.error(error.message);
        }
    }

    useEffect(() => {
        getTodos();
    }, []);

    return (
        <Fragment>
            <div className="container text-center mt-5">
                <h1>List Todos</h1>
                <table class="table table-striped mt-5 text-center">
                    <thead>
                        <tr>
                            <th>Description</th>
                            <th></th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* <tr>
                            <td>John</td>
                            <td>Doe</td>
                            <td>john@example.com</td>
                        </tr> */}
                        {todos.map(todo => (
                            <tr>
                                <td>{todo.description}</td>
                                <td>
                                    <EditTodo todo={todo} />
                                </td>
                                <td>
                                    <button className="btn btn-danger" onClick={() => {
                                        deleteTodo(todo.todo_id)
                                    }}>Delete</button>
                                </td>
                            </tr>
                        )
                        )}
                    </tbody>
                </table>
            </div>
        </Fragment>
    )
}


export default ListTodos;