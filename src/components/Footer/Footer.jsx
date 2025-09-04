import { LuFacebook, LuYoutube  } from "react-icons/lu";
import { FaXTwitter } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa";

import { MdOutlineEmail } from "react-icons/md";
import { FiPhone } from "react-icons/fi";
import { IoLocationOutline } from "react-icons/io5";

import logo from "../../assets/lasmovie_icone10.png"

import Divider from '@mui/material/Divider';

import styles from "./Footer.module.css";

function Footer() {
  return (
    <footer className={styles.footer_container}>
      <div>
        <section className={styles.footer_header}>
          <img src={logo} width={150} alt="LastMovie Logo" />
          <p>Sua plataforma de streaming favorita com os melhores filmes e séries.</p>
          <div>
            <a href="https://www.facebook.com">
              <LuFacebook size={22} className={styles.social_icon}/>
            </a>
            <a href="https://www.x.com">
              <FaXTwitter size={22} className={styles.social_icon} />
            </a>
            <a href="https://www.instagram.com">
              <FaInstagram size={22} className={styles.social_icon}/>
            </a>
            <a href="https://www.youtube.com">
              <LuYoutube size={25} className={styles.social_icon}/>
            </a>
          </div>
        </section>
        <section className={styles.footer_navigation}>
          <h3>Navegação</h3>
          <nav>
            <ul>
              <li><a href="#">Início</a></li>
              <li><a href="#">Filmes</a></li>
              <li><a href="#">Séries</a></li>
              <li><a href="#">Minha Lista</a></li>
              <li><a href="#">Novidades</a></li>
            </ul>
          </nav>
        </section>
        <section className={styles.footer_support}>
          <h3>Suporte</h3>
          <nav>
            <ul>
              <li><a href="#">Central de Ajuda</a></li>
              <li><a href="#">Contato</a></li>
              <li><a href="#">Planos</a></li>
              <li><a href="#">Dispositivos</a></li>
              <li><a href="#">FAQ</a></li>
            </ul>
          </nav>
        </section>
        <section className={styles.footer_contact}>
          <h3>Contato</h3>
          <nav>
            <ul>
              <li><MdOutlineEmail size={18} color="red" /> contato@lastmovie.com</li>
              <li><FiPhone size={18} color="red" /> 0800 123 4567</li>
              <li><IoLocationOutline size={18} color="red" /> Fortaleza, Brasil</li>
            </ul>
          </nav>
        </section>
      </div>
      <Divider style={{backgroundColor: "#E5E7EB", height: "0.5px", opacity: 0.2, marginBlock: "30px"}} />
      <section className={styles.footer_bottom}>
        <nav>
          <ul>
            <li><a href="#">Termos de Uso</a></li>
            <li><a href="#">Política de Privacidade</a></li>
            <li><a href="#">Cookies</a></li>
            <li><a href="#">Acessibilidade</a></li>
          </ul>
        </nav>
        <p>&copy; 2025 LastMovie. Todos os direitos reservados.</p>
      </section>
    </footer>
  )
}

export default Footer