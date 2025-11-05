# Portfolio Personal - Xavi Raspall

Sitio web personal creado con **Vue.js 3**, **Vite** y desplegado en GitHub Pages.

## Características

- 🎯 **Ruleta de Tareas Interactiva**: Asigna tareas aleatoriamente con animaciones GSAP
- 🚀 **Build con Vite**: Compilación rápida y optimizada
- 📱 **Responsive Design**: Funciona en todos los dispositivos
- 🔄 **GitHub Actions**: Deployment automático a GitHub Pages

## Estructura del Proyecto

```
├── src/
│   ├── components/
│   │   └── Roulette.vue         # Componente de la ruleta
│   ├── views/
│   │   └── Home.vue             # Página de inicio
│   ├── App.vue                  # Componente raíz
│   └── main.js                  # Punto de entrada de Vue
├── public/                      # Archivos estáticos
├── dist/                        # Build de producción
├── index.html                   # HTML principal
├── vite.config.js               # Configuración de Vite
└── package.json                 # Dependencias del proyecto
```

## Instalación y Desarrollo

### Requisitos
- Node.js 18+
- npm

### Pasos

```bash
# Clonar el repositorio
git clone https://github.com/XRaspall/xraspall.github.io.git
cd xraspall.github.io

# Instalar dependencias
npm install

# Ejecutar en modo desarrollo
npm run dev

# Generar build para producción
npm run build

# Ver preview del build
npm run preview
```

## Deployment

El proyecto se despliega automáticamente a GitHub Pages cuando se hace push a la rama `master` gracias al workflow de GitHub Actions (`.github/workflows/build.yml`).

### Flujo automático:
1. Se detecta un push a `master`
2. GitHub Actions instala dependencias
3. GitHub Actions ejecuta `npm run build`
4. La carpeta `dist/` se despliega a GitHub Pages

## Tecnologías Utilizadas

- **Vue.js 3**: Framework JavaScript progresivo
- **Vite**: Herramienta de build ultra-rápida
- **GSAP**: Librería de animaciones
- **CSS3**: Estilos modernos y responsive
- **GitHub Actions**: CI/CD automatizado

## Rutas Disponibles

- `/` - Página de inicio del portfolio
- `/#/roulette` - Ruleta de tareas interactiva

## License

MIT