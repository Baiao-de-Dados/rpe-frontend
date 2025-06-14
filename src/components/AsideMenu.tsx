import { Link, NavLink } from 'react-router-dom';
import { useState } from 'react';
import {
    Menu,
    ArrowLeft,
    LayoutGrid,
    ClipboardPen,
    BarChart,
    LogOut,
} from 'lucide-react';

const rpeIcon = 'src/assets/rpe-logo.png';

export default function AsideMenu() {
    const [isNavHovered, setIsNavHovered] = useState(false);
    const [isMenuOpened, setIsMenuOpened] = useState(false);

    const openMenu = () => {
        setIsMenuOpened(true);
    };

    const closeMenu = () => {
        setIsMenuOpened(false);
    };

    return (
        <>
            <Menu
                onClick={openMenu}
                className={`hidden max-lg:block mt-4 ml-4 text-purple-900 cursor-pointer ${
                    isMenuOpened ? 'hidden' : ''
                }`}
                size={50}
                strokeWidth={2.5}
            />

            <ArrowLeft
                onClick={closeMenu}
                className={`hidden max-lg:block mt-4 ml-4 text-white cursor-pointer z-[999] ${
                    !isMenuOpened ? 'hidden' : ''
                }`}
                size={50}
                strokeWidth={2.5}
            />

            <aside
                className={`
                    bg-[#f1f1f1] flex flex-col p-4 w-24 h-screen 
                    transition-all duration-300 ease-in-out overflow-hidden z-[999] overflow-y-auto
                    ${isNavHovered ? 'w-60' : ''}
                    max-lg:hidden max-lg:absolute max-lg:min-w-full max-lg:h-screen
                    ${isMenuOpened ? 'max-lg:flex' : 'max-lg:hidden'}
                `}
            >
                <div className="flex justify-center items-center w-full mb-4">
                    <Link to="/">
                        <img
                            className="w-14 h-14 transition-transform duration-300 mx-auto max-lg:w-20 max-lg:h-20"
                            src={rpeIcon}
                            alt="Logo"
                        />
                    </Link>
                </div>

                <nav
                    className="mt-4 w-full h-full mb-5 flex flex-col justify-start bg-red-500"
                    onMouseEnter={() => setIsNavHovered(true)}
                    onMouseLeave={() => setIsNavHovered(false)}
                >
                    <ul className="flex flex-col gap-4 pl-0 w-full max-lg:justify-center bg-blue-500">
                        <li className="list-none w-full max-lg:flex max-lg:justify-center">
                            <NavLink
                                to="/dashboard"
                                onClick={closeMenu}
                                className={({ isActive }) => `
                                    flex items-center gap-4 no-underline relative 
                                    transition-all duration-200 ease-in-out hover:text-[#3a7b7d]
                                    max-lg:text-2xl max-lg:gap-2 bg-green-500
                                    ${isActive ? 'text-[#2b5f60]' : 'text-[#6b9999]'}
                                `}
                            >
                                <LayoutGrid
                                    size={32}
                                    className="flex-shrink-0 ml-2 max-lg:w-16 max-lg:h-12 self-center"
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

                        <li className="list-none w-full max-lg:flex max-lg:justify-center">
                            <NavLink
                                to="/avaliacao"
                                onClick={closeMenu}
                                className={({ isActive }) => `
                                    flex items-center gap-4 no-underline relative 
                                    transition-all duration-200 ease-in-out hover:text-[#3a7b7d]
                                    max-lg:text-2xl max-lg:gap-2
                                    ${isActive ? 'text-[#2b5f60]' : 'text-[#6b9999]'}
                                `}
                            >
                                <ClipboardPen
                                    size={32}
                                    className="flex-shrink-0 ml-2 max-lg:w-16 max-lg:h-12 self-center"
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

                        <li className="list-none w-full max-lg:flex max-lg:justify-center">
                            <NavLink
                                to="/evolucao"
                                onClick={closeMenu}
                                className={({ isActive }) => `
                                    flex items-center gap-4 no-underline relative 
                                    transition-all duration-200 ease-in-out hover:text-[#3a7b7d]
                                    max-lg:text-2xl max-lg:gap-2
                                    ${isActive ? 'text-[#2b5f60]' : 'text-[#6b9999]'}
                                `}
                            >
                                <BarChart
                                    size={32}
                                    className="flex-shrink-0 ml-2 max-lg:w-16 max-lg:h-12 self-center"
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
                </nav>

                {/* Logout */}
                <div className="flex justify-center w-full mt-auto">
                    <LogOut
                        className="cursor-pointer mt-auto ml-2 text-[#6b9999] hover:text-[#3a7b7d] transition-colors duration-200"
                        size={32}
                        strokeWidth={2.5}
                    />
                </div>
            </aside>
        </>
    );
}
