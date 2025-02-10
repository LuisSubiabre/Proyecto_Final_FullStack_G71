import { Outlet } from "react-router-dom";

const MinimalLayout = () => (
    <main className="flex-1">
        <Outlet />
    </main>
);

export default MinimalLayout;