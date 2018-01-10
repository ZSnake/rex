import React from 'react';
import classNames from 'classnames';
import colorStrip from '../imgs/color-strip.svg';
import pizzaImg from '../imgs/pizza.jpg';
import chickenImg from '../imgs/chicken.jpg';
import parfaitImg from '../imgs/parfait.jpg';
import saladImg from '../imgs/salad.jpg';
import hkLogo from '../imgs/hk-logo.svg';

const Home = () => (
  <div>
    <header>
      <h1 className="hk-logo">Tasty & Delicious</h1>
    </header>
    <img src={colorStrip} alt="" className="color-strip" />
    <section className="intro-block">
      <h2 className="green">Healthy & Delicious</h2>
      <h3 className="orange">Ahora en Tegus</h3>
      <p className="olive">Con nuestro variado menú cuidadosamente diseñado para que mantengás la linea podrás comer sanamente; sin sacrificios.</p>
    </section>
    <section className="featured-block bg-dark">
      <div className="thumbnail">
        <img src={pizzaImg} alt="Pizza" />
      </div>
      <div className="desc bg-dark align-lt">
        <h3 className="green">Comé sin Culpa</h3>
        <p className="olive">Con una variedad de platillos diseñados para que no pasés hambre y al mismo tiempo podás comer un platillo nutritivo y saludable; estar a dieta no es sinónimo de sufrimiento.</p>
      </div>
    </section>
    <section className="featured-block bg-green">
      <div className="desc bg-green align-rt">
        <h3 className="white">Saludable no es sólo Ensaladas</h3>
        <p className="white">Desde hamburguesas hasta postres, nuestro variado menu esta especialmente diseñado para que siempre comás variado y saludable sin quedar con hambre.</p>
      </div>
      <div className="thumbnail">
        <img src={chickenImg} alt="Chicken" />
      </div>
    </section>
    <section className="featured-block bg-cream align-lt">
      <div className="thumbnail">
        <img src={parfaitImg} alt="Parfait" />
      </div>
      <div className="desc bg-cream">
        <h3 className="orange">Nutrition Facts</h3>
        <p className="soil">Nuestros platillos estan cuidadosamente diseñados y su informacion nutricional te será detallada para que siempre sepas <b>exactamente</b> lo que estas comiendo</p>
      </div>
    </section>
    <section className="featured-block bg-khaki">
      <div className="desc align-rt">
        <h3 className="forest">Hacer Dieta es también Romperla</h3>
        <p className="soil">Para esos merecidos días donde decidís romper la dieta, tenemos deliciosas opciones, desde platillos fuertes hasta postres, para que tengás una deliciosa alternativa.</p>
      </div>
      <div className="thumbnail">
        <img src={saladImg} alt="Ensalada" />
      </div>
    </section>
    <footer className="footer bg-dark featured-block">
      <div className="thumbnail footer-logo">
        <img src={hkLogo} alt="Logo" />
      </div>
      <div className='desc align-lf'>
        <h3 className="green">Ubicanos</h3>
        <p className="olive">Metrópolis</p>
        <p className="olive">Torre #1</p>
        <p className="olive">Segundo piso</p>
        <p className="olive">Local C212, entre Nativo y Bistro</p>
        <p>
          <a href="https://fb.me/healthkitchenhn"><i className={classNames('fa fa-facebook-square fa-2x sn-icon')}></i></a>
          <a href="https://www.instagram.com/healthkitchenhn/"><i className={classNames('fa fa-twitter-square fa-2x sn-icon')}></i></a>
          <a href="https://twitter.com/healthkitchenhn/"><i className={classNames('fa fa-instagram fa-2x sn-icon')}></i></a>
        </p>
      </div>
    </footer>
    <img src={colorStrip} alt="" className="color-strip" />
  </div>
);

export default Home;
