import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu } from '@headlessui/react';
import { Menu as MenuIcon, X, User, LogOut, Settings } from 'lucide-react';
import { useStore } from '@/store/useStore';

export const Navigation: React.FC = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const location = useLocation();
  const { currentUser, volunteers, logout } = useStore();
  
  const volunteer = currentUser ? volunteers[currentUser.id] : null;
  const isAdmin = currentUser?.role === 'admin';

  const isActive = (path: string) => location.pathname === path;

  const publicLinks = [
    { path: '/', label: 'Home' },
    { path: '/about', label: 'About' },
    { path: '/sites', label: 'Sites' },
  ];

  const volunteerLinks = currentUser ? [
    { path: '/dashboard', label: 'Dashboard' },
    { path: '/assignments', label: 'Assignments' },
    { path: '/log-hours', label: 'Log Hours' },
  ] : [];

  const adminLinks = isAdmin ? [
    { path: '/admin', label: 'Admin' },
  ] : [];

  return (
    <nav className="bg-primary-500 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-3">
              <img 
                src="/src/images/fcf_logo_g-1.svg" 
                alt="Forêt Capitale Forest logo"
                width="40"
                height="40"
                className="flex-shrink-0"
              />
              <div className="flex flex-col">
                <span className="text-xl font-bold leading-tight">Forêt Capitale Forest</span>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-4">
            {publicLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive(link.path)
                    ? 'bg-primary-700'
                    : 'hover:bg-primary-600'
                }`}
              >
                {link.label}
              </Link>
            ))}
            
            {volunteerLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive(link.path)
                    ? 'bg-primary-700'
                    : 'hover:bg-primary-600'
                }`}
              >
                {link.label}
              </Link>
            ))}
            
            {adminLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive(link.path)
                    ? 'bg-primary-700'
                    : 'hover:bg-primary-600'
                }`}
              >
                {link.label}
              </Link>
            ))}

            {currentUser ? (
              <Menu as="div" className="relative">
                <Menu.Button className="flex items-center space-x-2 px-3 py-2 rounded-md hover:bg-primary-600 transition-colors">
                  <User size={20} />
                  <span className="text-sm font-medium">
                    {volunteer ? `${volunteer.firstName} ${volunteer.lastName}` : 'User'}
                  </span>
                </Menu.Button>
                <Menu.Items className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 text-gray-700 focus:outline-none z-50">
                  <Menu.Item>
                    {({ active }) => (
                      <Link
                        to="/profile"
                        className={`${
                          active ? 'bg-gray-100' : ''
                        } flex items-center px-4 py-2 text-sm`}
                      >
                        <User size={16} className="mr-2" />
                        Profile
                      </Link>
                    )}
                  </Menu.Item>
                  {isAdmin && (
                    <Menu.Item>
                      {({ active }) => (
                        <Link
                          to="/admin/settings"
                          className={`${
                            active ? 'bg-gray-100' : ''
                          } flex items-center px-4 py-2 text-sm`}
                        >
                          <Settings size={16} className="mr-2" />
                          Settings
                        </Link>
                      )}
                    </Menu.Item>
                  )}
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        onClick={logout}
                        className={`${
                          active ? 'bg-gray-100' : ''
                        } flex items-center w-full px-4 py-2 text-sm text-left`}
                      >
                        <LogOut size={16} className="mr-2" />
                        Logout
                      </button>
                    )}
                  </Menu.Item>
                </Menu.Items>
              </Menu>
            ) : (
              <Link
                to="/login"
                className="px-4 py-2 rounded-md text-sm font-medium bg-white text-primary-500 hover:bg-gray-100 transition-colors"
              >
                Login
              </Link>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-md hover:bg-primary-600 transition-colors"
            >
              {isOpen ? <X size={24} /> : <MenuIcon size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden border-t border-primary-600">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {[...publicLinks, ...volunteerLinks, ...adminLinks].map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={`block px-3 py-2 rounded-md text-base font-medium ${
                  isActive(link.path)
                    ? 'bg-primary-700'
                    : 'hover:bg-primary-600'
                }`}
              >
                {link.label}
              </Link>
            ))}
            
            {currentUser ? (
              <>
                <Link
                  to="/profile"
                  onClick={() => setIsOpen(false)}
                  className="block px-3 py-2 rounded-md text-base font-medium hover:bg-primary-600"
                >
                  Profile
                </Link>
                <button
                  onClick={() => {
                    logout();
                    setIsOpen(false);
                  }}
                  className="block w-full text-left px-3 py-2 rounded-md text-base font-medium hover:bg-primary-600"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link
                to="/login"
                onClick={() => setIsOpen(false)}
                className="block px-3 py-2 rounded-md text-base font-medium bg-white text-primary-500"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

// Made with Bob
