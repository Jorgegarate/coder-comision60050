
# Proyecto JorgeShop

Este es un proyecto de tienda en línea construido con **React** y **Vite**, usando **Firebase** para la gestión de datos, **React Icons** para iconos, y **Sass** para los estilos.

## Requisitos Previos

- **Node.js** y **npm** instalados. Verifica con:

  ```bash
  node -v
  npm -v
  ```

- **Firebase**: crea un proyecto en [Firebase](https://console.firebase.google.com/) para habilitar la base de datos.

## Instalación

1. **Clona el repositorio**:

   ```bash
   git clone https://github.com/Jorgegarate/coder-comision60050.git
   cd al proyecto
   ```

2. **Configura el proyecto con Vite**:

   ```bash
   npm create vite@latest . -- --template react
   ```

3. **Instala las dependencias**:

   ```bash
   npm install
   ```

4. **Inicia el servidor de desarrollo**:

   ```bash
   npm run dev
   ```

## Configuración de Firebase

1. **Crea un proyecto en Firebase** y añade una aplicación web.

2. **Instala Firebase**:

   ```bash
   npm install firebase
   ```
3. **Configura la base de datos** Altualmente la base de datos se encuetra configurada pero si deseas conectar tu propia base de datos puedes poblar con la siguiente url. /date por ejemplo http://localhost:5173/date

## Instalación de Sass

1. **Instala Sass** para estilos avanzados:

   ```bash
   npm install sass
   ```

2. Crea tus archivos de estilo con la extensión `.scss` y asegúrate de importarlos en tus componentes. Ejemplo de estructura de carpetas para Sass:

   ```plaintext
   src/
   ├── styles/
   │   ├── _variables.scss
   │   ├── _mixins.scss
   │   └── main.scss
   └──styless.scss 


## Integración de React Icons

1. **Instala React Icons**:

   ```bash
   npm install react-icons
   ```

2. Puedes consultar la biblioteca de iconos en [React Icons](https://react-icons.github.io/react-icons/) para elegir y usar los iconos que necesites en tu proyecto.

## Configuración de Rutas con React Router

1. **Instala React Router**:

   ```bash
   npm install react-router-dom
   ```

2. **Define tus rutas** en `App.js` para manejar la navegación entre páginas como la principal, detalles de producto y carrito.

## Conclusión

Este proyecto configura una base para una tienda en línea con **React**, **Vite**, **Firebase**, **React Icons** y **Sass**.

## Recursos Adicionales

- [Documentación de Vite](https://vitejs.dev/guide/)
- [Documentación de Firebase](https://firebase.google.com/docs)
- [React Icons](https://react-icons.github.io/react-icons/)
- [Sass](https://sass-lang.com/)