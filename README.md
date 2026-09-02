# Aequitas Jurídica — Presentación

Presentación de la actividad *Eligiendo mi idea de negocio* (Comercial I, Corporación Universitaria Republicana).
HTML, CSS y JavaScript sin dependencias ni proceso de compilación.

## Estructura de carpetas

```
aequitas-juridica/
├── index.html          # marcado y contenido de las diapositivas
├── css/
│   └── styles.css      # sistema de diseño completo
├── js/
│   └── script.js       # navegación, índice, gestos táctiles
└── images/
    └── favicon.svg      # ícono de pestaña (monograma "A")
```

`index.html` debe seguir en la raíz para que GitHub Pages lo sirva; las demás carpetas se referencian con rutas relativas (`css/styles.css`, `js/script.js`, `images/...`), así que **hay que subir la carpeta completa**, no solo `index.html`.

## Publicar en GitHub Pages

1. Crea un repositorio en GitHub, por ejemplo `aequitas-juridica`.
2. Sube todo el contenido de la carpeta (`index.html`, `README.md`, `css/`, `js/`, `images/`) a la raíz del repositorio (arrástralo en *Add file → Upload files*, o por consola):

   ```bash
   git init
   git add .
   git commit -m "Presentación Aequitas Jurídica"
   git branch -M main
   git remote add origin https://github.com/USUARIO/aequitas-juridica.git
   git push -u origin main
   ```

3. En el repositorio: **Settings → Pages**.
4. En *Source* elige **Deploy from a branch**, rama `main`, carpeta `/ (root)`, y guarda.
5. Espera un minuto. Queda publicada en:
   `https://USUARIO.github.io/aequitas-juridica/`

El archivo debe llamarse exactamente `index.html` y estar en la raíz; de lo contrario Pages muestra un 404.

## Controles

| Acción | Tecla |
|---|---|
| Avanzar | `→` `↓` `Espacio` `AvPág` |
| Retroceder | `←` `↑` `RePág` |
| Primera / última | `Inicio` / `Fin` |
| Pantalla completa | `F` |
| Índice de diapositivas | `I` (cerrar con `Esc`) |

En móvil o tablet se navega deslizando el dedo.

## Exportar a PDF

`Ctrl + P` → destino *Guardar como PDF* → orientación **horizontal** → activar *Gráficos de fondo*.
Cada diapositiva sale en una página.

## Enlazar una diapositiva

La URL guarda el número: `.../index.html#6` abre directamente la propuesta de valor.

## Qué editar

- **Colores y tipografías**: bloque `:root` al inicio de `css/styles.css`.
- **Contenido**: cada diapositiva es un `<section class="slide">` en `index.html`, comentado con su número y tema.
- **Nombre del autor**: aparece en la portada (diapositiva 1) y en el cierre (diapositiva 9).
- **Añadir una diapositiva**: copia un `<section class="slide">` completo y pégalo donde corresponda. El contador, la barra de progreso y el índice se actualizan solos.

Las clases `slide--oscura` y `slide--niebla` cambian el fondo; sin ninguna de las dos, la diapositiva queda sobre papel claro.
