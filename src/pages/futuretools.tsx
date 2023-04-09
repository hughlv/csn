import Image from 'next/image';
import {
  Button,
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
} from '@mui/material';
import data from '../../public/data/futuretools.json';

export default function Galleries() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-4">
      {data.map(item => (
        <Card sx={{ width: 475 }} key={item.title} className="m-1">
          <CardHeader title={item.title} />
          <CardMedia
            classes={"p-4"}
            component="img"
            width="100%"
            image={item.image}
            alt={item.title}
          />
          <CardContent>
            <Typography variant="body2">{item.description}</Typography>
          </CardContent>
          <CardActions>
            <Button href={item.link} size="large">Learn More</Button>
          </CardActions>
        </Card>
      ))}
    </main>
  );
}
