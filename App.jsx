/* Grove & Stone — App Shell */
const { useState: useStateApp, useEffect: useEffectApp } = React;

const PAGES = ['home', 'about', 'services', 'portfolio', 'contact'];

function pageFromPath() {
  const p = window.location.pathname.replace(/^\//, '') || 'home';
  return PAGES.includes(p) ? p : 'home';
}

function App() {
  const [page, setPage] = useStateApp(pageFromPath);

  useEffectApp(() => {
    const onPop = () => { window.scrollTo(0, 0); setPage(pageFromPath()); };
    window.addEventListener('popstate', onPop);
    return () => window.removeEventListener('popstate', onPop);
  }, []);

  const nav = (p) => {
    window.scrollTo(0, 0);
    window.history.pushState({}, '', p === 'home' ? '/' : '/' + p);
    setPage(p);
  };

  return (
    <div style={{ fontFamily: 'var(--font-sans)', background: 'var(--color-bg)' }}>
      <SiteNav page={page} setPage={nav} />

      <div id="gs-main">
        {page === 'home'      && <HomePage      onNav={nav} />}
        {page === 'about'     && <AboutPage     onNav={nav} />}
        {page === 'services'  && <ServicesPage  onNav={nav} />}
        {page === 'portfolio' && <PortfolioPage onNav={nav} />}
        {page === 'contact'   && <ContactPage   onNav={nav} />}
      </div>

      <SiteFooter setPage={nav} />
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
