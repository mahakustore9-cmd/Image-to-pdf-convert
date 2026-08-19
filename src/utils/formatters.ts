/**
 * Formats a byte size into human readable string (KB, MB)
 */
export function formatBytes(bytes: number, decimals = 1): string {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
}

/**
 * Ensures the filename ends with .pdf extension and has no illegal characters
 */
export function sanitizePdfFilename(filename: string): string {
  let cleaned = filename.trim().replace(/[\\/:*?"<>|]/g, '-');
  if (!cleaned) {
    cleaned = 'images-to-pdf';
  }
  if (!cleaned.toLowerCase().endsWith('.pdf')) {
    cleaned += '.pdf';
  }
  return cleaned;
}
