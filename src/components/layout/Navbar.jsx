import { Link } from 'react-router-dom';
import { useContext } from 'react';

import Logo from '../../../img/logo.png'
import '../../styles/components/layout/navbar.sass'


import { Context } from '../../context/UserContext';

function Navbar() {
    const { authenticated, logout } = useContext(Context);

    return (
        <nav className='navbar'>
            <div className='navbar_logo'>
                <img src={Logo} alt='Dasa' />
            </div>
            <ul>{authenticated ? (
                <>
                    <Link to={`edit`}>Meu Perfil</Link>
                    <li onClick={logout}>Sair</li>
                </>
            ) : (
                <>
                    <li>
                        <Link to='/login'>Entrar</Link>
                    </li>
                    <li>
                        <Link to='/register'>Cadastrar</Link>
                    </li></>)}
            </ul>
        </nav >
    )
}

export default Navbar;