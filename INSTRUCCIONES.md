# Web de Pablo Román Baro — Instrucciones

Portafolio de director de fotografía. Dominio: **pabloromandop.com**. Web estática (HTML, CSS y JavaScript), sin plataforma ni base de datos. Se publica en Netlify y se conecta a un dominio propio.

## Cómo está organizada

```
index.html          Página de inicio (rejilla de proyectos y filtro)
project.html        Plantilla de página de proyecto (se rellena sola con los datos)
contact.html        Página de contacto (foto, email, teléfono y redes)
css/style.css       Todo el diseño: colores, tipografía, rejilla y efectos
js/projects.js      DATOS: info de contacto y lista de proyectos  ← lo que se edita
js/main.js          Lógica de la página de inicio (filtro, círculo del cursor, enfoque en móvil)
js/project.js       Lógica de las páginas de proyecto (créditos, vídeo de Vimeo, flechas)
img/<proyecto>/     Fotogramas de cada proyecto (01.jpg, 02.jpg…)
img/contact/        Foto de la página de contacto (pablo.jpg)
favicon.svg         Icono de la pestaña del navegador
```

Cada proyecto se abre en `project.html?p=<slug>`, por ejemplo `project.html?p=munya`.

## Añadir un proyecto nuevo

1. **Prepara las imágenes.** Fotogramas en JPG, sin bandas negras, de unos 1600 px de ancho (entre 100 y 300 KB cada uno). Nómbralos `01.jpg`, `02.jpg`, `03.jpg`…
2. **Crea su carpeta** dentro de `img/`, con un nombre en minúsculas, sin tildes ni espacios (por ejemplo `img/nuevo-proyecto/`), y mete ahí las imágenes.
3. **Añade una entrada en `js/projects.js`**, dentro de la lista `PROJECTS`, en la posición donde quieras que aparezca:

```js
{
  slug: "nuevo-proyecto",          // igual que el nombre de la carpeta
  title: "Marca — Título",
  category: "Commercial",           // Commercial, Fashion, Narrative o Music
  director: "Nombre Director",      // opcional
  artist: "Nombre Artista",         // opcional, para videoclips
  subtitle: "For Inditex",          // opcional, sustituye a la línea del director
  vimeo: "1234567890",              // solo el número del enlace de Vimeo
  cover: "02",                      // imagen de portada en la página de inicio
  hero: "01",                       // imagen grande con el botón de play
  heroPosition: "50% 100%",         // opcional: encuadre de la imagen grande
  stills: ["02", "03", "04"],       // galería, en este orden
  ratio: "16 / 9",                  // proporción de la galería
  credits: [
    ["Director", "Nombre Director"],
    ["Client", "Cliente"],
    ["Cinematography", "Pablo Román Baro"]
  ]
},
```

4. **Vuelve a publicar** (ver más abajo).

Para **quitar** un proyecto, borra su entrada en `projects.js` (y su carpeta de imágenes si ya no la necesitas). Para **reordenar**, mueve las entradas: el orden de la lista es el de la página de inicio y el de las flechas anterior / siguiente.

## Cambiar otras cosas

- **Email, teléfono, Instagram, Vimeo o ciudad:** al principio de `js/projects.js`, en `SITE`. Se actualizan solos en toda la web.
- **Imagen al compartir el enlace** (WhatsApp, redes…): es la foto de contacto, definida en las etiquetas `og:image` al principio de `index.html`, `project.html` y `contact.html`. Usa siempre la dirección completa (https://pabloromandop.com/…).
- **Foto de contacto:** sustituye `img/contact/pablo.jpg` por otra con el mismo nombre (mejor en vertical).
- **Créditos de un proyecto:** en su lista `credits`. Cada línea es `["Etiqueta", "Nombre"]`.
- **Diseño (colores, tamaños, efectos):** en `css/style.css`. Los colores están arriba del todo, en `:root`.
- **Intensidad del desenfoque:** busca `blur(4px)` en `css/style.css` y el `4` en `js/main.js`.
- **Intensidad del zoom al pasar el cursor:** el `scale(1.12)` de `.card:hover .still img` en `css/style.css` (la imagen en reposo está a `1.06`).
- **Tamaño del círculo del cursor:** los valores `80px`, `160px` y `280px` de `.lens` en `css/style.css`.

## Publicar en Netlify

**Primera vez**

1. Crea una cuenta gratuita en netlify.com.
2. En el panel, entra en **Add new site → Deploy manually**.
3. Arrastra la carpeta completa de la web (la que contiene `index.html`). En unos segundos estará en línea con una dirección provisional del tipo `nombre.netlify.app`.
4. En **Domain management**, añade tu dominio y sigue los pasos para conectarlo (Netlify te indica qué registros configurar en la web donde compraste el dominio). El certificado de seguridad (https) se activa solo.

**Cada actualización**

1. Haz los cambios en tu copia de la carpeta.
2. En Netlify, entra en tu sitio → **Deploys** y arrastra la carpeta actualizada a la zona de subida.

## Vimeo

- Los vídeos se reproducen dentro de la web con el reproductor de Vimeo al pulsar el botón de play.
- En la configuración de privacidad de cada vídeo en Vimeo, la opción de **incrustar** debe permitir mostrarlo en otras webs (o al menos en tu dominio). Si no, el reproductor no se verá.

## Comportamiento de la web (para tener en cuenta al modificarla)

- **Ordenador:** portadas desenfocadas; al pasar el cursor la imagen hace un zoom suave, aparece un círculo nítido que sigue al cursor, la imagen se oscurece un poco y aparece el título centrado.
- **Móvil:** la imagen que cruza el centro de la pantalla se ve nítida, se oscurece un poco y muestra su título; las demás se desenfocan según se alejan.
- **Páginas de proyecto:** en ordenador, flechas izquierda/derecha sobre el vídeo (o las del teclado) para ir al anterior o siguiente. En móvil no hay flechas: se cambia de proyecto deslizando el dedo a izquierda o derecha. La navegación es circular.
