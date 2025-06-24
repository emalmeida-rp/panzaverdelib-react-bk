import { useEffect, useState } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

const Contact = () => (
  <div className="container mt-4">
    <h1>Contacto</h1>
    <p>Puedes comunicarte con nosotros a través del siguiente correo: <a href="mailto:info@panzaverde.com">info@panzaverde.com</a></p>
    <p>O visitarnos en nuestra sucursal de lunes a viernes de 9 a 18 hs.</p>
  </div>
);

export default Contact; 