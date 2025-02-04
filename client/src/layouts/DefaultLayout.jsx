import Banner from "../components/Banner";
import Navbar from "../components/Navbar/Navbar.jsx";
import Footer from "../components/Footer/Footer.jsx";

const DefaultLayout = ({ children }) => (
    <>
        <Banner />
        <header className="sticky top-0 z-50">
            <Navbar />
        </header>
        <main className="flex-1 overflow-y-auto">{children}</main>
        <footer>
            <Footer />
        </footer>
    </>
);

export default DefaultLayout;
