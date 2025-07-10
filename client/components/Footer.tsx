import { useState } from "react";
import { Download, ExternalLink } from "lucide-react";

export default function Footer() {
  const [showInstallPrompt, setShowInstallPrompt] = useState(true);

  const handleInstallPWA = () => {
    // In a real PWA, this would trigger the beforeinstallprompt event
    alert(
      "PWA installation would be triggered here. The app can be installed on your device for offline access.",
    );
    setShowInstallPrompt(false);
  };

  return (
    <footer className="bg-white border-t border-material-gray-200">
      {/* Main Footer Content */}
      <div className="px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Brand Section */}
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center mb-4">
                <div className="h-8 w-8 bg-material-blue rounded-lg flex items-center justify-center mr-3">
                  <span className="text-white font-bold text-lg">E</span>
                </div>
                <span className="text-xl font-semibold text-material-gray-900">
                  EduPlatform
                </span>
              </div>
              <p className="text-material-gray-600 text-sm mb-4 max-w-md">
                Streamline curriculum management, generate dynamic lectures, and
                track student progress with our comprehensive educational
                platform.
              </p>
              <div className="flex items-center space-x-4">
                <span className="text-sm text-material-gray-500">
                  Built with ❤️ for educators
                </span>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="font-semibold mb-4 text-material-gray-900">
                Platform
              </h3>
              <ul className="space-y-2 text-sm text-material-gray-600">
                <li>
                  <a
                    href="/"
                    className="hover:text-material-blue transition-colors"
                  >
                    Home
                  </a>
                </li>
                <li>
                  <a
                    href="/curriculum"
                    className="hover:text-material-blue transition-colors"
                  >
                    Curriculum Upload
                  </a>
                </li>
                <li>
                  <a
                    href="/lectures"
                    className="hover:text-material-blue transition-colors"
                  >
                    Lecture Generator
                  </a>
                </li>
                <li>
                  <a
                    href="/dashboard"
                    className="hover:text-material-blue transition-colors"
                  >
                    Dashboard
                  </a>
                </li>
                <li>
                  <a
                    href="/reports"
                    className="hover:text-material-blue transition-colors"
                  >
                    Reports
                  </a>
                </li>
              </ul>
            </div>

            {/* Support Links */}
            <div>
              <h3 className="font-semibold mb-4 text-material-gray-900">
                Support
              </h3>
              <ul className="space-y-2 text-sm text-material-gray-600">
                <li>
                  <a
                    href="#"
                    className="hover:text-material-blue transition-colors flex items-center"
                  >
                    About
                    <ExternalLink className="h-3 w-3 ml-1" />
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-material-blue transition-colors flex items-center"
                  >
                    Contact
                    <ExternalLink className="h-3 w-3 ml-1" />
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-material-blue transition-colors flex items-center"
                  >
                    Terms of Service
                    <ExternalLink className="h-3 w-3 ml-1" />
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-material-blue transition-colors flex items-center"
                  >
                    Privacy Policy
                    <ExternalLink className="h-3 w-3 ml-1" />
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-material-blue transition-colors flex items-center"
                  >
                    Help Center
                    <ExternalLink className="h-3 w-3 ml-1" />
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-material-gray-200 mt-8 pt-6">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="text-sm text-material-gray-500 mb-4 md:mb-0">
                © 2024 EduPlatform. All rights reserved. | Made for modern
                education.
              </div>
              <div className="flex items-center space-x-4">
                <span className="text-xs text-material-gray-400">
                  Version 2.1.0
                </span>
                <div className="h-4 border-l border-material-gray-300"></div>
                <button
                  onClick={handleInstallPWA}
                  className="text-xs text-material-blue hover:text-material-blue-600 transition-colors flex items-center"
                >
                  <Download className="h-3 w-3 mr-1" />
                  Install App
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
