import React from 'react'
import './style.css'
import uuid from 'react-uuid';

const InputComp = ({text,setText,tasks,setTasks,editKey,setEditKey}) => {
    
    function handleChangeType(e) {
        setText(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();

        if(text==="") {
            window.alert("Cant Keep task empty...");
            setEditKey('');
            setText('');
            return;
        }

        if(editKey!=='') {
            setTasks(tasks.map((task) => {
                if(task.key===editKey) {
                    return ({...task, text:text});
                }
                return task;
            }));

            setEditKey('');
            setText('');
            return;
        }

        setTasks([...tasks, {
            key : uuid(),
            done:false,
            text:text,
         }]);
         
        setText('');
    }

   
    return (
        <div className='input-text'>
            <form onSubmit={handleSubmit}>
                <label>Type Your Task:
                    <input
                        type="text"
                        value={text}
                        onChange={handleChangeType}
                        style={{width:"550px", fontSize:"17px"}}
                    />
                </label>
                <input className='submit-button' type="submit" />
            </form>
        </div>
    )
}

export default InputComp