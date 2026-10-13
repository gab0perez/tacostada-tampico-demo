# Tacostada Tampico — Demostración Comercial Web (NEXORA)

Propuesta digital contemporánea diseñada para **Tacostada**, restaurante especializado en tacos al pastor, hamburguesas mamalonas y papas asadas con sucursales en **Tampico** y **Ciudad Madero**, Tamaulipas.

---

## 🚀 Cómo Ejecutar el Proyecto Localmente

No requiere bases de datos ni pasos complejos de compilación. Puedes levantarlo en tu navegador con cualquiera de las siguientes opciones:

### Opción 1: Con Node.js / NPM (Recomendado)
```bash
# Iniciar servidor local en http://localhost:3000
npm run dev
# o
npx serve . -l 3000
```

### Opción 2: Con Python
```bash
python -m http.server 3000
```

### Opción 3: Abrir directamente
Si cuentas con extensiones como *Live Server* en tu editor, abre `index.html` con Live Server para soportar módulos ES6 (`import`/`export`).

---

## 🧪 Pruebas Automatizadas de Calidad (QA)

Para verificar la integridad del código, SEO, accesibilidad y datos:

```bash
npm test
# o directamente:
node tests/test-site.js
```

---

## 📁 Estructura del Proyecto

```
c:/proyectos/Tacostada Tampico/
├── assets/
│   └── img/
│       ├── ref-tacos-pastor-800.jpg   # Fotografía hero / especialidad (optimizada, 49 KB)
│       ├── ref-tacos-pastor-480.jpg   # Variante móvil (22 KB)
│       ├── ref-hamburguesa-800.jpg    # Fotografía Hamburguesa Mamalona (62 KB)
│       ├── ref-hamburguesa-480.jpg    # Variante móvil (28 KB)
│       ├── ref-papa-asada-800.jpg     # Fotografía Papa Asada Especial (81 KB)
│       └── ref-papa-asada-480.jpg     # Variante móvil (37 KB)
├── css/
│   └── styles.css                     # Sistema de diseño contemporáneo mexicano
├── js/
│   ├── app.js                         # Controlador de interacción, filtros y WhatsApp
│   └── menu-data.js                   # Catálogo de 35 platillos confirmados y sucursales
├── scripts/
│   └── optimize-images.ps1            # Script de compresión y variantes responsivas
├── tests/
│   └── test-site.js                   # Suite de pruebas automatizadas (62 assertions)
├── index.html                         # Documento HTML5 semántico con SEO y Schema.org
├── package.json                       # Scripts npm y metadatos del proyecto
└── README.md                          # Documentación del proyecto
```

---

## 📋 Auditoría de Información Comercial

### ✅ Datos Confirmados con Fuentes Primarias
| Dato | Detalle | Fuente Primaria |
|---|---|---|
| **Sucursal Sexta Avenida (Tampico)** | Río Pánuco y Andador 1 #217, Col. Emilio Portes Gil / Sexta Av., CP 89316 | DiDi Food & Rappi Tampico |
| **Sucursal Unidad Nacional (Madero)** | Calle Oaxaca #101-B, Col. Unidad Nacional, Ciudad Madero | DiDi Food & Rappi Tampico |
| **Teléfono Matriz** | `833 293 1012` | Perfil oficial en Instagram (@tacostadatampico) |
| **Teléfono Suc. Unidad Nacional** | `833 160 0865` | Perfil oficial en Instagram (@tacostadatampico) |
| **Horario habitual** | 3:00 PM – 12:00 AM (Lunes a Domingo) | Publicaciones oficiales de temporada y DiDi Food |
| **Plataformas de entrega** | DiDi Food, Rappi, Uber Eats | Tiendas públicas activas |
| **Menú y Precios** | 35 platillos con precio oficial en MXN | Catálogos de DiDi Food y Rappi |

### ⏳ Datos Pendientes de Confirmar con el Propietario
1. **Fotografías oficiales de alta resolución**: Sustituir las fotografías gastronómicas de referencia por el material fotográfico de los platillos del propio restaurante.
2. **Número de WhatsApp de pedidos**: Confirmar si prefieren centralizar los pedidos en un número único de WhatsApp Business o mantener uno independiente para cada sucursal (`833 293 1012` y `833 160 0865`).
3. **Precios en sucursal vs. delivery**: Los precios implementados corresponden a los publicados en plataformas de delivery (DiDi Food). Si los precios de mesa o mostrador tienen un diferencial (habitual en apps de entrega), se actualizan en `js/menu-data.js`.
4. **Enlace directo a Uber Eats para Unidad Nacional**: Se confirmó presencia en la zona; validar URL específica de la sucursal de Madero en Uber.

---

## 💼 Propuesta Comercial para Presentar a Tacostada

> *"Hola, somos el equipo de NEXORA. Sabemos que Tacostada tiene uno de los mejores conceptos taqueros y de burgers en la zona conurbada de Tampico y Madero, pero actualmente los clientes dependen de capturas borrosas en Facebook o de comisiones altas en apps para ver su menú.*
> 
> *Desarrollamos una demostración interactiva que carga en menos de 1 segundo en el celular, con diseño oscuro premium, menú navegable por categorías, enlace directo a sus sucursales y un botón que le deja al cliente el pedido listo en su WhatsApp sin intermediarios ni comisiones abusivas.*
> 
> *Pueden ver la demo aquí y, si les gusta, podemos personalizarla con sus fotografías oficiales y dejarla lista en su propio dominio en cuestión de días."*
