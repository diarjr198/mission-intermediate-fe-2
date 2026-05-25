import { useState, useRef, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import logo from "../../assets/images/logo.png";
import avatar from "../../assets/images/avatar/avatar-profile.png";

export default function HomeNavbar({ onCategoryClick, showFilterMode }) {
    const [menuOpen, setMenuOpen] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);
    const navigate = useNavigate();
    const location = useLocation();

    const handleCategoryNav = () => {
        if (location.pathname === "/home") {
            onCategoryClick();
            return;
        }

        navigate("/home", { state: { openFilterMode: true } });
    };

    // Tutup dropdown ketika klik di luar
    useEffect(() => {
        function handleClickOutside(e) {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(e.target)
            ) {
                setDropdownOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () =>
            document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleMobileCategoryClick = () => {
        handleCategoryNav();
        setMenuOpen(false);
    };

    const handleMobileLogout = () => {
        navigate("/");
        setMenuOpen(false);
    };

    return (
        <nav className="relative z-50 border-b border-brand-border bg-white">
            <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 sm:px-6 lg:px-8">
                <Link
                    to="/home"
                    className="block h-10 w-[152px] sm:h-12 sm:w-[200px] lg:h-14 lg:w-[237px]"
                >
                    <img
                        src={logo}
                        alt="Videobelajar"
                        className="h-full w-full object-contain"
                    />
                </Link>

                {/* Desktop menu */}
                <div className="hidden items-center gap-9 md:flex">
                    <button
                        onClick={handleCategoryNav}
                        className={`text-base font-medium transition ${
                            showFilterMode
                                ? "text-brand-primary"
                                : "text-slate-600 hover:text-brand-primary"
                        }`}
                    >
                        Kategori
                    </button>
                    <Link to="/crud" className="text-base font-medium text-slate-600 transition hover:text-brand-primary">
                        CRUD
                    </Link>

                    {/* Avatar + Dropdown */}
                    <div className="relative flex items-center" ref={dropdownRef}>
                        <button
                            onClick={() => setDropdownOpen(!dropdownOpen)}
                            className="h-[46px] w-[46px] overflow-hidden rounded-[10px]"
                        >
                            <img
                                src={avatar}
                                alt="Profile"
                                className="h-full w-full object-cover"
                            />
                        </button>

                        {/* Dropdown Menu */}
                        {dropdownOpen && (
                            <div className="absolute right-0 top-[calc(100%+8px)] z-50 w-48 rounded-xl border border-gray-100 bg-white py-1 shadow-soft">
                                <div className="border-b border-gray-100 px-4 py-3">
                                    <p className="text-sm font-semibold text-brand-dark">
                                        John Doe
                                    </p>
                                    <p className="text-xs text-slate-400">
                                        john@email.com
                                    </p>
                                </div>
                                <button
                                    onClick={() => {
                                        setDropdownOpen(false);
                                        navigate("/");
                                    }}
                                    className="flex w-full items-center gap-3 px-4 py-3 text-sm text-red-500 transition hover:bg-red-50"
                                >
                                    {/* Icon keluar */}
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-4 w-4"
                                        viewBox="0 0 24 24"
                                        fill="currentColor"
                                    >
                                        <path d="M5 3h7a1 1 0 0 1 1 1v2h-2V5H5v14h6v-1h2v2a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1Z" />
                                        <path d="M15.293 8.293a1 1 0 0 1 1.414 0L19.414 11H10a1 1 0 0 0 0 2h9.414l-2.707 2.707a1 1 0 0 0 1.414 1.414l4-4a1 1 0 0 0 0-1.414l-4-4a1 1 0 0 0-1.414 0Z" />
                                    </svg>
                                    Keluar
                                </button>
                            </div>
                        )}
                    </div>
                </div>

                {/* Mobile hamburger */}
                <button
                    className="md:hidden flex flex-col gap-1.5"
                    onClick={() => setMenuOpen(!menuOpen)}
                    aria-label="Toggle menu"
                >
                    <span
                        className={`block h-0.5 w-6 bg-brand-dark transition-all ${menuOpen ? "rotate-45 translate-y-2" : ""}`}
                    />
                    <span
                        className={`block h-0.5 w-6 bg-brand-dark transition-all ${menuOpen ? "opacity-0" : ""}`}
                    />
                    <span
                        className={`block h-0.5 w-6 bg-brand-dark transition-all ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`}
                    />
                </button>
            </div>

            {/* Mobile dropdown */}
            {menuOpen && (
                <div className="border-t border-brand-border bg-white px-5 py-4 md:hidden">
                    <button
                        onClick={handleMobileCategoryClick}
                        className={`block w-full text-left py-2 text-base font-medium ${
                            showFilterMode
                                ? "text-brand-primary"
                                : "text-slate-600 hover:text-brand-primary"
                        }`}
                    >
                        Kategori
                    </button>

                    <Link to="/crud" onClick={() => setMenuOpen(false)} className="block py-2 text-base font-medium text-slate-600 hover:text-brand-primary">
                        CRUD
                    </Link>

                    <button
                        onClick={handleMobileLogout}
                        className="block py-2 text-base font-medium text-red-500 hover:text-red-600"
                    >
                        Keluar
                    </button>
                </div>
            )}
        </nav>
    );
}
