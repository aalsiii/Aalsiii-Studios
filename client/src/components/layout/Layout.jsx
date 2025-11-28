import Loader from './Loader';
import Cursor from './Cursor';
import NoiseOverlay from './NoiseOverlay';
import Navbar from './Navbar';
import useSmoothScroll from '../../hooks/useSmoothScroll';

export default function Layout({ children }) {
    useSmoothScroll();
    return (
        <>
            <Loader />
            <Cursor />
            <NoiseOverlay />
            <Navbar />
            <main>{children}</main>
        </>
    );
}
