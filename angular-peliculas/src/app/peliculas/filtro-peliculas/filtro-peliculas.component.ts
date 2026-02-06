import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { ListadoPeliculasComponent } from "../listado-peliculas/listado-peliculas.component";
import { FiltroPeliculas } from './filtroPelicula';

import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-filtro-peliculas',
  imports: [MatButtonModule, MatFormFieldModule, ReactiveFormsModule, MatInputModule, MatSelectModule, MatCheckboxModule, ListadoPeliculasComponent],
  templateUrl: './filtro-peliculas.component.html',
  styleUrl: './filtro-peliculas.component.css'
})
export class FiltroPeliculasComponent implements OnInit {

  ngOnInit(): void {
    this.leerValoresURL();
    this.buscarPeliculas(this.form.value as FiltroPeliculas);
    this.form.valueChanges.subscribe(valores => {
      this.peliculas = this.peliculasOriginal;
      this.buscarPeliculas(valores as FiltroPeliculas);
      this.escribirParametrosBusquedaEnUrl(valores as FiltroPeliculas);
    });
  }

  buscarPeliculas(valores: FiltroPeliculas) {
    if (valores.titulo) {
      this.peliculas = this.peliculas.filter(pelicula => pelicula.titulo.indexOf(valores.titulo) !== -1);  
    }

    if (valores.generoId !== 0) {
      this.peliculas = this.peliculas.filter(pelicula => pelicula.generos.indexOf(valores.generoId) !== -1);
    }

    if (valores.proximosEstrenos) {
      this.peliculas = this.peliculas.filter(pelicula => pelicula.proximosEstrenos);
    }

    if (valores.enCines) {
      this.peliculas = this.peliculas.filter(pelicula => pelicula.enCines);
    }
    

  }

  leerValoresURL() {
    this.activedRoute.queryParams.subscribe((params: any) => {
      var objeto: any = {};

      if (params.titulo){
          objeto.titulo = params.titulo;
      }

      if (params.generoId){
          objeto.generoId = Number(params.generoId);
      }

      if (params.proximosEstrenos){
          objeto.proximosEstrenos = params.proximosEstrenos;
      }

      if (params.enCines){
          objeto.enCines = params.enCines;
      }

      this.form.patchValue(objeto);
    });
  }

  limpiar() {
    this.form.patchValue({titulo: '', generoId: 0, proximosEstrenos: false, enCines: false});
  }

  escribirParametrosBusquedaEnUrl(valores: FiltroPeliculas) {
    let queryStrings = [];
    if (valores.titulo) {
      queryStrings.push(`titulo=${encodeURIComponent(valores.titulo)}`);
    }

    if (valores.generoId !== 0) {
      queryStrings.push(`generoId==${valores.generoId}`);
    }
    if (valores.enCines) {
      queryStrings.push(`enCines=${valores.enCines}`)
    }
    if (valores.proximosEstrenos) {
      queryStrings.push(`proximosEstrenos=${valores.proximosEstrenos}`)
    }

    this.location.replaceState('peliculas/filtrar', queryStrings.join('&'));
  }

  private formBuilder = inject(FormBuilder);
  private location = inject(Location)
  private activedRoute = inject(ActivatedRoute);

  form = this.formBuilder.group({
    titulo: '',
    generoId: 0,
    proximosEstrenos: false,
    enCines: false
  })

  generos = [
    {id: 1, nombre: "Drama"},
    {id: 2, nombre: "Accion"},
    {id: 3, nombre: "Comedia"}
  ]

  peliculasOriginal = [    {
    titulo: 'Inside Out 2',
    fechaLanzamiento: new Date(),
    precio: 1400.99,
    poster: 'https://crandelltheatre.org/wp-content/uploads/2024/06/Inside-Out-2-wide-Narrow.jpg',
    generos: [1, 2, 3],
    enCines: true,
    proximosEstrenos: false
  },
  {
    titulo: 'Moana 2',
    fechaLanzamiento: new Date('2016-05-03'),
    precio: 300.99,
    poster: 'https://i.ytimg.com/vi/kueYx3CJo6Q/maxresdefault.jpg',
    generos: [1, 3],
    enCines: true,
    proximosEstrenos: true
  },
  {
    titulo: 'Bad boys: Ride or Die',
    fechaLanzamiento: new Date('2016-05-03'),
    precio: 300.99,
    poster: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQbUrY_5FQm6PY_rC5E9C-dRSY0mL85U_3UBQ&shttps://weatherford.filmalley.net/site-assets/movie-posters/_smallPoster2x/Bad_Boys__Ride_or_Die.jpg',
    generos: [2, 3],
    enCines: false,
    proximosEstrenos: true
  },
  {
    titulo: 'Deadpool & Wolverine',
    fechaLanzamiento: new Date('2016-05-03'),
    precio: 300.99,
    poster: 'https://static.posters.cz/image/1300/249116.jpg',
    generos: [1],
    enCines: false,
    proximosEstrenos: false
  },
  {
    titulo: 'Oppenheimer',
    fechaLanzamiento: new Date('2016-05-03'),
    precio: 300.99,
    poster: 'https://upload.wikimedia.org/wikipedia/en/4/4a/Oppenheimer_%28film%29.jpg',
    generos: [3],
    enCines: true,
    proximosEstrenos: true
  },
  {
    titulo: 'The Flash',
    fechaLanzamiento: new Date('2016-05-03'),
    precio: 300.99,
    poster: 'https://m.media-amazon.com/images/M/MV5BYmE2NzBjNGUtNTJiMy00N2UxLWEyYzMtYzFjODFhMGZlOTgzXkEyXkFqcGc@._V1_.jpg',
    generos: [2, 3],
    enCines: false,
    proximosEstrenos: true
  }];

  peliculas = this.peliculasOriginal;
}
