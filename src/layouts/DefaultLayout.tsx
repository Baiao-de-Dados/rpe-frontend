import { Outlet } from 'react-router-dom';
import AsideMenu from '../components/AsideMenu';

export function DefaultLayout() {
    return (
        <div className="relative h-screen max-lg:flex-col">
            <AsideMenu />
            <div className="h-full overflow-y-auto ml-24 max-lg:ml-0">
                <Outlet />
            </div>
        </div>
    );
}
