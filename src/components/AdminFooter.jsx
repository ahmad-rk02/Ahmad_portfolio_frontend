export default function AdminFooter() {
    return (
        <footer className="bg-white dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 py-6 mt-auto">
            <div className="container mx-auto px-6 lg:px-20">
                <p className="text-slate-600 dark:text-slate-400 text-center text-sm font-mono">
                    © {new Date().getFullYear()} Admin Panel. All rights reserved.
                </p>
            </div>
        </footer>
    );
}
