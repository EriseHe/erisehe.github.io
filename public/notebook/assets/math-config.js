window.MathJax = {
  loader: { load: ['[tex]/physics', '[tex]/cancel', '[tex]/color', '[tex]/mathtools', '[tex]/amscd'] },
  tex: {
    inlineMath: [['\\(', '\\)']],
    displayMath: [['\\[', '\\]']],
    packages: { '[+]': ['physics', 'cancel', 'color', 'mathtools', 'amscd'] },
    tags: 'ams',
    processEscapes: true,
  },
  chtml: { scale: 1, matchFontHeight: false },
  options: { skipHtmlTags: ['script', 'noscript', 'style', 'textarea', 'pre', 'code'], enableMenu: false },
};
