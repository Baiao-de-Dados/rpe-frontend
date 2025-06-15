import { Outlet } from 'react-router-dom';
import AsideMenu from '../components/AsideMenu';

export function DefaultLayout() {
    return (
        <div className="relative h-screen max-lg:flex-col">
            <AsideMenu />
            <main className="h-full overflow-y-auto">
                <div id="main" className="p-12 ml-24 max-lg:ml-0">
                    <div className="page-content mt-4 mb-8">
                        <Outlet />
                    </div>
                </div>
            </main>
        </div>
    );
}
