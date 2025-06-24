import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import 'animate.css';

const historicalFigures = [
  {
    name: 'Manuel Belgrano',
    image: '/img/historia-belgrano.webp',
    description: 'Abogado, economista, periodista, político, diplomático y militar argentino. Fue uno de los principales patriotas que impulsó la Revolución de Mayo y la independencia de las Provincias Unidas del Río de la Plata. Creador de la bandera argentina y gran impulsor de la educación.',
    link: 'https://es.wikipedia.org/wiki/Manuel_Belgrano'
  },
  {
    name: 'José de San Martín',
    image: '/img/historia-sanmartin.webp',
    description: 'Militar y político argentino, libertador de Argentina, Chile y Perú. Es considerado uno de los libertadores más importantes de Sudamérica y un símbolo de la independencia.',
    link: 'https://es.wikipedia.org/wiki/Jos%C3%A9_de_San_Mart%C3%ADn'
  },
  {
    name: 'Mariano Moreno',
    image: '/img/historia-mmoreno.webp',
    description: 'Abogado, periodista y político de las Provincias Unidas del Río de la Plata. Fue uno de los ideólogos de la Revolución de Mayo y defensor de la libertad de prensa y la educación.',
    link: 'https://es.wikipedia.org/wiki/Mariano_Moreno'
  },
  {
    name: 'Juan Bautista Alberdi',
    image: '/img/historia-alberdi.webp',
    description: 'Jurista, economista, político, escritor y músico argentino. Autor intelectual de la Constitución Argentina de 1853 y gran defensor de la organización nacional.',
    link: 'https://es.wikipedia.org/wiki/Juan_Bautista_Alberdi'
  },
  {
    name: 'Domingo Faustino Sarmiento',
    image: '/img/historia-sarmiento.webp',
    description: 'Político, escritor, docente, periodista y militar argentino. Presidente de la Nación Argentina entre 1868 y 1874. Impulsor de la educación pública y la modernización del país.',
    link: 'https://es.wikipedia.org/wiki/Domingo_Faustino_Sarmiento'
  },
  {
    name: 'Julio Argentino Roca',
    image: '/img/historia-roca.webp',
    description: 'Militar y político argentino, presidente de la Nación Argentina en dos oportunidades. Protagonista de la consolidación territorial y la modernización del Estado.',
    link: 'https://es.wikipedia.org/wiki/Julio_Argentino_Roca'
  },
  {
    name: 'Facundo Quiroga',
    image: '/img/historia-quiroga.webp',
    description: 'Caudillo y militar argentino, uno de los principales líderes federales durante las guerras civiles argentinas. Defensor de la autonomía provincial y la justicia social.',
    link: 'https://es.wikipedia.org/wiki/Facundo_Quiroga'
  },
  {
    name: 'Martín Miguel de Güemes',
    image: '/img/historia-mguemes.webp',
    description: 'Militar y político argentino que cumplió una destacada actuación en la Guerra de la Independencia Argentina. Líder de la resistencia en el norte y símbolo de la lucha popular.',
    link: 'https://es.wikipedia.org/wiki/Mart%C3%ADn_Miguel_de_G%C3%BCemes'
  },
  {
    name: 'Nuestra Historia',
    image: '/img/historia-panzaverde.webp',
    description: `En Librería Panza Verde, sabemos que el regreso a clases y el trabajo diario pueden ser un desafío económico. Por eso, hemos creado un espacio donde encontrarás todo lo que necesitas para equipar tu escuela u oficina, con la mejor atención personalizada y precios accesibles.

Somos más que una tienda de insumos. Somos un equipo de personas comprometidas con brindarte un servicio ágil y de calidad. Entendemos tus necesidades y te ofrecemos soluciones prácticas y eficientes.

En esta tienda encontrarás una amplia variedad de artículos escolares y de oficina, desde lápices y cuadernos hasta resmas de papel y equipos de impresión. Trabajamos con las mejores marcas y te ofrecemos productos de calidad que te ayudarán a alcanzar tus metas.

Pero lo más importante es que aquí te sentirás como en casa. Te recibiremos con una sonrisa y te brindaremos la atención que te mereces. Queremos ser tu aliado en este camino y ayudarte a ahorrar tiempo y dinero.

¡Visítanos y descubre la diferencia de comprar en Librería Panza Verde!`,
    link: '#'
  }
];

const History = () => (
  <div className="container mt-4">
    <h1>Historia</h1>
    <p>
      Somos una librería con años de trayectoria en la ciudad, comprometidos con la educación y el arte. Ofrecemos productos de calidad y atención personalizada.
    </p>
  </div>
);

export default History; 