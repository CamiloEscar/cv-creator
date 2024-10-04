
# CV Generator

Este proyecto es una aplicación React que permite generar y previsualizar CVs en diferentes estilos y diseños. El usuario puede ingresar su información personal, experiencia, educación, habilidades y otros detalles para generar un CV profesional en una variedad de plantillas predefinidas.

## Estructura del Proyecto

El proyecto está dividido en los siguientes componentes:

### 1. **`CvTemplates.js`**
   Este archivo define las plantillas para los diferentes estilos de CV. Las plantillas disponibles son:

   - **Minimalista**: Diseño simple y limpio.
   - **Creativo**: Ideal para perfiles más artísticos.
   - **Corporativo**: Diseño profesional y formal.
   - **Tecnológico**: Enfocado en habilidades técnicas.

   Cada plantilla incluye varias variantes de estilo, como "Clásico", "Moderno", "Elegante", entre otros.

#### Funciones principales:
   - **`parseCV(text)`**: Divide el contenido de un CV en secciones como información personal, experiencia, educación, habilidades e idiomas.
   - **`templateStyles`**: Objeto que contiene los estilos y variantes de cada plantilla.
   - Plantillas específicas como `MinimalistaTemplate`, `CreativoTemplate`, `CorporativoTemplate`, y `TecnologicoTemplate` para renderizar los CVs.

### 2. **`CvForm.js`**
   Este archivo gestiona la interfaz para que el usuario ingrese sus datos, seleccione un diseño y estilo, y previsualice el CV.

#### Funciones principales:
   - **Diseños disponibles**: El usuario puede seleccionar entre los estilos "Minimalista", "Creativo", "Corporativo", o "Tecnológico".
   - **A4Preview**: Componente para mostrar la previsualización del CV en formato A4.
   - **`generateCV()`**: Función para generar el contenido del CV usando un modelo de lenguaje. 
   - **Gestión de pestañas**: Permite cambiar entre las pestañas de contenido y estilos para la configuración del CV.
   - **Control de errores**: Muestra mensajes de error cuando faltan datos o hay un problema al generar el CV.

## Instalación

1. Clona este repositorio:
   ```bash
   git clone https://github.com/tu-usuario/cv-generator.git
   ```
2. Instala las dependencias:
   ```bash
   npm install
   ```
3. Inicia la aplicación:
   ```bash
   npm start
   ```

## Uso

1. Selecciona uno de los diseños disponibles en la pantalla principal.
2. Ingresa la información necesaria para tu CV, incluyendo experiencia, educación, habilidades, y más.
3. Selecciona el estilo que prefieras (Clásico, Moderno, etc.).
4. Previsualiza tu CV en formato A4.
5. (Opcional) Genera tu CV final usando el modelo de lenguaje y descárgalo o imprímelo.

## Estilos y Plantillas

Cada diseño tiene diferentes estilos predefinidos. Aquí una descripción de cada uno:

### Minimalista
   - Clásico
   - Moderno
   - Elegante

### Creativo
   - Vibrante
   - Artístico
   - Innovador

### Corporativo
   - Ejecutivo
   - Profesional
   - Empresarial

### Tecnológico
   - Digital
   - Futurista
   - Técnico

## Tecnologías Usadas

- **React**: Para el desarrollo de la interfaz de usuario.
- **Tailwind CSS**: Para los estilos y diseño responsive.
- **Fetch API**: Para realizar peticiones a un backend y generar el CV usando un modelo de lenguaje.
- **JavaScript (ES6)**: Lógica del proyecto y funciones personalizadas.

## Personalización

Puedes modificar los estilos o agregar nuevas plantillas en el archivo `CvTemplates.js`. La estructura de cada plantilla sigue un diseño simple que incluye:
   - **Secciones**: Como experiencia, educación, habilidades, etc.
   - **Estilos**: Puedes cambiar la fuente, colores, y más a través de los objetos `templateStyles`.

## Licencia

Este proyecto está bajo la licencia MIT. Puedes ver más detalles en el archivo `LICENSE`.
