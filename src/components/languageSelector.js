(() => ({
  name: 'LanguageSelector',
  type: 'CONTENT_COMPONENT',
  allowedTypes: [],
  orientation: 'HORIZONTAL',
  jsx: (() => {
    const changeLanguage = lng => {
      localStorage.setItem('language', lng);
      document.location.reload();
    };
    return (
      <div>
        <button onClick={() => changeLanguage('nl')}>nl</button>
        <button onClick={() => changeLanguage('en')}>en</button>
      </div>
    );
  })(),
  styles: B => t => {
    return {};
  },
}))();
