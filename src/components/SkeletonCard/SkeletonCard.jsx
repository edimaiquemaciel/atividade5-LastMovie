import { Skeleton, Card, CardContent } from "@mui/material";

function SkeletonCard() {
  return (
    <Card
      sx={{
        minWidth: 220,
        minHeight: 400,
        maxHeight: 500,
        position: "relative",
        backgroundColor: "#0d0d1a",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.2)",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Imagem Skeleton */}
      <Skeleton
        variant="rectangular"
        width="100%"
        height={330}
        sx={{ backgroundColor: "#1a1a1a" }}
      />

      {/* Badge de avaliação SKELETON — neutro, sem cor, sem texto */}
      <Skeleton
        variant="rounded"
        width={50}
        height={24}
        sx={{
          position: "absolute",
          top: 8,
          left: 8,
          zIndex: 2,
          bgcolor: "#1a1a1a",
          borderRadius: "999px",
        }}
      />

      <CardContent
        sx={{
          paddingBottom: "10px !important",
          paddingTop: "10px !important",
          backgroundColor: "#0d0d1a",
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          gap: 1,
        }}
      >
        {/* Título + Ícone de favorito */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <Skeleton variant="text" width="70%" sx={{ fontSize: "1rem", bgcolor: "#1a1a1a" }} />
          <Skeleton variant="circular" width={24} height={24} sx={{ bgcolor: "#1a1a1a" }} />
        </div>

        {/* Gêneros e Ano */}
        <Skeleton variant="text" width="50%" sx={{ fontSize: "0.7rem", bgcolor: "#1a1a1a" }} />

        {/* Overview (3 linhas) */}
        <Skeleton variant="text" width="100%" sx={{ fontSize: "0.7rem", bgcolor: "#1a1a1a" }} />
        <Skeleton variant="text" width="95%" sx={{ fontSize: "0.7rem", bgcolor: "#1a1a1a" }} />
        <Skeleton variant="text" width="90%" sx={{ fontSize: "0.7rem", bgcolor: "#1a1a1a" }} />
      </CardContent>
    </Card>
  );
}

export default SkeletonCard;