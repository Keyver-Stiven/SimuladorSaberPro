# 🎓 Simulador Saber PRO
Aplicación web interactiva para practicar y prepararse para las Pruebas Saber PRO en Colombia. Incluye simulacros de los 5 módulos principales con preguntas de práctica, temporizador, y seguimiento de progreso.

## 📋 Características
- **5 Módulos de Práctica:**
  - 📊 Razonamiento Cuantitativo
  - 📖 Lectura Crítica
  - 🤝 Competencias Ciudadanas
  - ✍️ Comunicación Escrita
  - 🌍 Inglés (con textos de lectura y traducción)
- **Modos de Estudio:**
  - **Práctica Rápida:** Elige un módulo específico (10 preguntas)
  - **Simulacro Completo:** Los 5 módulos seguidos (50 preguntas)
- **Funcionalidades:**
  - ⏱️ Temporizador por pregunta (60s normales, 120s para lecturas)
  - 📈 Estadísticas de desempeño
  - ✅ Explicaciones detalladas de respuestas
  - 💾 Historial de intentos guardado localmente
  - 🌐 Traducción de textos en inglés (selecciona texto para traducir)

## 🚀 Instalación y Configuración

### Requisitos Previos
- **Node.js** versión 18 o superior
- **npm** (viene con Node.js)

### Pasos de Instalación

1. **Clona o descarga el repositorio**

2. **Navega al directorio del proyecto:**
   
   > **Nota:** Ajusta la ruta según donde hayas descargado el repositorio en tu sistema.
   
   ```bash
   # En Windows:
   cd C:\ruta\del\proyecto\SimuladorSaberPro
   
   # En macOS/Linux:
   cd /ruta/del/proyecto/SimuladorSaberPro
   ```

3. **Instala las dependencias:**
   ```bash
   npm install
   ```

4. **Inicia el servidor de desarrollo:**
   ```bash
   npm run dev
   ```

5. **Abre tu navegador:**
   - El proyecto estará disponible en: `http://localhost:5173`
   - El puerto puede variar, revisa la consola para el URL exacto

## 🛠️ Tecnologías Utilizadas

- **Frontend:** React 18 + Vite
- **Enrutamiento:** React Router DOM
- **Estilos:** Tailwind CSS + Radix UI
- **Iconos:** Lucide React
- **Almacenamiento:** LocalStorage API

## 📂 Estructura del Proyecto

```
SimuladorSaberPro/
├── src/
│   ├── components/     # Componentes reutilizables
│   ├── pages/          # Páginas principales
│   ├── lib/            # Utilidades y funciones
│   ├── data/           # Preguntas y datos del simulador
│   └── App.jsx         # Componente principal
├── public/             # Archivos estáticos
└── package.json        # Dependencias del proyecto
```

## 🎯 Cómo Usar

1. **Desde la página principal**, selecciona:
   - Un módulo específico para práctica rápida
   - "Simulacro Completo" para todos los módulos

2. **Durante el simulacro:**
   - Lee cada pregunta y selecciona una respuesta
   - Usa el temporizador como guía (no es obligatorio)
   - Para inglés: selecciona texto para ver traducción

3. **Al finalizar:**
   - Revisa tus resultados y estadísticas
   - Lee las explicaciones de cada respuesta
   - Accede al historial desde el menú principal

## ⚙️ Personalización

### Agregar Más Preguntas
Edita los archivos en `src/data/` para agregar preguntas a cada módulo. Formato:

```javascript
{
  id: "MODULO_001",
  question: "Texto de la pregunta",
  options: ["Opción A", "Opción B", "Opción C", "Opción D"],
  correctAnswer: 0, // Índice de la respuesta correcta
  explanation: "Explicación detallada",
  reading_text: "Texto de lectura (opcional)"
}
```

### Cambiar Colores
Edita `src/index.css` para modificar las variables de color:

```css
:root {
  --primary: 221.2 83.2% 53.3%;
  --secondary: 210 40% 96.1%;
  /* ... más colores */
}
```

### Modificar Tiempo por Pregunta
En `src/pages/Quiz.jsx`, busca:

```javascript
const hasReadingText = question?.reading_text && question.reading_text.trim() !== '';
return hasReadingText ? 120 : 60; // Segundos
```

## 🐛 Solución de Problemas

### Error: "Cannot find module"
```bash
rm -rf node_modules package-lock.json
npm install
```

### El puerto 5173 ya está en uso
```bash
# Usa un puerto diferente
npm run dev -- --port 3000
```

### Los estilos no se aplican correctamente
```bash
# Reconstruye el proyecto
npm run build
npm run preview
```

## 📄 Licencia
Este proyecto es de código abierto y está disponible para uso educativo.

## 🤝 Contribuir
Las contribuciones son bienvenidas. Por favor:

1. Haz un fork del proyecto
2. Crea una rama para tu funcionalidad (`git checkout -b feature/nueva-funcionalidad`)
3. Haz commit de tus cambios (`git commit -m 'Agrega nueva funcionalidad'`)
4. Push a la rama (`git push origin feature/nueva-funcionalidad`)
5. Abre un Pull Request

## 📞 Soporte
Para preguntas o problemas, por favor abre un issue en el repositorio del proyecto.

---
**¡Buena suerte con tu preparación para el Saber PRO!** 🎯📚
