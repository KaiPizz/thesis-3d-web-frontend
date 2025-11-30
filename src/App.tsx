import { useState, useEffect } from "react";
import { Outlet, Link, NavLink } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";

function useDarkMode() {
  const [dark, setDark] = useState<boolean>(() =>
    document.documentElement.classList.contains("dark")
  );
  useEffect(() => {
    if (dark) document.documentElement.classList.add("dark");
    else document.documentElement.classList.remove("dark");
  }, [dark]);
  return { dark, toggle: () => setDark((d) => !d) };
}

const navItems = [
  { label: "Products", to: "/products" },
  { label: "About", to: "/about" },
  { label: "Contact", to: "/contact" },
  ...(import.meta.env.DEV ? [{ label: "Admin", to: "/admin" }] : []),
];

const linkClasses = ({ isActive }: { isActive: boolean }) =>
  `text-sm font-medium transition-colors ${
    isActive ? "text-foreground" : "text-muted-foreground hover:text-foreground"
  }`;

export default function AppLayout() {
  const { dark, toggle } = useDarkMode();

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors">
      <ScrollToTop />

      {/* Header */}
      <header className="sticky top-0 z-40 bg-white/80 dark:bg-background/80 backdrop-blur border-b border-border">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link
            to="/"
            className="flex items-center gap-2"
            aria-label="Furnistore - Home"
          >
            <span className="text-xl">🛋️</span>
            <span className="text-xl font-bold">FurniStore</span>
          </Link>

          <nav className="hidden md:flex gap-6">
            {navItems.map((n) => (
              <NavLink key={n.to} to={n.to} className={linkClasses}>
                {n.label}
              </NavLink>
            ))}
          </nav>

          <button
            onClick={toggle}
            className="ml-4 rounded-md px-3 py-1.5 text-sm border border-border hover:bg-muted transition-colors"
          >
            {dark ? "🌙 Dark" : "☀️ Light"}
          </button>
        </div>
      </header>

      {/* Page content renders here */}
      <Outlet />

      {/* Footer */}
      <footer className="bg-muted py-12 mt-12">
        <div className="container mx-auto px-4 text-sm">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <h5 className="font-semibold mb-3">FurniStore</h5>
              <p className="text-muted-foreground">
                Your destination for modern furniture and home decor.
              </p>
            </div>
            <div>
              <h6 className="font-semibold mb-3">Products</h6>
              <ul className="space-y-2 text-muted-foreground">
                <li>Furniture</li>
                <li>Lighting</li>
                <li>Decor</li>
                <li>Storage</li>
              </ul>
            </div>
            <div>
              <h6 className="font-semibold mb-3">Company</h6>
              <ul className="space-y-2 text-muted-foreground">
                <li>About Us</li>
                <li>Contact</li>
                <li>Careers</li>
                <li>Press</li>
              </ul>
            </div>
            <div>
              <h6 className="font-semibold mb-3">Support</h6>
              <ul className="space-y-2 text-muted-foreground">
                <li>Help Center</li>
                <li>Shipping</li>
                <li>Returns</li>
                <li>Warranty</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-border mt-8 pt-6 text-center text-muted-foreground">
            © {new Date().getFullYear()} FurniStore. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
