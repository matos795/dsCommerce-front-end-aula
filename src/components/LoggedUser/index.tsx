import { Link, useNavigate } from 'react-router-dom';
import * as authService from '../../services/auth-service';
import { useContext } from 'react';
import { ContextToken } from '../../utils/context-token';

export default function LoggedUser() {

    const { contextTokenPayload, setContextTokenPayload } = useContext(ContextToken);
    const navigate = useNavigate();

    function handleLogoutClick() {
        authService.logout();
        setContextTokenPayload(undefined);
        navigate("/");
    }

    return (
        authService.isAuthenticated() && contextTokenPayload
            ? (
                <div className="dsc-logged-user">
                    <p>{contextTokenPayload.username}</p>
                    <span onClick={handleLogoutClick}>
                        Sair
                    </span>
                </div>
            )
            : (
                <Link to="/login">Entrar</Link>
            )
    );
}