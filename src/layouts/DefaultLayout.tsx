import { Outlet } from 'react-router-dom';
import AsideMenu from '../components/AsideMenu';

export function DefaultLayout() {
    return (
        <div className="flex h-screen max-sm:flex-col">
            <AsideMenu />
            <main className="flex-1 overflow-y-auto">
                <div id="main" className="p-12 ml-20 max-sm:ml-0">
                    <div className="dashboard mt-4 mb-8">
                        <Outlet />
                    </div>
                </div>
            </main>
        </div>
    );
}
