import React, { Fragment , useState} from "react";

const EditTodo = ({todo}) => {
    
    const [description, setDescription] = useState(todo.description);

    const updateDescription = async (e) => {
        e.preventDefault();
        try {
            const body = {description};
            const response = await fetch(`http://localhost:5000/todos/${todo.todo_id}`,{
                method : "PUT",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(body)
            });
            // reloads the page
            window.location = "/";
        } catch (error) {
           console.error(error.message); 
        }
    }

    return (
        <Fragment>
            {/* Button to Open the Modal */}
            <button type="button"
             class="btn btn-warning" 
             data-toggle="modal" 
             data-target={`#id${todo.todo_id}`}>
                Edit
            </button>

            {/* The Modal */}
            <div class="modal fade" id={`id${todo.todo_id}`}>
                <div class="modal-dialog">
                    <div class="modal-content">

                        {/* Modal Header */}
                        <div class="modal-header">
                            <h4 class="modal-title">Edit Todo</h4>

                            {/* Modal close button (X) */}
                            <button type="button"
                             class="close text-danger" 
                             data-dismiss="modal"
                             onClick={()=> setDescription(todo.description)}>
                                &times;
                             </button>
                        </div>

                        {/* Modal body */}
                        <div class="modal-body">
                            <input type="text" className="form-control" value={description} onChange={e => {
                               setDescription(e.target.value)
                            }}/>
                        </div>

                        {/* Modal footer */}
                        <div class="modal-footer">
                            <button type="button"
                                class="btn btn-warning"
                                data-dismiss="modal"
                                onClick= {e => updateDescription(e)}>
                                    Edit
                                </button>
                        </div>


                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default EditTodo;