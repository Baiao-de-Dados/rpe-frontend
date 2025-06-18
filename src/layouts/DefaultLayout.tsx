import { Outlet } from 'react-router-dom';
import AsideMenu from '../components/AsideMenu';

export function DefaultLayout() {
    return (
        <div className="flex h-screen">
            <AsideMenu />
            <div className="flex-1 h-full overflow-y-auto max-lg:w-full">
                <Outlet />
            </div>
        </div>
    );
}
