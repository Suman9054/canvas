import {
  Folder,
  Star,
  Settings,
  ChevronDown,
  Plus,
  Search,
} from "lucide-react";
import { Link, Outlet } from "react-router";

const FileManager = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navigation */}
      <nav className="h-14 border-b border-gray-200 bg-white">
        <div className="h-full flex items-center justify-between px-4">
          <div className="flex items-center gap-8">
            <h1 className="text-xl font-semibold">VectorPro</h1>
            <div className="flex items-center gap-6">
              <Link to="#" className="text-gray-600 hover:text-gray-900">
                Library
              </Link>
              <Link to="#" className="text-gray-600 hover:text-gray-900">
                Templates
              </Link>
              <Link to="#" className="text-gray-600 hover:text-gray-900">
                Community
              </Link>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg">
              <Settings className="w-5 h-5" />
            </button>
            <button className="flex items-center gap-2 px-3 py-1.5 text-gray-700 hover:bg-gray-100 rounded-lg">
              <span>John Doe</span>
              <ChevronDown className="w-4 h-4" />
            </button>
          </div>
        </div>
      </nav>

      <div className="flex h-[calc(100vh-3.5rem)]">
        {/* Left Sidebar */}
        <div className="w-44 border-r border-gray-200 bg-white">
          <div className="p-3 grid grid-cols-1 gap-1">
            <button
              className="w-full flex items-center gap-2 px-3 py-2 bg-emerald-500 hover:bg-emerald-600 
              text-white rounded-lg transition-colors"
            >
              <Plus className="w-4 h-4" />
              <span>New</span>
            </button>

            <button
              className="w-full flex items-center gap-2 px-3 py-2 bg-emerald-500 hover:bg-emerald-600 
              text-white rounded-lg transition-colors"
            >
              <Search className="w-4 h-4" />
              <span>Join</span>
            </button>
          </div>

          <div className="px-3 py-2">
            <h2 className="text-sm font-medium text-gray-500 px-3 mb-2">
              PROJECTS
            </h2>
            <div className="space-y-1">
              <a
                href="#"
                className="flex items-center gap-2 px-3 py-2 text-gray-700 
                hover:bg-gray-100 rounded-lg"
              >
                <Folder className="w-4 h-4" />
                <span>All Files</span>
              </a>
              <a
                href="#"
                className="flex items-center gap-2 px-3 py-2 text-gray-700 
                hover:bg-gray-100 rounded-lg"
              >
                <Star className="w-4 h-4" />
                <span>Starred</span>
              </a>
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 bg-white p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold">Recent Projects</h2>
            <div className="flex items-center gap-2">
              <button className="px-3 py-1.5 text-gray-600 hover:bg-gray-100 rounded-lg">
                Sort by: Recent
              </button>
              <button className="px-3 py-1.5 text-gray-600 hover:bg-gray-100 rounded-lg">
                View: Grid
              </button>
            </div>
          </div>
          {/* Grid of Projects */}
          <div className="grid grid-cols-4 gap-4">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FileManager;
