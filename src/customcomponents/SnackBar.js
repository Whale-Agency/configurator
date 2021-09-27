export function showSnackBar(text) {
  const x = document.getElementById('snackbar');
  if (x !== null && x !== undefined) {
    x.className = 'show';
    x.innerHTML = text;
    setTimeout(() => {
      x.className = x.className.replace('show', '');
    }, 3000);
  }
}
