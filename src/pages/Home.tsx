import React, { useState, useEffect } from "react";
import {
  Link2,
  Copy,
  ExternalLink,
  Moon,
  Sun,
  BarChart,
  Layout,
  History,
  Settings,
  LogOut,
} from "lucide-react";
import { nanoid } from "nanoid";
import toast, { Toaster } from "react-hot-toast";

function App() {
  const [url, setUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("dashboard");

  // const validateUrl = (urlString: string) => {
  //   try {
  //     new URL(urlString);
  //     return true;
  //   } catch (err) {
  //     return false;
  //   }
  // };

  // const shortenUrl = async (e: React.FormEvent) => {
  //   e.preventDefault();

  //   if (!url) {
  //     toast.error('Please enter a URL');
  //     return;
  //   }

  //   if (!validateUrl(url)) {
  //     toast.error('Please enter a valid URL');
  //     return;
  //   }

  //   setIsLoading(true);
  //   try {
  //     const shortId = nanoid(8);
  //     const newShortUrl = `https://urlify.io/${shortId}`;
  //     setShortUrl(newShortUrl);
  //     toast.success('URL shortened successfully!');
  //   } catch (error) {
  //     toast.error('Failed to shorten URL. Please try again.');
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  // const copyToClipboard = async () => {
  //   try {
  //     await navigator.clipboard.writeText(shortUrl);
  //     toast.success('Copied to clipboard!');
  //   } catch (err) {
  //     toast.error('Failed to copy');
  //   }
  // };

  const mockStats = {
    total: 1234,
    byCountry: {
      "United States": 450,
      "United Kingdom": 230,
      Germany: 180,
      France: 150,
      Japan: 120,
    },
    recentLinks: [
      {
        original: "https://example.com/very/long/url/1",
        short: "urlify.io/abc123",
        clicks: 45,
      },
      {
        original: "https://example.com/very/long/url/2",
        short: "urlify.io/def456",
        clicks: 32,
      },
      {
        original: "https://example.com/very/long/url/3",
        short: "urlify.io/ghi789",
        clicks: 28,
      },
    ],
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex">
      {/* Sidebar */}
      <div className="w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700">
        <div className="p-4">
          <div className="flex items-center space-x-2 text-xl font-bold text-violet-600 dark:text-violet-400">
            <Link2 className="w-6 h-6" />
            <span>URLify</span>
          </div>
        </div>

        <nav className="mt-8 px-4">
          <button
            onClick={() => setActiveTab("dashboard")}
            className={`flex items-center space-x-2 w-full px-4 py-2 rounded-lg transition-colors ${
              activeTab === "dashboard"
                ? "bg-violet-50 dark:bg-violet-900 text-violet-600 dark:text-violet-400"
                : "hover:bg-gray-100 dark:hover:bg-gray-700"
            }`}
          >
            <Layout className="w-5 h-5" />
            <span>Dashboard</span>
          </button>

          <button
            onClick={() => setActiveTab("history")}
            className={`flex items-center space-x-2 w-full px-4 py-2 mt-2 rounded-lg transition-colors ${
              activeTab === "history"
                ? "bg-violet-50 dark:bg-violet-900 text-violet-600 dark:text-violet-400"
                : "hover:bg-gray-100 dark:hover:bg-gray-700"
            }`}
          >
            <History className="w-5 h-5" />
            <span>History</span>
          </button>

          <button
            onClick={() => setActiveTab("settings")}
            className={`flex items-center space-x-2 w-full px-4 py-2 mt-2 rounded-lg transition-colors ${
              activeTab === "settings"
                ? "bg-violet-50 dark:bg-violet-900 text-violet-600 dark:text-violet-400"
                : "hover:bg-gray-100 dark:hover:bg-gray-700"
            }`}
          >
            <Settings className="w-5 h-5" />
            <span>Settings</span>
          </button>
        </nav>

        <div className="absolute bottom-0 w-64 p-4 border-t border-gray-200 dark:border-gray-700">
          {/* <button
            onClick={() => setDarkMode(!darkMode)}
            className="flex items-center space-x-2 w-full px-4 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            <span>{darkMode ? 'Light Mode' : 'Dark Mode'}</span>
          </button> */}
          <button className="flex items-center space-x-2 w-full px-4 py-2 mt-2 rounded-lg text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20">
            <LogOut className="w-5 h-5" />
            <span>Logout</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <main className="max-w-6xl mx-auto px-8 py-8">
          {/* URL Shortener Form */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 mb-8">
            <form
            //  onSubmit={shortenUrl}
             className="space-y-4">
              <div className="flex gap-4">
                <input
                  type="url"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder="Enter your long URL here"
                  className="flex-1 px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-violet-500 focus:border-transparent outline-none"
                />
                <button
                  type="submit"
                  disabled={isLoading}
                  className="px-8 py-3 bg-violet-600 hover:bg-violet-700 text-white font-semibold rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? "Shortening..." : "Shorten URL"}
                </button>
              </div>
            </form>
          </div>

          {shortUrl && (
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 mb-8">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Your shortened URL
              </h2>
              <div className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-xl">
                <input
                  type="text"
                  value={shortUrl}
                  readOnly
                  className="flex-1 bg-transparent focus:outline-none text-gray-900 dark:text-white"
                />
                <button
                  // onClick={copyToClipboard}
                  className="p-2 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg transition-colors"
                  title="Copy to clipboard"
                >
                  <Copy className="w-5 h-5" />
                </button>
                <a
                  href={shortUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg transition-colors"
                  title="Open in new tab"
                >
                  <ExternalLink className="w-5 h-5" />
                </a>
              </div>
            </div>
          )}

          {/* Dashboard Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
                Total Clicks
              </h3>
              <p className="text-3xl font-bold text-violet-600 dark:text-violet-400">
                {mockStats.total}
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
                Top Country
              </h3>
              <p className="text-3xl font-bold text-violet-600 dark:text-violet-400">
                USA
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
                Active Links
              </h3>
              <p className="text-3xl font-bold text-violet-600 dark:text-violet-400">
                {mockStats.recentLinks.length}
              </p>
            </div>
          </div>

          {/* Recent Links */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm">
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                Recent Links
              </h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50 dark:bg-gray-700">
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Original URL
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Short URL
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Clicks
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  {mockStats.recentLinks.map((link, index) => (
                    <tr key={index}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                        {link.original}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-violet-600 dark:text-violet-400">
                        {link.short}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                        {link.clicks}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <button className="text-violet-600 dark:text-violet-400 hover:text-violet-700 dark:hover:text-violet-300">
                          <BarChart className="w-5 h-5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>

      {/* <Toaster
        position="bottom-center"
        toastOptions={{
          className: 'dark:bg-gray-800 dark:text-white',
          style: {
            background: darkMode ? '#1f2937' : '#fff',
            color: darkMode ? '#fff' : '#1f2937',
          },
        }}
      /> */}
    </div>
  );
}

export default App;
