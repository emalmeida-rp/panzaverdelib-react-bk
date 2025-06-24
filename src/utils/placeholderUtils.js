// Utilidad centralizada para placeholders SVG (DRY principle)
export const PRODUCT_STYLES = {
  cuaderno: { bg: '#f8f9fa', color: '#343a40', text: 'CUADERNO', emoji: '📓' },
  lapicera: { bg: '#e3f2fd', color: '#1976d2', text: 'LAPICERAS', emoji: '🖊️' },
  lapiz: { bg: '#fff3e0', color: '#f57c00', text: 'LÁPIZ', emoji: '✏️' },
  tijera: { bg: '#e8f5e8', color: '#388e3c', text: 'TIJERAS', emoji: '✂️' },
  marcador: { bg: '#fff8e1', color: '#fbc02d', text: 'MARCADORES', emoji: '🖍️' },
  cartulina: { bg: '#fce4ec', color: '#c2185b', text: 'CARTULINAS', emoji: '🎨' },
  crayon: { bg: '#f3e5f5', color: '#8e24aa', text: 'CRAYONES', emoji: '🖍️' },
  regla: { bg: '#e0f2f1', color: '#00695c', text: 'REGLA', emoji: '📏' },
  goma: { bg: '#ffebee', color: '#d32f2f', text: 'GOMA', emoji: '🧽' },
  compas: { bg: '#e1f5fe', color: '#0277bd', text: 'COMPÁS', emoji: '📐' },
  plastificado: { bg: '#f1f8e9', color: '#689f38', text: 'PLASTIFICADO', emoji: '🔒' },
  fotocopia_bn: { bg: '#fafafa', color: '#424242', text: 'FOTOCOPIAS B/N', emoji: '📄' },
  fotocopia_color: { bg: '#e8eaf6', color: '#3f51b5', text: 'FOTOCOPIAS COLOR', emoji: '🌈' },
  anillado: { bg: '#e0f7fa', color: '#00838f', text: 'ANILLADO', emoji: '📚' },
  foto: { bg: '#fff9c4', color: '#f9a825', text: 'FOTOS', emoji: '📸' },
  default: { bg: '#e9ecef', color: '#6c757d', text: 'PRODUCTO', emoji: '🛍️' }
};

export const getProductStyle = (productName) => {
  const name = productName?.toLowerCase() || '';
  
  if (name.includes('cuaderno')) return PRODUCT_STYLES.cuaderno;
  if (name.includes('lapicera') || name.includes('bic')) return PRODUCT_STYLES.lapicera;
  if (name.includes('lápiz') || name.includes('lapiz')) return PRODUCT_STYLES.lapiz;
  if (name.includes('tijera')) return PRODUCT_STYLES.tijera;
  if (name.includes('marcador')) return PRODUCT_STYLES.marcador;
  if (name.includes('cartulina')) return PRODUCT_STYLES.cartulina;
  if (name.includes('crayon')) return PRODUCT_STYLES.crayon;
  if (name.includes('regla')) return PRODUCT_STYLES.regla;
  if (name.includes('goma')) return PRODUCT_STYLES.goma;
  if (name.includes('compás') || name.includes('compas')) return PRODUCT_STYLES.compas;
  if (name.includes('plastificado')) return PRODUCT_STYLES.plastificado;
  if (name.includes('fotocopia') && name.includes('b/n')) return PRODUCT_STYLES.fotocopia_bn;
  if (name.includes('fotocopia') && name.includes('color')) return PRODUCT_STYLES.fotocopia_color;
  if (name.includes('anillado')) return PRODUCT_STYLES.anillado;
  if (name.includes('foto')) return PRODUCT_STYLES.foto;
  
  return PRODUCT_STYLES.default;
};

export const createProductPlaceholder = (productName, width = 300, height = 200, emojiSize = 24, textSize = 14) => {
  const style = getProductStyle(productName);
  
  const svg = `<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
    <rect width="${width}" height="${height}" fill="${style.bg}"/>
    <text x="${width/2}" y="${height/2 - 15}" text-anchor="middle" font-family="Arial, sans-serif" font-size="${emojiSize}" fill="${style.color}">${style.emoji}</text>
    <text x="${width/2}" y="${height/2 + 15}" text-anchor="middle" font-family="Arial, sans-serif" font-size="${textSize}" font-weight="bold" fill="${style.color}">${style.text}</text>
  </svg>`;
  
  return `data:image/svg+xml;base64,${btoa(unescape(encodeURIComponent(svg)))}`;
};

export const createCardPlaceholder = (productName) => 
  createProductPlaceholder(productName, 300, 200, 24, 14);

export const createDetailPlaceholder = (productName) => 
  createProductPlaceholder(productName, 500, 400, 48, 20); 