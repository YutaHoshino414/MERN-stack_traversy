import { useNavigate } from 'react-router-dom';
import { DELETE_PROJECT } from '../mutations/ProjectMutations';
import { FaTrash } from 'react-icons/fa';
import { useMutation } from '@apollo/client';
import { GET_PROJECTS } from '../queries/projectQueries';

function DeleteButton({ projectId }) {
  const navigate = useNavigate();

  const [deleteProject] = useMutation(DELETE_PROJECT, {
    variables: { id: projectId },
    onCompleted: () => navigate('/'),
    refetchQueries: [{query: GET_PROJECTS}]  // refetch data to show deleted action 
  })

  return (
    <div className="d-flex mt-5 ms-auto">
        <button className='btn btn-danger m-2' onClick={deleteProject} >
            <FaTrash className='icon' />
            Delete Project
        </button>
    </div>
  )
}

export default DeleteButton