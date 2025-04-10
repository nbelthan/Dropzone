// ... imports ...

function App() {
  // ... state ...
  // ... hooks ...

  // Remove currentTime calculation as it's not used in the new footer text
  // const currentTime = useMemo(() => new Date(), []);

  // ... reset function ...

  return (
    <div className="container mx-auto p-4 sm:p-6 md:p-8">
      <header className="flex justify-between items-center mb-6 sm:mb-8">
         {/* ... Logo/Title ... */}
         {/* GitHub Link Updated */}
         <a
            href="https://github.com/nbelthan/Dropzone" // <-- Updated URL
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-white transition-colors"
            title="View Source on GitHub"
          >
             <Github size={24} />
         </a>
      </header>

      {/* ... main content ... */}

      {/* Footer Updated */}
      <footer className="text-center mt-12 text-xs text-gray-300"> {/* Changed text color */}
         <p>Simulations based on user inputs. Not financial advice. DYOR.</p>
         {/* Removed dynamic time */}
      </footer>
    </div>
  );
}

export default App;
