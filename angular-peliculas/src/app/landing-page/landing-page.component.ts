import { Component, OnInit } from '@angular/core';
import { ListadoPeliculasComponent } from '../peliculas/listado-peliculas/listado-peliculas.component';

@Component({
  selector: 'app-landing-page',
  imports: [ListadoPeliculasComponent],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.css'
})
export class LandingPageComponent implements OnInit{
  ngOnInit(): void {
    setTimeout(() => {
      this.peliculasEnCines =  [    {
      titulo: 'Inside Out 2',
      fechaLanzamiento: new Date(),
      precio: 1400.99,
      poster: 'https://crandelltheatre.org/wp-content/uploads/2024/06/Inside-Out-2-wide-Narrow.jpg'
    },
    {
      titulo: 'Moana 2',
      fechaLanzamiento: new Date('2016-05-03'),
      precio: 300.99,
      poster: 'https://i.ytimg.com/vi/kueYx3CJo6Q/maxresdefault.jpg'
    },
    {
      titulo: 'Bad boys: Ride or Die',
      fechaLanzamiento: new Date('2016-05-03'),
      precio: 300.99,
      poster: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQbUrY_5FQm6PY_rC5E9C-dRSY0mL85U_3UBQ&shttps://weatherford.filmalley.net/site-assets/movie-posters/_smallPoster2x/Bad_Boys__Ride_or_Die.jpg'
    }];
      this.peliculasProximosEstrenos = [    {
      titulo: 'Deadpool & Wolverine',
      fechaLanzamiento: new Date('2016-05-03'),
      precio: 300.99,
      poster: 'https://static.posters.cz/image/1300/249116.jpg'
    },
    {
      titulo: 'Oppenheimer',
      fechaLanzamiento: new Date('2016-05-03'),
      precio: 300.99,
      poster: 'https://upload.wikimedia.org/wikipedia/en/4/4a/Oppenheimer_%28film%29.jpg'
    },
    {
      titulo: 'The Flash',
      fechaLanzamiento: new Date('2016-05-03'),
      precio: 300.99,
      poster: 'https://m.media-amazon.com/images/M/MV5BYmE2NzBjNGUtNTJiMy00N2UxLWEyYzMtYzFjODFhMGZlOTgzXkEyXkFqcGc@._V1_.jpg'
    }];
    }, 500);
  }
  peliculasEnCines!: any[];
  peliculasProximosEstrenos!: any[];
}
