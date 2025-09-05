import { useEffect, useState, useRef } from "react";
import { motion } from "motion/react";
import { Pagination, Stack } from "@mui/material";
import styles from "./HomePage.module.css";
import Api from "../../services/Api";
import CardMovie from "../../components/CardMovie/CardMovie";
import SkeletonCard from "../../components/SkeletonCard/SkeletonCard";

function HomePage() {
  const [moviesData, setMoviesData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [genresData, setGenresData] = useState({});

  const [containerOpacity, setContainerOpacity] = useState(1);
  const containerRef = useRef();

  // Tempo mínimo de exibição do skeleton (em milissegundos)
  const MIN_LOADING_TIME = 700;

  const fetchGenres = async () => {
    try {
      const res = await Api.get('/genre/movie/list');
      const genresMap = {};
      res.data.genres.forEach(genre => {
        genresMap[genre.id] = genre.name;
      });
      setGenresData(genresMap);
    } catch (error) {
      console.error("Erro ao buscar gêneros:", error);
    }
  };

  const fetchMovies = async (pageNumber) => {
    setLoading(true);
    setContainerOpacity(0.7);

    const startTime = Date.now(); // Marca o início da requisição

    try {
      const res = await Api.get(`/movie/popular?page=${pageNumber}`);
      const data = res.data.results;
      setMoviesData(data);
      setTotalPages(Math.min(res.data.total_pages, 500));
    } catch (error) {
      console.error("Erro ao buscar filmes:", error);
      setMoviesData([]);
    } finally {
      window.scrollTo({ top: 0, behavior: "instant" });

      // Calcula quanto tempo já se passou
      const elapsedTime = Date.now() - startTime;
      // Calcula quanto tempo ainda precisa esperar para cumprir o mínimo
      const remainingTime = Math.max(0, MIN_LOADING_TIME - elapsedTime);

      // Só então desativa o skeleton e restaura a opacidade
      setTimeout(() => {
        setLoading(false);
        setContainerOpacity(1);
      }, remainingTime);
    }
  };

  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }

    window.scrollTo({ top: 0, behavior: "instant" });

    fetchGenres();
  }, []);

  useEffect(() => {
    fetchMovies(page);
  }, [page]);

  const handleChange = (_, value) => {
    setPage(value);
  };

  return (
    <main className={styles.home_container}>
      {/* Container com transição de opacidade controlada por estado */}
      <div
        ref={containerRef}
        className={styles.cardmovie_container}
        style={{
          opacity: containerOpacity,
          transition: "opacity 0.3s ease-in-out",
        }}
      >
        {loading
          ? Array.from({ length: 10 }).map((_, index) => (
              <SkeletonCard key={index} />
            ))
          : moviesData.map((movie, index) => (
              <motion.div
                key={`page-${page}-movie-${movie.id}`}
                style={{ width: "220px" }}
                initial={{
                  opacity: 0,
                  y: 15,
                  filter: "blur(3px)",
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                  filter: "blur(0px)",
                }}
                viewport={{
                  once: true,
                  amount: 0.1,
                  margin: "50px 0px 100px 0px",
                }}
                transition={{
                  duration: 0.6,
                  delay: Math.floor(index / 4) * 0.1,
                  ease: "easeOut",
                }}
              >
                <CardMovie movie={movie} genres={genresData} />
              </motion.div>
            ))}
      </div>

      <Stack spacing={2} alignItems="center" sx={{ mt: 3, mb: 5 }}>
        <Pagination
          count={totalPages}
          page={page}
          onChange={handleChange}
          sx={{
            "& .MuiPaginationItem-root": {
              color: "#d32f2f",
              borderRadius: "8px",
              border: "1px solid transparent",
              fontWeight: 600
            },
            "& .Mui-selected": {
              backgroundColor: "#d32f2f",
              color: "white",
              fontWeight: "bold",
            },
            "& .MuiPaginationItem-root:hover": {
              backgroundColor: "rgba(211, 47, 47, 0.08)",
              borderColor: "rgba(211, 47, 47, 0.3)",
            },
            "& .MuiPaginationItem-previousNext": {
              color: "#d32f2f",
              "&:hover": {
                backgroundColor: "rgba(211, 47, 47, 0.08)",
              },
            },
          }}
          shape="rounded"
        />
      </Stack>
    </main>
  );
}

export default HomePage;