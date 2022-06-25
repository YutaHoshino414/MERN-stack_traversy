import logo from './assets/GraphQL_Logo.svg.png'

const Header = () => {
    return ( 
        <nav className='navbar bg-light mb-4 p-2'>
            <div className="container">
                <a href="/" className="navbar-brand">
                    <div className="d-flex">
                        <button>
                        <img src={logo} alt="" className="mr-2" />
                        </button>
                        <div>Project MGMT</div>
                    </div>
                </a>
            </div>
        </nav>
     );
}
 
export default Header;