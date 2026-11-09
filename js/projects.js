/*
  ============================================================
  DATOS DE LA WEB — este es el único archivo que hay que tocar
  para añadir, quitar o cambiar proyectos.
  ============================================================

  - El orden de la lista es el orden en la página de inicio
    y el de las flechas anterior / siguiente.
  - Las imágenes de cada proyecto van en  img/<slug>/
    (por ejemplo img/munya/01.jpg). Aquí solo se escribe el número.
  - category: "Commercial", "Fashion", "Narrative" o "Music".
    Las categorías sin proyectos no aparecen en el filtro.
  - heroPosition (opcional): qué parte de la imagen grande se ve si
    se recorta, por ejemplo "50% 100%" = centrada y pegada abajo,
    "50% 0%" = pegada arriba. Por defecto, centrada.
  - ratio: proporción de los fotogramas de la galería
    (por ejemplo "16 / 9", "4 / 3", "2 / 1", "3 / 2").
*/

window.SITE = {
  name: "Pablo Román Baro",
  role: "Cinematographer — Madrid",
  email: "info.pabloroman98@gmail.com",
  phone: "+34 634 439 040",
  instagram: "https://www.instagram.com/pabloroman98/",
  vimeo: "https://vimeo.com/pabloroman",
  basedIn: "Madrid — available worldwide"
};

window.PROJECTS = [
  {
    slug: "munya",
    title: "Munya — Raíces",
    category: "Commercial",
    director: "Álvaro Delgado",
    vimeo: "1244387871",
    cover: "01",
    hero: "03",
    heroPosition: "50% 100%",
    stills: ["01", "02", "04", "05", "06", "07"],
    ratio: "4 / 3",
    credits: [
      ["Director", "Álvaro Delgado"],
      ["Client", "Munya"],
      ["Cinematography", "Pablo Román Baro"]
    ]
  },
  {
    slug: "skina",
    title: "Skina",
    category: "Commercial",
    director: "Pablo Román",
    vimeo: "1244388134",
    cover: "03",
    hero: "01",
    stills: ["03", "02", "05", "04", "06"],
    ratio: "16 / 9",
    credits: [
      ["Director", "Pablo Román Baro"],
      ["Client", "Skina"],
      ["Cinematography", "Pablo Román Baro"]
    ]
  },
  {
    slug: "gray-scale",
    title: "Gray Scale",
    category: "Fashion",
    director: "Estela Maram",
    vimeo: "1244386988",
    cover: "08",
    hero: "02",
    stills: ["01", "03", "04", "05", "06", "07", "08", "09", "10"],
    ratio: "16 / 9",
    credits: [
      ["Director", "Estela Maram"],
      ["Cinematography", "Pablo Román Baro"]
    ]
  },
  {
    slug: "oysho-london",
    title: "Inditex People — Oysho, London",
    category: "Commercial",
    subtitle: "For Inditex",
    vimeo: "1244386989",
    cover: "03",
    hero: "08",
    stills: ["03", "09", "05", "02", "06", "01"],
    ratio: "16 / 9",
    credits: [
      ["Client", "Inditex — Oysho"],
      ["Cinematography", "Pablo Román Baro"],
      ["Edit", "Adrián Sobrino"]
    ]
  },
  {
    slug: "la-tienda-inteligente",
    title: "La Tienda Inteligente",
    category: "Commercial",
    director: "Álvaro Delgado",
    vimeo: "1244387398",
    cover: "02",
    hero: "04",
    stills: ["03", "02", "01"],
    ratio: "1.55 / 1",
    credits: [
      ["Director", "Álvaro Delgado"],
      ["Client", "La Tienda Inteligente"],
      ["Cinematography", "Pablo Román Baro"],
      ["Colorist", "Jordi Ferrer"]
    ]
  },
  {
    slug: "madera",
    title: "Madera",
    category: "Commercial",
    director: "Lupe Figueiral",
    vimeo: "1244387528",
    cover: "01",
    hero: "04",
    stills: ["01", "03", "06", "05", "07", "02"],
    ratio: "1.48 / 1",
    credits: [
      ["Director", "Lupe Figueiral"],
      ["Client", "Las Setas de Sevilla"],
      ["Production", "Tropico Studio"],
      ["Cinematography", "Pablo Román Baro"],
      ["Colorist", "Edu Saenz"]
    ]
  },
  {
    slug: "t-amare",
    title: "T Amaré",
    artist: "Tony Grox & Lucy Calys",
    category: "Music",
    director: "Miguel Cintas",
    vimeo: "1244388233",
    cover: "01",
    hero: "03",
    stills: ["07", "04", "02", "01", "08", "05"],
    ratio: "2 / 1",
    credits: [
      ["Artist", "Tony Grox & Lucy Calys"],
      ["Director", "Miguel Cintas"],
      ["Cinematography", "Pablo Román Baro"]
    ]
  },
  {
    slug: "atenas-x-mahou",
    title: "Atenas x Mahou",
    category: "Commercial",
    director: "Maestus",
    vimeo: "1244386991",
    cover: "02",
    hero: "06",
    stills: ["02", "01", "05", "04", "03"],
    ratio: "16 / 9",
    credits: [
      ["Director", "Maestus"],
      ["Client", "Atenas Beach Club"],
      ["Cinematography", "Pablo Román Baro"]
    ]
  },
  {
    slug: "zara-home-poland",
    title: "Inditex People — Zara Home, Poland",
    category: "Commercial",
    subtitle: "For Inditex",
    vimeo: "1244392819",
    cover: "01",
    hero: "03",
    stills: ["01", "05", "02", "04", "06"],
    ratio: "16 / 9",
    credits: [
      ["Client", "Inditex — Zara Home"],
      ["Cinematography", "Pablo Román Baro"],
      ["Edit", "Adrián Sobrino"]
    ]
  },
  {
    slug: "bohemia",
    title: "Bohemia",
    artist: "Tony Grox & Curro",
    category: "Music",
    director: "Miguel Cintas",
    vimeo: "1244386987",
    cover: "04",
    hero: "05",
    stills: ["04", "08", "03", "09", "01", "07"],
    ratio: "3 / 2",
    credits: [
      ["Artist", "Tony Grox & Curro"],
      ["Director", "Miguel Cintas"],
      ["Cinematography", "Pablo Román Baro"]
    ]
  }
];
