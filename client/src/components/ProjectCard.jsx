const ProjectCard = ({project}) => {
    console.log(project)
    return ( 
        <div className="col-md-4 mt-5">
            <div className="card">
                <div className="card-body">
                    <div className="d-flex justify-content-between align-items-center">
                        <h5 className="card-title">{project.name}</h5>
                        <a href={`/projects/${project.id}`} className="btn btn-secondary">view</a>
                    </div>
                    <p className="small">Status: <b>{project.status}</b></p>
                </div>
            </div>

        </div>
     );
}
 
export default ProjectCard;