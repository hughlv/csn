import Image from 'next/image';
import {
  Grid,
  Link,
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
} from '@mui/material';
import data from '../../public/data/aibot.json';

export default function Galleries() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-8">
      <Grid container spacing={2}>
        {data.map(item => (
          <Grid item xs={12} sm={12} md={6} lg={4} key={item.title}>
            <Card className="flex items-center p-2 h-full dark:bg-gray-900 dark:text-gray-400">
              <Image
                height="96"
                width="96"
                src={item.image}
                alt={item.title}
                className="p-3"
              />
              <CardContent className="flex flex-col p-4 w-full h-full items-start">
                <div className="text-lg font-bold">{item.title}</div>
                <div className="py-4">{item.description}</div>
                <div className="w-full">
                  <Link href={item.link} underline="none">
                    访问产品网站
                  </Link>
                </div>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </main>
  );
}
