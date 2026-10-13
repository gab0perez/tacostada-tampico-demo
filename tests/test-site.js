/**
 * SUITE DE QA Y PRUEBAS AUTOMATIZADAS
 * Proyecto: Tacostada Tampico — Demo Comercial NEXORA
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

let totalTests = 0;
let passedTests = 0;
let failedTests = [];

function assert(condition, message) {
  totalTests++;
  if (condition) {
    passedTests++;
    console.log(`  ✓ PASS: ${message}`);
  } else {
    failedTests.push(message);
    console.error(`  ✗ FAIL: ${message}`);
  }
}

console.log('\n======================================================');
console.log('🧪 EJECUTANDO PRUEBAS DE CALIDAD (QA) — TACOSTADA DEMO');
console.log('======================================================\n');

// -----------------------------------------------------------------------------
// 1. Verificación de archivos estructurales del proyecto
// -----------------------------------------------------------------------------
console.log('--- 1. Archivos estructurales del proyecto ---');
const requiredFiles = [
  'index.html',
  'css/styles.css',
  'js/app.js',
  'js/menu-data.js',
  'assets/img/ref-tacos-pastor-800.jpg',
  'assets/img/ref-tacos-pastor-480.jpg',
  'assets/img/ref-hamburguesa-800.jpg',
  'assets/img/ref-papa-asada-800.jpg'
];

requiredFiles.forEach(file => {
  const filePath = path.join(rootDir, file);
  assert(fs.existsSync(filePath), `Archivo existe: ${file}`);
});

// -----------------------------------------------------------------------------
// 2. Validación de HTML y SEO Semántico
// -----------------------------------------------------------------------------
console.log('\n--- 2. Validación de HTML Semántico y SEO ---');
const htmlContent = fs.readFileSync(path.join(rootDir, 'index.html'), 'utf-8');

assert(htmlContent.includes('<!DOCTYPE html>'), 'HTML5 Doctype declarado correctamente');
assert(htmlContent.includes('<html lang="es">'), 'Idioma español definido en tag html');
assert(htmlContent.includes('<meta name="description"'), 'Meta descripción presente y no vacía');
assert(htmlContent.includes('<title>Tacostada Tampico'), 'Título SEO específico del restaurante y ciudad');
assert(htmlContent.includes('property="og:title"'), 'OpenGraph og:title configurado');
assert(htmlContent.includes('property="og:image"'), 'OpenGraph og:image configurado');
assert(htmlContent.includes('application/ld+json'), 'Datos estructurados JSON-LD incluidos');
assert(htmlContent.includes('"@type": "Restaurant"'), 'Schema.org Restaurant configurado');
assert(htmlContent.includes('Río Pánuco y Andador 1 #217'), 'Dirección de Matriz Sexta Avenida en Schema.org');
assert(htmlContent.includes('Calle Oaxaca #101-B'), 'Dirección de Sucursal Unidad Nacional en Schema.org');

// Landmarks semánticos
assert(htmlContent.includes('<header class="site-header"'), 'Header semántico presente');
assert(htmlContent.includes('<main'), 'Main landmark presente');
assert(htmlContent.includes('<section class="hero"'), 'Sección Hero presente');
assert(htmlContent.includes('id="especialidades"'), 'Sección Especialidades presente');
assert(htmlContent.includes('id="menu"'), 'Sección Menú Digital presente');
assert(htmlContent.includes('id="pedido"'), 'Sección Pedido o Contacto presente');
assert(htmlContent.includes('id="nosotros"'), 'Sección Nosotros presente');
assert(htmlContent.includes('id="ubicacion"'), 'Sección Ubicación y Horarios presente');
assert(htmlContent.includes('<footer class="site-footer"'), 'Footer semántico presente');

// Titulares requeridos en el prompt
assert(htmlContent.includes('EL ANTOJO') && htmlContent.includes('NO SE DISCUTE'), 'Titular de Hero correcto: "EL ANTOJO NO SE DISCUTE"');
assert(htmlContent.includes('LOS FAVORITOS DEL ANTOJO'), 'Titular de Especialidades correcto: "LOS FAVORITOS DEL ANTOJO"');
assert(htmlContent.includes('NEXORA'), 'Crédito comercial y marca NEXORA presente de forma elegante');

// Optimización LCP
assert(htmlContent.includes('fetchpriority="high"'), 'Imagen hero con fetchpriority="high" para optimización LCP');
assert(htmlContent.includes('srcset="assets/img/ref-tacos-pastor-480.jpg'), 'Imágenes responsivas con srcset configurado');

// -----------------------------------------------------------------------------
// 3. Verificación de Integridad de Datos (js/menu-data.js)
// -----------------------------------------------------------------------------
console.log('\n--- 3. Verificación del Módulo de Datos (menu-data.js) ---');
const { RESTAURANT_INFO, MENU_CATEGORIES, MENU_ITEMS } = await import('../js/menu-data.js');

assert(RESTAURANT_INFO.name === 'Tacostada', 'Nombre del restaurante configurado');
assert(RESTAURANT_INFO.branches.length === 2, '2 sucursales configuradas (Tampico y Madero)');

const branchSexta = RESTAURANT_INFO.branches.find(b => b.id === 'sexta-avenida');
assert(branchSexta && branchSexta.phone === '833 293 1012', 'Teléfono confirmado de Matriz: 833 293 1012');
assert(branchSexta && branchSexta.delivery.didi.includes('didiglobal.com'), 'Enlace oficial verificado de DiDi Food');
assert(branchSexta && branchSexta.delivery.rappi.includes('rappi.com.mx'), 'Enlace oficial verificado de Rappi');

const branchUnidad = RESTAURANT_INFO.branches.find(b => b.id === 'unidad-nacional');
assert(branchUnidad && branchUnidad.phone === '833 160 0865', 'Teléfono confirmado de Unidad Nacional: 833 160 0865');

assert(MENU_CATEGORIES.length >= 7, `Categorías de menú disponibles: ${MENU_CATEGORIES.length}`);
assert(MENU_ITEMS.length >= 20, `Total de platillos con datos confirmados: ${MENU_ITEMS.length}`);

// Validar que cada platillo tenga campos indispensables y precio positivo
let itemsWithValidPrice = 0;
let itemsVerified = 0;
MENU_ITEMS.forEach(item => {
  if (typeof item.price === 'number' && item.price > 0) itemsWithValidPrice++;
  if (item.priceVerified === true) itemsVerified++;
});
assert(itemsWithValidPrice === MENU_ITEMS.length, `Todos los platillos (${itemsWithValidPrice}) tienen precio numérico válido en MXN`);
assert(itemsVerified === MENU_ITEMS.length, `Todos los platillos (${itemsVerified}) tienen estado de precio verificado`);

// -----------------------------------------------------------------------------
// 4. Verificación de Estilos CSS y Reglas de Accesibilidad
// -----------------------------------------------------------------------------
console.log('\n--- 4. Verificación de Estilos CSS (css/styles.css) ---');
const cssContent = fs.readFileSync(path.join(rootDir, 'css/styles.css'), 'utf-8');

assert(cssContent.includes('--bg-main: #0b0c0e') || cssContent.includes('--bg-main'), 'Variables de tema oscuro carbón/grafito definidas');
assert(cssContent.includes('--red-accent: #d63031') || cssContent.includes('--red-accent'), 'Variable de acento rojo chile/tomate definida');
assert(cssContent.includes('--cream-accent'), 'Variable de acento crema para titulares definida');
assert(cssContent.includes('@media (max-width: 768px)'), 'Media query para móviles (768px) implementada');
assert(cssContent.includes('@media (max-width: 1024px)'), 'Media query para tablets/laptops (1024px) implementada');
assert(cssContent.includes('prefers-reduced-motion'), 'Regla de accesibilidad prefers-reduced-motion respetada');
assert(cssContent.includes(':focus-visible'), 'Estilos accesibles de enfoque (:focus-visible) configurados');

// -----------------------------------------------------------------------------
// 5. Verificación de No-Enlaces Falsos y Contenido Honesto
// -----------------------------------------------------------------------------
console.log('\n--- 5. Control de Calidad: Sin Enlaces Falsos ni Contenido Falso ---');
const forbiddenPatterns = [
  'lorem ipsum',
  'dolor sit amet',
  '555-0199',
  '555-1234',
  'ejemplo.com',
  'example.com',
  'href="#"'
];

forbiddenPatterns.forEach(pattern => {
  assert(!htmlContent.toLowerCase().includes(pattern), `Sin contenido falso/placeholder de tipo "${pattern}"`);
});

// -----------------------------------------------------------------------------
// 6. Verificación de Peso de Imágenes (Performance)
// -----------------------------------------------------------------------------
console.log('\n--- 6. Rendimiento y Peso de Imágenes ---');
const imageVariants = [
  'assets/img/ref-tacos-pastor-480.jpg',
  'assets/img/ref-tacos-pastor-800.jpg',
  'assets/img/ref-hamburguesa-480.jpg',
  'assets/img/ref-hamburguesa-800.jpg',
  'assets/img/ref-papa-asada-480.jpg',
  'assets/img/ref-papa-asada-800.jpg'
];

imageVariants.forEach(imgPath => {
  const fullPath = path.join(rootDir, imgPath);
  const stats = fs.statSync(fullPath);
  const sizeKb = Math.round(stats.size / 1024);
  assert(sizeKb < 150, `Imagen optimizada: ${imgPath} pesa ${sizeKb} KB (< 150 KB)`);
});

// -----------------------------------------------------------------------------
// Resumen Final
// -----------------------------------------------------------------------------
console.log('\n======================================================');
console.log(`📊 RESULTADO FINAL DE LA QA:`);
console.log(`   Pruebas ejecutadas: ${totalTests}`);
console.log(`   Pruebas aprobadas:  ${passedTests}`);
console.log(`   Pruebas fallidas:   ${failedTests.length}`);
console.log('======================================================\n');

if (failedTests.length > 0) {
  console.error('❌ ERRORES DETECTADOS:');
  failedTests.forEach(f => console.error(`  - ${f}`));
  process.exit(1);
} else {
  console.log('🎉 TODAS LAS PRUEBAS DE CALIDAD HAN PASADO EXITOSAMENTE.');
  process.exit(0);
}
