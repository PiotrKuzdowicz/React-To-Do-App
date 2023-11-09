export default function getTheme() {
    const theme = localStorage.getItem('theme');
    return theme === undefined || theme === null ? 'light' : theme;
  }
