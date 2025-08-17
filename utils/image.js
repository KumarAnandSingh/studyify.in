export function resolveImagePath(path) {
  if (!path) return '';
  if (path.startsWith('http://') || path.startsWith('https://')) {
    return path;
  }
  if (path.startsWith('/')) {
    return path;
  }
  if (path.startsWith('images/')) {
    return '/' + path;
  }
  return `/images/${path}`;
}
