// Une palette syntaxique volontairement contrastée : les thèmes Vitesse par
// défaut de Slidev sont élégants, mais trop pastel pour du code projeté.
export default function setupShiki() {
  return {
    themes: {
      light: 'github-light-high-contrast',
      dark: 'github-dark-high-contrast',
    },
  }
}
