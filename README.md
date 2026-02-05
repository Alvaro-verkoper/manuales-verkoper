# VERKOPER SPA - Portal de Gestión Documental

Sistema de gestión documental corporativo estático compatible con GitHub Pages.

## Características

- ✅ Diseño corporativo limpio y profesional
- ✅ Buscador global con filtrado por tags
- ✅ Navegación por secciones (Protocolos, Procedimientos, Matrices)
- ✅ Índice con anclas para cada documento
- ✅ Sección de Recursos con filtros avanzados
- ✅ Sin dependencias externas (sin CDNs)
- ✅ Responsive y listo para impresión
- ✅ 100% HTML/CSS/JavaScript vanilla

## Estructura del Proyecto

```
/
├── index.html                  # Página principal
├── guias.html                  # Guías operativas
├── faq.html                    # Preguntas frecuentes
├── glosario.html               # Glosario de términos
├── historial.html              # Control de versiones
├── protocolos/                 # Documentos de protocolos
│   ├── horarios.html
│   ├── administrativo.html
│   ├── ventas.html
│   ├── bodega.html
│   ├── conducta.html
│   └── jefe-sucursal.html
├── procedimientos/             # Documentos de procedimientos
│   ├── venta.html
│   └── logistica.html
├── matrices/                   # Matrices y controles
│   ├── estafas.html
│   ├── cumplimiento-rol.html
│   └── sanciones.html
├── recursos/                   # Sección de recursos
│   └── index.html
├── uploads/                    # Archivos subidos (tutoriales, docs, etc.)
│   ├── tutoriales/
│   ├── documentacion/
│   ├── plantillas/
│   └── evidencias/
├── data/                       # Bases de datos JSON
│   ├── docs.json
│   └── resources.json
└── assets/                     # Recursos estáticos
    ├── css/styles.css
    └── js/app.js
```

## Instalación en GitHub Pages

1. Crear un nuevo repositorio en GitHub
2. Subir todos los archivos del proyecto
3. En Settings → Pages, seleccionar la rama `main` y carpeta `/` (root)
4. Guardar y esperar unos minutos

El sitio estará disponible en: `https://[tu-usuario].github.io/[nombre-repo]/`

## Agregar Nuevos Documentos

### 1. Crear el archivo HTML

Crea el archivo en la carpeta correspondiente siguiendo la estructura de los existentes.

### 2. Actualizar docs.json

Agrega una entrada en `/data/docs.json`:

```json
{
  "title": "Nombre del Documento",
  "url": "/carpeta/archivo.html",
  "section": "protocolos|procedimientos|matrices|otros",
  "tags": ["tag1", "tag2", "tag3"],
  "updated": "2026-MM-DD",
  "version": "X.X",
  "area": "Área aplicable",
  "summary": "Descripción breve",
  "critical": true|false
}
```

### 3. Commit y Push

```bash
git add .
git commit -m "Agregar nuevo documento"
git push
```

## Agregar Recursos

### 1. Subir archivo

Coloca el archivo en `/uploads/[tipo]/` donde tipo puede ser:
- tutoriales
- documentacion
- plantillas
- evidencias

### 2. Actualizar resources.json

Agrega una entrada en `/data/resources.json`:

```json
{
  "title": "Nombre del Recurso",
  "type": "tutorial|documentacion|plantilla|evidencia",
  "area": "ventas|administracion|bodega|jefatura|general",
  "tags": ["tag1", "tag2"],
  "date": "2026-MM-DD",
  "file_path": "/uploads/tipo/archivo.pdf",
  "related_docs": [
    {"title": "Doc Relacionado", "url": "/ruta/doc.html"}
  ]
}
```

### 3. Commit y Push

```bash
git add .
git commit -m "Agregar nuevo recurso"
git push
```

## Funcionalidades JavaScript

### Búsqueda Global
- Busca en títulos, resúmenes y tags
- Filtrado en tiempo real
- Resultados con enlaces directos

### Filtros de Recursos
- Por tipo (tutorial, documentación, plantilla, evidencia)
- Por área (ventas, administración, bodega, jefatura, general)
- Por tags (clickeables)
- Búsqueda por texto

### Navegación
- Menú fijo en header
- Resaltado de sección activa
- Breadcrumbs en cada página
- Scroll suave a anclas

### Impresión
- Botón de impresión en cada documento
- Estilos optimizados para impresión
- Oculta elementos innecesarios al imprimir

## Personalización

### Colores Corporativos

Editar variables CSS en `/assets/css/styles.css`:

```css
:root {
    --primary-color: #1a365d;
    --secondary-color: #2c5282;
    --accent-color: #3182ce;
    /* ... más colores */
}
```

### Logo

Cambiar texto en el header de cada archivo HTML:

```html
<div class="logo">VERKOPER</div>
```

## Soporte

Para consultas o problemas, contactar al equipo de TI o Jefatura.

## Licencia

© 2026 VERKOPER SPA - Ferretería Técnica Especializada  
Uso interno exclusivo
