import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

const Layout = ({ children, showSidebar = false }) => {
  return (
    <div className="min-h-screen flex">
      {/* Sidebar if enabled */}
      {showSidebar && <Sidebar />}

   
      <div className="flex flex-1 flex-col">
        <Navbar />
        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;