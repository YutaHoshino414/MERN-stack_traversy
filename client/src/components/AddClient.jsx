import { useState } from "react";
import { FaUser } from "react-icons/fa";
import { useMutation } from "@apollo/client";
import { ADD_CLIENT } from "../mutations/ClientMutations";
import { GET_CLIENTS } from "../queries/clientQueries";

const AddClient = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  const [addClient] = useMutation(ADD_CLIENT, {
    variables: {name, email, phone},
    refetchQueries: [{query: GET_CLIENTS}],  // refetch data to show deleted action 
    //update(cache, { data: {addClient}}){
    //  const { clients } = cache.readQuery({ query: GET_CLIENTS });
//
    //  cache.writeQuery({
    //    query: GET_CLIENTS,
    //    data: { clients: [...clients, addClient] },
    //  });
    //}
  })

  const onSubmit = (e) =>{
    e.preventDefault();
    if (name === '' || email === '' || phone === '') {
      return alert('Please fill in all fields');
    }

    addClient(name, email, phone);

    setName('');
    setEmail('');
    setPhone('');
  }

  return ( 
    <div>
        <button type="button" className="btn btn-info" data-bs-toggle="modal" data-bs-target="#exampleModal">
        <div className='d-flex align-items-center'>
          <FaUser className='icon' />
          <div>Add Client</div>
        </div>
        </button>  
      <div className="modal fade" id="exampleModal"  aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Add Client</h5>
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
                  <label className="form-label">Email</label>
                  <input type="text" className="form-control" id="email" 
                    value={email} onChange={(e)=> setEmail(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Phone</label>
                  <input type="text" className="form-control" id="phone" 
                    value={phone} onChange={(e)=> setPhone(e.target.value)}
                  />
                </div>
                <div class="modal-footer mt-5">
                  <button type="submit"  className="btn btn-secondary " data-bs-dismiss="modal">Submit</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddClient;