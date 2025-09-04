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
  const [genresData, setGenresData] = useState({}); // ✨ Estado para os gêneros

  // ✅ Estado para controlar a opacidade da lista (transição visual)
  const [containerOpacity, setContainerOpacity] = useState(1);

  const containerRef = useRef();

  // 🎬 Função para buscar gêneros
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
    setContainerOpacity(0.7); // 🔥 Começa o fade out

    try {
      const res = await Api.get(`/movie/popular?page=${pageNumber}`);
      const data = res.data.results;
      setMoviesData(data);
      console.log(data);
      
      setTotalPages(Math.min(res.data.total_pages, 500));
    } catch (error) {
      console.error("Erro ao buscar filmes:", error);
      setMoviesData([]);
    } finally {
      setLoading(false);
      // ✅ Volta ao topo instantaneamente
      window.scrollTo({ top: 0, behavior: "instant" });
      // ✅ Depois de um pequeno delay, volta a opacidade
      setTimeout(() => {
        setContainerOpacity(1);
      }, 100); // Pequeno delay para o efeito ser visível
    }
  };

  // 🚀 Buscar gêneros apenas uma vez quando o componente monta
  useEffect(() => {
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
          ? Array.from({ length: 4 }).map((_, index) => (
              <SkeletonCard key={index} />
            ))
          : moviesData.map((movie, index) => (
              <motion.div
                key={`page-${page}-movie-${movie.id}`}
                style={{ width: '220px' }}
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
                  delay: Math.floor(index / 4) * 0.1, // Anima por linha
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
          color="primary"
          shape="rounded"
        />
      </Stack>
    </main>
  );
}

export default HomePage;