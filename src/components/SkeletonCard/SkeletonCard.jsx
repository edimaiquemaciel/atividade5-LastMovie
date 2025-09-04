import { Skeleton, Card, CardContent } from "@mui/material";


function SkeletonCard() {
  return (
    <Card sx={{ width: 331.25, margin: "0.5rem" }}>
      <Skeleton variant="rectangular" width={331.25} height={500} />
      <CardContent>
        <Skeleton variant="text" width="80%" />
        <Skeleton variant="text" width="60%" />
      </CardContent>
    </Card>
  )
}

export default SkeletonCard