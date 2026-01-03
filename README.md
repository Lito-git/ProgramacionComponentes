# Gestor de Proyectos y Tareas

## Descripción

Proyecto desarrollado en **React** para la gestión de proyectos y tareas.

Permite la creación, visualización y eliminación de proyectos y tareas, integrando **Firebase** como base de datos para almacenamiento persistente.

Incluye validaciones de formularios mediante **SimpleReactValidator**, navegación entre módulos con **React Router DOM**, y consumo de datos desde APIs simuladas con **axios** para complementar la información de los elementos.

## Tecnologías utilizadas
- **React 18** (Hooks, componentes funcionales)
- **Firebase** (Firestore para almacenamiento y reglas de seguridad)
- **React Router DOM** (para enrutamiento entre módulos)
- **Axios** (para consumir API simulada)
- **SimpleReactValidator** (validación de formularios)
- **JavaScript ES6+**
- **CSS** (estilos mínimos para interfaz clara)

## Requisitos

- Node.js >= 22.18.0
- npm
- Cuenta de Firebase (para base de datos y configuración)

## Instalación

1. Clonar el repositorio:
```bash
   git clone <URL_DEL_REPOSITORIO>
```

2. Instalar dependencias:
```bash
   npm install
```

3. Ejecutar el proyecto:
```bash
   npm run dev
```

## Estructura del proyecto
```
gestores/
│
├── src/
│   ├── components/
│   │   ├── common/          # Componentes globales reutilizables (Navbar, HeaderTitle)
│   │   ├── projects/        # Componentes del CASO I (AddProjectBtn, ProjectForm, ProjectList, ProjectItem)
│   │   └── tasks/           # Componentes del CASO II (AddTaskBtn, TaskForm, TaskList, TaskItem)
│   │
│   ├── pages/
│   │   ├── ProjectsPage.jsx # Vista principal del CASO I
│   │   └── TasksPage.jsx    # Vista principal del CASO II
│   │
│   ├── router/
│   │   └── AppRouter.jsx    # Sistema de enrutamiento de la aplicación
│   │
│   ├── firebase.js          # Configuración e inicialización de Firebase
│   └── App.jsx              # Componente principal que integra el AppRouter
│
├── package.json
└── README.md
```

## Funcionamiento de la aplicación

### CASO I: Gestión de Proyectos

- Visualiza los proyectos existentes en la colección `projects`.
- Permite agregar un proyecto mediante un formulario con validaciones (nombre obligatorio y descripción mínima de 10 caracteres).
- Permite eliminar proyectos con confirmación de seguridad antes de borrar.
- Los proyectos se almacenan en la colección `projects` de Firestore.

### CASO II: Gestión de Tareas

- Visualiza las tareas existentes en la colección `tasks`
- Permite agregar tareas con nombre, fecha límite (válida desde hoy en adelante) y prioridad generada desde API simulada.
- Permite eliminar tareas con confirmación de seguridad antes de borrar.
- Las tareas se almacenan en la colección `tasks` de Firestore.

## Integración con Firebase

- Se creó un proyecto en Firebase, se registró la aplicación y se configuró Firestore.
- Se creó el archivo `firebase.js` con la configuración de la API key y la inicialización de Firestore.
- Se establecieron reglas de seguridad para permitir únicamente operaciones en las colecciones `projects` y `tasks`.

## Limitaciones

- Debido a la cuenta gratuita de Firebase (Spark), no se pueden desplegar funciones Cloud (onCall).
- Se incluyó una plantilla de función Cloud para eliminación de documentos, lista para desplegar en cuentas Blaze.

## Ejecución de pruebas

1. Ejecutar el proyecto con `npm run dev`.
2. Probar la creación de proyectos/tareas y validar que no se permiten formularios vacíos.
3. Verificar que los elementos agregados se almacenan correctamente en Firestore.
4. Probar la eliminación de proyectos/tareas y confirmar que se muestra la alerta de confirmación.
5. Confirmar que las colecciones `projects` y `tasks` se crean y actualizan correctamente en Firestore.

## Futuras mejoras

- Desplegar funciones Cloud usando Firebase onCall con cuenta Blaze.
- Mejorar diseño y estilos de la interfaz.
- Agregar autenticación de usuarios para controlar el acceso a proyectos y tareas.
