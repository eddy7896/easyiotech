import { createContext, useContext, useState, useEffect } from 'react';
import { useSettings, type SiteSettings } from '@/hooks/useSettings';

interface SettingsContextType {
  settings: SiteSettings | null;
  loading: boolean;
  error: Error | null;
  refresh: () => Promise<void>;
}

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export const SettingsProvider = ({ children }: { children: React.ReactNode }) => {
  const { settings, loading, error, fetchSettings } = useSettings();

  // Fetch settings on initial load
  useEffect(() => {
    fetchSettings();
  }, [fetchSettings]);

  const value = {
    settings,
    loading,
    error,
    refresh: fetchSettings
  };

  return (
    <SettingsContext.Provider value={value}>
      {children}
    </SettingsContext.Provider>
  );
};

export const useWebsiteSettings = () => {
  const context = useContext(SettingsContext);
  if (context === undefined) {
    throw new Error('useWebsiteSettings must be used within a SettingsProvider');
  }
  return context;
};

// Utility components to apply settings across the app

// Component that applies site colors from settings to CSS variables
export const SettingsStyleProvider = () => {
  const { settings } = useWebsiteSettings();

  useEffect(() => {
    if (settings) {
      // Set CSS variables for colors
      if (settings.primary_color) {
        document.documentElement.style.setProperty('--primary-color', settings.primary_color);
      }
      if (settings.secondary_color) {
        document.documentElement.style.setProperty('--secondary-color', settings.secondary_color);
      }
    }
  }, [settings]);

  // This component doesn't render anything visible
  return null;
};

// Component to add header/footer scripts from settings
export const SettingsScriptInjector = () => {
  const { settings } = useWebsiteSettings();

  useEffect(() => {
    if (settings) {
      // Add header scripts
      if (settings.header_scripts) {
        // Remove any existing header scripts first
        const existingHeaderContainer = document.getElementById('settings-header-scripts');
        if (existingHeaderContainer) {
          existingHeaderContainer.remove();
        }

        // Create a container div to hold the scripts
        const headerContainer = document.createElement('div');
        headerContainer.id = 'settings-header-scripts';
        headerContainer.style.display = 'none'; // Hide the container

        try {
          // Set the HTML content which may contain script tags
          headerContainer.innerHTML = settings.header_scripts;
          document.head.appendChild(headerContainer);

          // Execute any script tags that were added
          const scripts = headerContainer.querySelectorAll('script');
          scripts.forEach((script) => {
            const newScript = document.createElement('script');

            // Copy attributes
            Array.from(script.attributes).forEach((attr) => {
              newScript.setAttribute(attr.name, attr.value);
            });

            // Copy content
            if (script.src) {
              newScript.src = script.src;
            } else {
              newScript.textContent = script.textContent;
            }

            // Replace the old script with the new one to execute it
            script.parentNode?.replaceChild(newScript, script);
          });
        } catch (error) {
          console.error('Error injecting header scripts:', error);
        }
      }

      // Add footer scripts
      if (settings.footer_scripts) {
        // Remove any existing footer scripts first
        const existingFooterContainer = document.getElementById('settings-footer-scripts');
        if (existingFooterContainer) {
          existingFooterContainer.remove();
        }

        // Create a container div to hold the scripts
        const footerContainer = document.createElement('div');
        footerContainer.id = 'settings-footer-scripts';
        footerContainer.style.display = 'none'; // Hide the container

        try {
          // Set the HTML content which may contain script tags
          footerContainer.innerHTML = settings.footer_scripts;
          document.body.appendChild(footerContainer);

          // Execute any script tags that were added
          const scripts = footerContainer.querySelectorAll('script');
          scripts.forEach((script) => {
            const newScript = document.createElement('script');

            // Copy attributes
            Array.from(script.attributes).forEach((attr) => {
              newScript.setAttribute(attr.name, attr.value);
            });

            // Copy content
            if (script.src) {
              newScript.src = script.src;
            } else {
              newScript.textContent = script.textContent;
            }

            // Replace the old script with the new one to execute it
            script.parentNode?.replaceChild(newScript, script);
          });
        } catch (error) {
          console.error('Error injecting footer scripts:', error);
        }
      }
    }

    // Cleanup function
    return () => {
      const headerContainer = document.getElementById('settings-header-scripts');
      const footerContainer = document.getElementById('settings-footer-scripts');

      if (headerContainer) headerContainer.remove();
      if (footerContainer) footerContainer.remove();
    };
  }, [settings]);

  // This component doesn't render anything visible
  return null;
};

// Component that shows maintenance mode when enabled
export const MaintenanceMode = ({ children }: { children: React.ReactNode }) => {
  const { settings, loading } = useWebsiteSettings();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (settings?.is_maintenance_mode) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="max-w-lg p-8 bg-white rounded-lg shadow-lg text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Maintenance Mode</h1>
          <p className="text-gray-600 mb-6">
            {settings.maintenance_message || "We're currently performing maintenance. Please check back soon."}
          </p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};
