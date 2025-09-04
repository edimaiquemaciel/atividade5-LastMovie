import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Box, IconButton } from '@mui/material';
import { FaPlay } from "react-icons/fa";
import { MdFavoriteBorder } from "react-icons/md";
import { useState } from 'react';

const imageUrl = import.meta.env.VITE_IMG;

function CardMovie({movie, genres = {}}) {
  const [isHovered, setIsHovered] = useState(false);
  
  // Função para converter IDs dos gêneros em nomes
  const getGenreNames = () => {
    if (!movie.genre_ids || movie.genre_ids.length === 0) {
      return 'Sem gênero';
    }
    
    return movie.genre_ids
      .slice(0, 2) // Pega apenas os 2 primeiros gêneros
      .map(id => genres[id])
      .filter(Boolean) // Remove valores undefined
      .join(', ') || 'Carregando...';
  };

  // Função para extrair o ano da data de lançamento
  const getReleaseYear = () => {
    if (!movie.release_date) return 'N/A';
    return new Date(movie.release_date).getFullYear();
  };

  return (
    <>
      <Card 
        sx={{ 
          minWidth: 220, 
          maxHeight: 520, 
          position: "relative",
          cursor: "pointer"
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <CardMedia
          sx={{
            height: 330,
            objectFit: "contain"
          }}
          component="img"
          image={imageUrl + movie.poster_path}
          alt={movie.title}
          title={movie.title}
        />
        
        {/* Overlay com botão de play */}
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "330px",
            backgroundColor: "rgba(0, 0, 0, 0.4)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            opacity: isHovered ? 1 : 0,
            transition: "opacity 0.3s ease-in-out",
          }}
        >
          <IconButton
            sx={{
              color: "white",
              border: "2px solid white",
              fontSize: "2rem",
              "&:hover": { backgroundColor: "rgba(255, 255, 255, 0.2)" },
            }}
          >
            <FaPlay size={20} style={{marginLeft: "2px"}} />
          </IconButton>
        </Box>
        
        {/* Badge de avaliação */}
        <Typography
          variant="body2"
          component="div"
          sx={{
            position: "absolute",
            top: 8,
            left: 8,
            backgroundColor: "primary.main",
            color: "white",
            fontWeight: "bold",
            padding: "2px 8px",
            borderRadius: "999px",
            fontSize: "0.875rem",
            zIndex: 2,
          }}
        >
          ⭐ {movie.vote_average.toFixed(1)}
        </Typography>
        
        <CardContent sx={{paddingInline: "12px", paddingBlockEnd: 0}}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Typography
              variant="h6"
              component="div"
              sx={{
                fontWeight: 600,
                color: "text.primary",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
                flex: 1,
                mr: 1,
                fontSize: 16
              }}
            >
              {movie.title}
            </Typography>
            
            {/* Botão de Favoritos à direita do título */}
            <IconButton
              sx={{
                color: "text.secondary",
                "&:hover": { color: "primary.main" },
                flexShrink: 0,
              }}
            >
              <MdFavoriteBorder size={20} />
            </IconButton>
          </Box>
          
          {/* Gêneros e Ano */}
          <Typography 
          variant="body2" 
          color="text.secondary"
          sx={{
            fontSize: 11,
            fontWeight: 500
          }}
          >
            <span>{getGenreNames()}</span>
            <span style={{ margin: "0 4px" }}>•</span>
            <span>{getReleaseYear()}</span>
          </Typography>
          
          {/* Overview do filme */}
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              color: "text.secondary",
              display: "-webkit-box",
              WebkitLineClamp: 3,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
              textOverflow: "ellipsis",
              fontSize: "0.785rem",
              mt: 1,
              lineHeight: "1.5",
            }}
          >
            {movie.overview || 'Descrição não disponível.'}
          </Typography>
        </CardContent>
      </Card>
    </>
  );
}

export default CardMovie