import './css/about.css';
const AboutMe = () => {
  return (
    <>
      <div className='about__container'>
        <div className='about__avatar'>
          <img
            src='https://media-exp1.licdn.com/dms/image/C4D03AQEARhZPwe83cw/profile-displayphoto-shrink_800_800/0/1591309849751?e=1629331200&v=beta&t=oiAp-ZyTeZzwyTi2FBsVNP9B-hDI-R1zosdyL23XhV0'
            alt=''
          />
        </div>
        <div className='about__description'>
          <div className='description__text'>
            <p>
              Mi nombre es Martín dos Santos, comence hace un par de meses con
              Desarrollo Web, pero llevo programando un par de años en lenguajes
              tipo C++, C#. <br /> Éste es un proyecto personal, para tratar de
              implementar lo que vengo aprendiendo de Front-end. <br />{' '}
              Particularmente, está hecho con React y actualmente utilizando la
              API de{' '}
              <a href='https://developers.mercadolibre.com.ar/es_ar'>
                Mercadolibre
              </a>
              . En los proximos dias implementare el backend con MongoDB.
            </p>
          </div>
          <div className='about__links__icon'>
            <a href='https://github.com/facebook/react'>
              <i className='fab fa-react'></i>
            </a>
          </div>
        </div>
        <div className='about__links'>
          <div className='about__links__title'>
            <span>ALGUNOS ENLACES</span>
          </div>
          <div className='flex__row'>
            <div className='about__links__icon'>
              <a href='https://github.com/tinchods93'>
                <i className='fab fa-github-square'></i>
              </a>
            </div>
            <div className='about__links__icon'>
              <a href='https://www.linkedin.com/in/martin-e-dos-santos/'>
                <i className='fab fa-linkedin'></i>
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AboutMe;
