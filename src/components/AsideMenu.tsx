import { useQueryState } from 'nuqs';
import * as Icons from 'lucide-react';
import { useState, useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';

import { useAuth } from '../hooks/useAuth';

import { UserRoleEnum } from '../types/auth';

import { RoleGuard } from './common/RoleGuard';

export default function AsideMenu() {

    const { logout } = useAuth();

    const navigate = useNavigate();

    const [navState, setNavState] = useQueryState('nav', {
        defaultValue: 'expanded',
        history: 'replace',
    });

    const [isMenuOpened, setIsMenuOpened] = useState(false);
    const [isNavExpanded, setIsNavExpanded] = useState(navState === 'expanded');

    const toggleNav = () => {
        setIsNavExpanded(prev => {
            const newState = !prev;
            setNavState(newState ? 'expanded' : 'collapsed');
            return newState;
        });
    };

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

    useEffect(() => {
        if (isMenuOpened) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }

        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isMenuOpened]);

    return (
        <>
            {isMenuOpened && (
                <div className="hidden max-lg:block fixed inset-0 bg-black bg-opacity-50 z-[998]" onClick={closeMenu} />
            )}

            {!isMenuOpened && (
                <Icons.Menu className="hidden max-lg:block fixed top-4 left-4 text-secondary-400 cursor-pointer z-[1000]" onClick={openMenu} size={50} strokeWidth={2.5} />
            )}

            <aside className={`bg-white flex flex-col p-4 h-screen border-r-4 border-neutral-300 relative transition-all duration-300 ease-in-out overflow-hidden overflow-y-auto ${isNavExpanded ? 'w-72' : 'w-24'} max-lg:fixed max-lg:top-0 max-lg:left-0 max-lg:h-screen max-lg:bg-white max-lg:border-r-0 max-lg:z-[999] ${isMenuOpened ? 'max-lg:w-full max-lg:flex max-lg:flex-col' : 'max-lg:w-0 max-lg:hidden'}`} style={{ boxShadow: isNavExpanded ? '0 1px 3px 0 rgba(0, 0, 0, 0.05)' : 'none' }}>

                <button onClick={toggleNav} className="hidden lg:flex absolute -right-3 top-1/2 transform -translate-y-1/2 bg-white border-2 border-neutral-300 rounded-full p-1 hover:bg-neutral-100 cursor-pointer transition-colors duration-200 z-10">
                    {isNavExpanded ? (
                        <Icons.ChevronLeft size={24} className="text-secondary-400" />
                    ) : (
                        <Icons.ChevronRight size={24} className="text-secondary-400" />
                    )}
                </button>
                <div className="hidden max-lg:block max-lg:absolute max-lg:top-4 max-lg:left-4 max-lg:z-[1001]">
                    <Icons.X onClick={closeMenu} className="text-secondary-400 cursor-pointer transition-colors duration-200" size={50} strokeWidth={2.5} />
                </div>

                <div className="flex justify-center items-center w-full mb-4">
                    <Link to="/">
                        <img className="w-14 h-14 transition-transform duration-300 mx-auto max-lg:w-32 max-lg:h-32 max-lg:mt-8" src="/rpe-logo.png" alt="Logo" />
                    </Link>
                </div>

                <nav className="mt-4 w-full h-full mb-5 flex flex-col justify-start">

                    <ul className="flex flex-col gap-4 pl-0 w-full max-lg:justify-start max-lg:gap-8 max-lg:mt-8 max-lg:pl-20 max-lg:w-auto">
                        <li className="list-none w-full max-lg:flex max-lg:justify-start max-lg:w-auto">
                            <NavLink to="/dashboard" onClick={closeMenu} title="Dashboard" className={({ isActive }) => `flex items-center gap-4 no-underline relative  transition-all duration-200 ease-in-out hover:text-secondary-600 max-lg:text-2xl max-lg:gap-4 ${isActive ? 'text-primary-500' : 'text-secondary-400'}`}>
                                <Icons.LayoutGrid size={32} className="flex-shrink-0 ml-3.5 max-lg:w-12 max-lg:h-12 max-lg:ml-0 self-center" />
                                <span className={` opacity-0 invisible whitespace-nowrap transition-all duration-200 ease-in-out ${isNavExpanded ? 'opacity-100 visible' : ''} max-lg:opacity-100 max-lg:visible`}>
                                    Dashboard
                                </span>
                            </NavLink>
                        </li>

                        <RoleGuard anyRole={[UserRoleEnum.EMPLOYER, UserRoleEnum.ADMIN]}>
                            <li className="list-none w-full max-lg:flex max-lg:justify-start max-lg:w-auto">
                                <NavLink to="/avaliacao" onClick={closeMenu} title="Avaliação de ciclo" className={({ isActive }) => `flex items-center gap-4 no-underline relative transition-all duration-200 ease-in-out hover:text-secondary-600 max-lg:text-2xl max-lg:gap-4 ${isActive ? 'text-primary-500' : 'text-secondary-400'}`}>
                                    <Icons.ClipboardPen size={32} className="flex-shrink-0 ml-3.5 max-lg:w-12 max-lg:h-12 max-lg:ml-0 self-center" />
                                    <span className={`opacity-0 invisible whitespace-nowrap transition-all duration-200 ease-in-out ${isNavExpanded ? 'opacity-100 visible' : ''} max-lg:opacity-100 max-lg:visible`}>
                                        Avaliação de ciclo
                                    </span>
                                </NavLink>
                            </li>
                        </RoleGuard>

                        <RoleGuard anyRole={[
                                UserRoleEnum.MANAGER,
                                UserRoleEnum.COMMITTEE,
                                UserRoleEnum.ADMIN,
                                UserRoleEnum.DEVELOPER,
                            ]}>
                            <li className="list-none w-full max-lg:flex max-lg:justify-start max-lg:w-auto">
                                <NavLink to="/evolucao" onClick={closeMenu} title="Evolução" className={({ isActive }) => `flex items-center gap-4 no-underline relative transition-all duration-200 ease-in-out hover:text-secondary-600 max-lg:text-2xl max-lg:gap-4 ${isActive ? 'text-primary-500' : 'text-secondary-400'}`}>
                                    <Icons.ChartNoAxesCombined size={32} className="flex-shrink-0 ml-3.5 max-lg:w-12 max-lg:h-12 max-lg:ml-0 self-center" />
                                    <span className={`opacity-0 invisible whitespace-nowrap transition-all duration-200 ease-in-out ${isNavExpanded ? 'opacity-100 visible' : ''} max-lg:opacity-100 max-lg:visible`}>
                                        Evolução
                                    </span>
                                </NavLink>
                            </li>
                        </RoleGuard>

                        <RoleGuard anyRole={[
                                UserRoleEnum.LEADER,
                                UserRoleEnum.RH,
                                UserRoleEnum.MENTOR,
                                UserRoleEnum.ADMIN,
                                UserRoleEnum.DEVELOPER,
                            ]}>
                            <li className="list-none w-full max-lg:flex max-lg:justify-start max-lg:w-auto">
                                <NavLink to="/colaboradores" onClick={closeMenu} title="Colaboradores" className={({ isActive }) => `flex items-center gap-4 no-underline relative transition-all duration-200 ease-in-out hover:text-secondary-600 max-lg:text-2xl max-lg:gap-4 ${isActive ? 'text-primary-500' : 'text-secondary-400'}`}>
                                    <Icons.Users size={32} className="flex-shrink-0 ml-3.5 max-lg:w-12 max-lg:h-12 max-lg:ml-0 self-center" />
                                    <span className={`opacity-0 invisible whitespace-nowrap transition-all duration-200 ease-in-out ${isNavExpanded ? 'opacity-100 visible' : ''} max-lg:opacity-100 max-lg:visible`}>
                                        Colaboradores
                                    </span>
                                </NavLink>
                            </li>
                        </RoleGuard>

                        <RoleGuard anyRole={[
                                UserRoleEnum.RH,
                                UserRoleEnum.ADMIN,
                                UserRoleEnum.DEVELOPER,
                            ]}>
                            <li className="list-none w-full max-lg:flex max-lg:justify-start max-lg:w-auto">
                                <NavLink to="/importar" onClick={closeMenu} title="Importar Histórico" className={({ isActive }) => `flex items-center gap-4 no-underline relative transition-all duration-200 ease-in-out hover:text-secondary-600 max-lg:text-2xl max-lg:gap-4 ${isActive ? 'text-primary-500' : 'text-secondary-400'}`}>
                                    <Icons.FileUp size={32} className="flex-shrink-0 ml-3.5 max-lg:w-12 max-lg:h-12 max-lg:ml-0 self-center" />
                                    <span className={`opacity-0 invisible whitespace-nowrap transition-all duration-200 ease-in-out ${isNavExpanded ? 'opacity-100 visible' : ''} max-lg:opacity-100 max-lg:visible`}>
                                        Importar Histórico
                                    </span>
                                </NavLink>
                            </li>
                        </RoleGuard>

                        <RoleGuard anyRole={[
                                UserRoleEnum.RH,
                                UserRoleEnum.ADMIN,
                                UserRoleEnum.DEVELOPER,
                            ]}>
                            <li className="list-none w-full max-lg:flex max-lg:justify-start max-lg:w-auto">
                                <NavLink to="/lideranca" onClick={closeMenu} title="Liderança" className={({ isActive }) => `flex items-center gap-4 no-underline relative transition-all duration-200 ease-in-out hover:text-secondary-600 max-lg:text-2xl max-lg:gap-4 ${isActive ? 'text-primary-500' : 'text-secondary-400'}`}>
                                    <Icons.Star size={32} className="flex-shrink-0 ml-3.5 max-lg:w-12 max-lg:h-12 max-lg:ml-0 self-center" />
                                    <span className={`opacity-0 invisible whitespace-nowrap transition-all duration-200 ease-in-out ${isNavExpanded ? 'opacity-100 visible' : ''} max-lg:opacity-100 max-lg:visible`}>
                                        Liderança
                                    </span>
                                </NavLink>
                            </li>
                        </RoleGuard>

                        <RoleGuard anyRole={[
                                UserRoleEnum.ADMIN,
                            ]}>
                            <li className="list-none w-full max-lg:flex max-lg:justify-start max-lg:w-auto">
                                <NavLink to="/auditoria" onClick={closeMenu} title="Auditoria" className={({ isActive }) => `flex items-center gap-4 no-underline relative transition-all duration-200 ease-in-out hover:text-secondary-600 max-lg:text-2xl max-lg:gap-4 ${isActive ? 'text-primary-500' : 'text-secondary-400'}`}>
                                    <Icons.ScrollText size={32} className="flex-shrink-0 ml-3.5 max-lg:w-12 max-lg:h-12 max-lg:ml-0 self-center" />
                                    <span className={`opacity-0 invisible whitespace-nowrap transition-all duration-200 ease-in-out ${isNavExpanded ? 'opacity-100 visible' : ''} max-lg:opacity-100 max-lg:visible`}>
                                        Auditoria
                                    </span>
                                </NavLink>
                            </li>
                        </RoleGuard>

                        <RoleGuard anyRole={[
                                UserRoleEnum.RH,
                                UserRoleEnum.ADMIN,
                                UserRoleEnum.DEVELOPER,
                            ]}>
                            <li className="list-none w-full max-lg:flex max-lg:justify-start max-lg:w-auto">
                                <NavLink to="/configuracoes" onClick={closeMenu} title="Configurações" className={({ isActive }) => `flex items-center gap-4 no-underline relative transition-all duration-200 ease-in-out hover:text-secondary-600 max-lg:text-2xl max-lg:gap-4 ${isActive ? 'text-primary-500' : 'text-secondary-400'}`}>
                                    <Icons.Settings size={32} className="flex-shrink-0 ml-3.5 max-lg:w-12 max-lg:h-12 max-lg:ml-0 self-center" />
                                    <span className={`opacity-0 invisible whitespace-nowrap transition-all duration-200 ease-in-out ${isNavExpanded ? 'opacity-100 visible' : ''} max-lg:opacity-100 max-lg:visible`}>
                                        Configurações
                                    </span>
                                </NavLink>
                            </li>
                        </RoleGuard>

                    </ul>

                    <div className="flex w-full mt-auto lg:mt-auto max-lg:mt-8 max-lg:mb-32 max-lg:justify-start max-lg:pl-20">
                        <div onClick={handleLogout} title="Sair" className="flex items-center gap-4 cursor-pointer ml-4 text-secondary-400 hover:text-secondary-600 transition-colors duration-200 max-lg:text-2xl max-lg:gap-4 max-lg:ml-0">
                            <Icons.LogOut size={32} strokeWidth={2.5} className="flex-shrink-0 max-lg:w-12 max-lg:h-12" />
                            <span className={`opacity-0 invisible whitespace-nowrap transition-all duration-200 ease-in-out ${isNavExpanded ? 'opacity-100 visible' : ''} max-lg:opacity-100 max-lg:visible`}>
                                Sair
                            </span>
                        </div>
                    </div>
                </nav>
            </aside>
        </>
    );

}
