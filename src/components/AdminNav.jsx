import { Link, useLocation } from "react-router-dom";

export default function AdminNav() {
    const location = useLocation();
    const isLogin = location.pathname === "/admin/login";

    return (
        <nav className="bg-white dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800">
            <div className="container mx-auto px-6 lg:px-20 py-6">
                <div className="flex items-center justify-between">
                    <Link
                        to="/"
                        className="text-2xl font-bold text-slate-900 dark:text-white"
                    >
                        AK
                    </Link>

                    <div className="flex items-center gap-4">
                        {!isLogin && (
                            <Link
                                to="/"
                                className="text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors font-mono text-sm"
                            >
                                Back to Portfolio
                            </Link>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
}
