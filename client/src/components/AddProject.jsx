import { useState } from "react";
import { FaList } from "react-icons/fa";
import { useMutation, useQuery } from "@apollo/client";
import { GET_PROJECTS } from "../queries/projectQueries";
import { GET_CLIENTS } from "../queries/clientQueries";
import { ADD_PROJECT } from "../mutations/ProjectMutations";

const AddProject = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [clientId, setClientId] = useState('');
  const [status, setStatus] = useState('new');

  const [addProject] = useMutation(ADD_PROJECT, {
    variables: {name, description, clientId, status},
    refetchQueries: [{query: GET_PROJECTS}],  // refetch data to show deleted action 
  })

  // GET Clients for select
  const {loading, error, data } = useQuery(GET_CLIENTS);

  const onSubmit = (e) =>{
    e.preventDefault();
    if (name === '' || description === '' || status === '') {
      return alert('Please fill in all fields');
    }

    addProject(name, description, status, clientId);

    setName('');
    setDescription('');
    setStatus('new');
    setClientId('');
  };

  if (loading) return null;
  if (error) return 'Something went wrong..'

  return ( 
    <div>
      {!loading && !error && (
        <>
          <button type="button" className="btn btn-success" data-bs-toggle="modal" data-bs-target="#projectModal">
            <div className='d-flex align-items-center'>
              <FaList className='icon' />
              <div>New Project</div>
            </div>
          </button> 
          <div className="modal fade" id="projectModal"  aria-labelledby="projectModalLabel" aria-hidden="true">
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="projectModalLabel">New Project</h5>
                  <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body">
                  <form onSubmit={onSubmit} >
                    <div className="mb-3">
                      <label className="form-label">Name</label>
                      <input type="text" className="form-control" id="name" 
                        value={name} onChange={(e)=> setName(e.target.value)}
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Description</label>
                      <textarea type="text" className="form-control" id="description" 
                        value={description} onChange={(e)=> setDescription(e.target.value)}
                      ></textarea>
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Status</label>
                      <select id="status" className="form-select" value={status}
                        onChange={(e)=> setStatus(e.target.value)}
                      >
                        <option value="new">Not Started</option>
                        <option value="progress">In Progress</option>
                        <option value="completed">Completed</option>
                      </select>
                    </div>
                    {/* select client */}
                    <div className="mb-3">
                      <label className="form-label">Client</label>
                      <select className="form-select" id="clientId" value={clientId}
                        onChange={(e) => setClientId(e.target.value)}
                      >
                        <option >Select Client</option>
                        {data.clients.map((client) =>(
                          <option key={client.id} value={client.id} >{client.name}</option>
                        ))}
                      </select>

                    </div>
                    <div class="modal-footer mt-5">
                      <button type="submit"  className="btn btn-success " data-bs-dismiss="modal">Submit</button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default AddProject;