import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import {
    Menu,
    ArrowLeft,
    LayoutGrid,
    ClipboardPen,
    ChartNoAxesCombined,
    LogOut,
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const rpeIcon = 'src/assets/rpe-logo.png';

export default function AsideMenu() {
    const navigate = useNavigate();
    const { logout } = useAuth();

    const [isNavHovered, setIsNavHovered] = useState(false);
    const [isMenuOpened, setIsMenuOpened] = useState(false);

    const openMenu = () => {
        setIsMenuOpened(true);
    };

    const closeMenu = () => {
        setIsMenuOpened(false);
    };

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <>
            {!isMenuOpened && (
                <Menu
                    onClick={openMenu}
                    className="hidden max-lg:block fixed top-4 left-4 text-secondary-400 cursor-pointer z-[1000]"
                    size={50}
                    strokeWidth={2.5}
                />
            )}

            {isMenuOpened && (
                <ArrowLeft
                    onClick={closeMenu}
                    className="hidden max-lg:block fixed top-4 left-4 text-secondary-400 cursor-pointer z-[1001]"
                    size={50}
                    strokeWidth={2.5}
                />
            )}

            <aside
                className={`
                    absolute bg-white flex flex-col p-4 w-24 h-screen border-r-4 border-neutral-300
                    transition-all duration-300 ease-in-out overflow-hidden z-[999] overflow-y-auto
                    ${isNavHovered ? 'w-60' : ''}
                    max-lg:fixed max-lg:top-0 max-lg:left-0 max-lg:w-full max-lg:h-screen max-lg:bg-white max-lg:border-r-0
                    ${isMenuOpened ? 'max-lg:flex max-lg:flex-col' : 'max-lg:hidden'}
                `}
                style={{
                    boxShadow: isNavHovered
                        ? '0 1px 3px 0 rgba(0, 0, 0, 0.05)'
                        : 'none',
                }}
            >
                <div className="flex justify-center items-center w-full mb-4">
                    <Link to="/">
                        <img
                            className="w-14 h-14 transition-transform duration-300 mx-auto max-lg:w-32 max-lg:h-32 max-lg:mt-8"
                            src={rpeIcon}
                            alt="Logo"
                        />
                    </Link>
                </div>

                <nav
                    className="mt-4 w-full h-full mb-5 flex flex-col justify-start"
                    onMouseEnter={() => setIsNavHovered(true)}
                    onMouseLeave={() => setIsNavHovered(false)}
                >
                    <ul className="flex flex-col gap-4 pl-0 w-full max-lg:justify-start max-lg:gap-8 max-lg:mt-8 max-lg:pl-20 max-lg:w-auto">
                        <li className="list-none w-full max-lg:flex max-lg:justify-start max-lg:w-auto">
                            <NavLink
                                to="/dashboard"
                                onClick={closeMenu}
                                className={({ isActive }) => `
                                    flex items-center gap-4 no-underline relative 
                                    transition-all duration-200 ease-in-out hover:text-secondary-600
                                    max-lg:text-2xl max-lg:gap-4
                                    ${isActive ? 'text-primary-500' : 'text-secondary-400'}
                                `}
                            >
                                <LayoutGrid
                                    size={32}
                                    className="flex-shrink-0 ml-4 max-lg:w-12 max-lg:h-12 max-lg:ml-0 self-center"
                                />
                                <span
                                    className={`
                                    opacity-0 invisible whitespace-nowrap transition-all duration-200 ease-in-out 
                                    ${isNavHovered ? 'opacity-100 visible' : ''}
                                    max-lg:opacity-100 max-lg:visible
                                `}
                                >
                                    Dashboard
                                </span>
                            </NavLink>
                        </li>

                        <li className="list-none w-full max-lg:flex max-lg:justify-start max-lg:w-auto">
                            <NavLink
                                to="/avaliacao"
                                onClick={closeMenu}
                                className={({ isActive }) => `
                                    flex items-center gap-4 no-underline relative 
                                    transition-all duration-200 ease-in-out hover:text-secondary-600
                                    max-lg:text-2xl max-lg:gap-4
                                    ${isActive ? 'text-primary-500' : 'text-secondary-400'}
                                `}
                            >
                                <ClipboardPen
                                    size={32}
                                    className="flex-shrink-0 ml-4 max-lg:w-12 max-lg:h-12 max-lg:ml-0 self-center"
                                />
                                <span
                                    className={`
                                    opacity-0 invisible whitespace-nowrap transition-all duration-200 ease-in-out
                                    ${isNavHovered ? 'opacity-100 visible' : ''}
                                    max-lg:opacity-100 max-lg:visible
                                `}
                                >
                                    Avaliação de ciclo
                                </span>
                            </NavLink>
                        </li>

                        <li className="list-none w-full max-lg:flex max-lg:justify-start max-lg:w-auto">
                            <NavLink
                                to="/evolucao"
                                onClick={closeMenu}
                                className={({ isActive }) => `
                                    flex items-center gap-4 no-underline relative 
                                    transition-all duration-200 ease-in-out hover:text-secondary-600
                                    max-lg:text-2xl max-lg:gap-4
                                    ${isActive ? 'text-primary-500' : 'text-secondary-400'}
                                `}
                            >
                                <ChartNoAxesCombined
                                    size={32}
                                    className="flex-shrink-0 ml-4 max-lg:w-12 max-lg:h-12 max-lg:ml-0 self-center"
                                />
                                <span
                                    className={`
                                    opacity-0 invisible whitespace-nowrap transition-all duration-200 ease-in-out
                                    ${isNavHovered ? 'opacity-100 visible' : ''}
                                    max-lg:opacity-100 max-lg:visible
                                `}
                                >
                                    Evolução
                                </span>
                            </NavLink>
                        </li>
                    </ul>

                    <div className="flex w-full mt-auto max-lg:mb-4 max-lg:justify-center">
                        <div
                            onClick={handleLogout}
                            className="flex items-center gap-4 cursor-pointer ml-4 text-secondary-400 hover:text-secondary-600 transition-colors duration-200 max-lg:text-2xl max-lg:gap-4 max-lg:ml-0"
                        >
                            <LogOut
                                size={32}
                                strokeWidth={2.5}
                                className="flex-shrink-0 max-lg:w-12 max-lg:h-12"
                            />
                            <span
                                className={`
                                opacity-0 invisible whitespace-nowrap transition-all duration-200 ease-in-out 
                                ${isNavHovered ? 'opacity-100 visible' : ''}
                                max-lg:opacity-100 max-lg:visible
                            `}
                            >
                                Sair
                            </span>
                        </div>
                    </div>
                </nav>
            </aside>
        </>
    );
}
