import { TextField, InputAdornment, IconButton } from "@mui/material";

import { Link } from "react-router-dom"

import { Search } from 'lucide-react';

import logo from "../../assets/lasmovie_icone10.png"


import styles from "./Header.module.css"

function Header() {
  return (
    <header className={styles.header_container}>
      <img src={logo} width={150} alt="LastMovie Logo" />
      <nav className={styles.navBar}>
        <ul className={styles.list_nav}>
          <li>
            <Link to="/">Início</Link>
          </li>
          <li>
            <Link to="/files">Filmes</Link>
          </li>
          <li>
            <Link to="/series">Séries</Link>
          </li>
          <li>
            <Link to="/favorites">Filmes Favoritos</Link>
          </li>
        </ul>
      </nav>
      <form role="search">
        <TextField
          placeholder="Buscar..."
          size="small"
          variant="outlined"
          slotProps={{
            input: {
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    edge="end"
                    sx={{
                      color: "#4b5563",
                      transition: "all .4s ease-in-out",
                      "&:hover": {
                        color: "#e9e3e3",
                        backgroundColor: "#e9e3e324"
                      },
                    }}
                  >
                    <Search size={19} />
                  </IconButton>
                </InputAdornment>
              ),
            },
          }}
        sx={{
          "& .MuiOutlinedInput-root": {
            borderRadius: "0.5rem",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            color: "#ffffff",
            "& fieldset": {
              borderColor: "#4b5563",
              transition: "border-color 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
            },
            "&:hover fieldset": {
              borderColor: "#4b5563",
            },
            "&.Mui-focused fieldset": {
              borderColor: "#e9e3e3",
              borderWidth: "0.5px",
              boxShadow: "0 0 0 4px rgb(84, 88, 95, 0.6)",
            },
            "&.Mui-error fieldset": {
              borderColor: "#ef4444",
            },
            "&.Mui-error.Mui-focused fieldset": {
              boxShadow: "0 0 0 3px rgba(239, 68, 68, 0.2)",
            },
          },
          "& .MuiOutlinedInput-input::placeholder": {
            color: "#9ca3af",
          },
        }}
      />
      </form>
    </header>
  );
}

export default Header