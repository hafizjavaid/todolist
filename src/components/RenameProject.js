import React, {useState, useContext} from 'react'
import ProjectForm from './ProjectForm'

import {TodoContext} from '../context/index'

// import firebase
import firebase from '../firebase/index';

function RenameProject({project, setShowModal}){
    const [newProjectName, setNewProjectName] = useState(project.name)

    const { selectedProject, setSelectedProject } = useContext(TodoContext)
    const renameProject = (project, newProjectName) => {

        const projectRef = firebase.firestore().collection('projects');
        const todoRef = firebase.firestore().collection('todos');

        // I get the name from project and set 
        // the name to "oldProjectName" by Destructuring
        const { name: oldProjectName } = project;

        projectRef
              .where('name', '==', newProjectName)
              .get()
              .then(querySnapshot => {
                  if(!querySnapshot.empty){
                      alert('Project with the same name already exist')
                  }
                  else{

                    projectRef
                    .doc(project.id)
                    .update({
                        name: newProjectName
                    })
                    .then(()=>{
                        todoRef
                        .where('projectName', '==', oldProjectName)
                        .get()
                        .then(querySnapshot => {
                            querySnapshot.forEach(doc=>{
                                doc.ref.update({
                                    projectName: newProjectName
                                })
                            })
                        })
                        .then(()=>{

                            if(selectedProject === oldProjectName)
                            {
                                setSelectedProject(newProjectName)
                            }

                        })
                    })
                  }
              })



    }
    function handleSubmit(e){

        e.preventDefault();
        
        renameProject(project, newProjectName);
        setShowModal(false)
    }

    return (
        <div className='RenameProject'>
            <ProjectForm
                handleSubmit={handleSubmit}
                heading='Edit project name!'
                value={newProjectName}
                setValue={setNewProjectName}
                setShowModal={setShowModal}
                confirmButtonText='Confirm'
            />
        </div>
    )
}

export default RenameProject