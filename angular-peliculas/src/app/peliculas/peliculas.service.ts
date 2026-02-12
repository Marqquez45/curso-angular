import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { map, Observable, tap } from 'rxjs';
import { LandingPageDTO, PeliculaCreacionDTO, PeliculaDTO, PeliculasPostGetDTO, PeliculasPutGetDTO } from './peliculas';
import { ActorDTO } from '../actores/actores';

@Injectable({
  providedIn: 'root'
})
export class PeliculasService {

  constructor() { }

  private http = inject(HttpClient);
  private urlBase = environment.apiURL + '/peliculas';

  public obtenerLandingPage(): Observable<LandingPageDTO> {
    return this.http.get<LandingPageDTO>(`${this.urlBase}/landing`).pipe(

      // 🔹 ANTES de transformar
      tap(response => 
        console.log('📥 ANTES de transformar:', response)
      ),

      map(response => {

        const mapearPoster = (peliculas: PeliculaDTO[]) =>
          peliculas?.map(pelicula => ({
            ...pelicula,
            poster: pelicula.poster
              ? environment.apiURL + pelicula.poster.slice(4) + '?t=' + new Date().getTime()
              : undefined
          }));

        const respuestaTransformada: LandingPageDTO = {
          enCines: mapearPoster(response.enCines),
          proximosEstrenos: mapearPoster(response.proximosEstrenos)
        };

        return respuestaTransformada;
      }),

      // 🔹 DESPUÉS de transformar
      tap(responseTransformada =>
        console.log('📤 DESPUÉS de transformar:', responseTransformada)
      )
    );
  }



  public obtenerPorId(id: number): Observable<PeliculaDTO> {
    return this.http.get<PeliculaDTO>(`${this.urlBase}/${id}`).pipe(

      // 🔹 ANTES de transformar
      tap(response =>
        console.log('📥 ANTES de transformar (obtenerPorId):', response)
      ),

      map(response => {
        const peliculaTransformada: PeliculaDTO = {
          ...response,
          poster: response.poster
            ? environment.apiURL + response.poster.slice(4) + '?t=' + new Date().getTime()
            : undefined,
          
          // Mantener como Date
          fechaLanzamiento: new Date(response.fechaLanzamiento),

          actores: response.actores?.map(actor => ({
            ...actor,
            foto: actor.foto
              ? environment.apiURL + actor.foto.slice(4) + '?t=' + new Date().getTime()
              : ''
          }))
        };

        return peliculaTransformada;
      }),

      // 🔹 DESPUÉS de transformar
      tap(responseTransformada =>
        console.log('📤 DESPUÉS de transformar (obtenerPorId):', responseTransformada)
      )
    );
  }


  
  // ====================================
  // FILTRAR
  // ====================================
  public filtrar(valores: any): Observable<HttpResponse<PeliculaDTO[]>> {
    const params = new HttpParams({ fromObject: valores });
    return this.http.get<PeliculaDTO[]>(`${this.urlBase}/filtrar`, { params, observe: 'response' }).pipe(

      tap(response =>
        console.log('📥 ANTES de transformar (filtrar):', response)
      ),

      map(response => {
        const mapearPoster = (peliculas: PeliculaDTO[]) =>
          peliculas?.map(pelicula => ({
            ...pelicula,
            poster: pelicula.poster
              ? environment.apiURL + pelicula.poster.slice(4) + '?t=' + new Date().getTime()
              : undefined
          }));

        const respuestaTransformada: HttpResponse<PeliculaDTO[]> = response.clone({
          body: mapearPoster(response.body || [])
        });

        return respuestaTransformada;
      }),

      tap(responseTransformada =>
        console.log('📤 DESPUÉS de transformar (filtrar):', responseTransformada)
      )
    );
  }

  // ====================================
  // CREAR GET (POST GET DTO)
  // ====================================
  public crearGet(): Observable<PeliculasPostGetDTO> {
    return this.http.get<PeliculasPostGetDTO>(`${this.urlBase}/postget`).pipe(

      tap(response =>
        console.log('📥 ANTES de transformar (crearGet):', response)
      ),

      map(response => {
        // Aquí podrías hacer transformaciones si fueran necesarias
        return response;
      }),

      tap(responseTransformada =>
        console.log('📤 DESPUÉS de transformar (crearGet):', responseTransformada)
      )
    );
  }

  // ====================================
  // CREAR PELÍCULA
  // ====================================
  public crear(pelicula: PeliculaCreacionDTO): Observable<PeliculaDTO> {
    const formData = this.construirFormData(pelicula);
    return this.http.post<PeliculaDTO>(this.urlBase, formData).pipe(

      tap(response =>
        console.log('📥 ANTES de transformar (crear):', response)
      ),

      map(response => ({
        ...response,
        poster: response.poster
          ? environment.apiURL + response.poster.slice(4) + '?t=' + new Date().getTime()
          : undefined
      })),

      tap(responseTransformada =>
        console.log('📤 DESPUÉS de transformar (crear):', responseTransformada)
      )
    );
  }

  public actualizarGet(id: number): Observable<PeliculasPutGetDTO> {
    return this.http.get<PeliculasPutGetDTO>(`${this.urlBase}/putget/${id}`).pipe(

      // 🔹 ANTES de transformar
      tap(response =>
        console.log('📥 ANTES de transformar (actualizarGet):', response)
      ),

      // 🔹 Transformación
      map(response => {
        const peliculaTransformada: PeliculasPutGetDTO = {
          ...response,
          pelicula: {
            ...response.pelicula,
            poster: response.pelicula.poster
              ? environment.apiURL + response.pelicula.poster.slice(4) + '?t=' + new Date().getTime()
              : undefined
          }
        };
        return peliculaTransformada;
      }),

      // 🔹 DESPUÉS de transformar
      tap(responseTransformada =>
        console.log('📤 DESPUÉS de transformar (actualizarGet):', responseTransformada)
      )
    );
  }


  // ====================================
  // ACTUALIZAR PELÍCULA
  // ====================================
  public actualizar(id: number, pelicula: PeliculaCreacionDTO): Observable<PeliculaDTO> {
    const formData = this.construirFormData(pelicula);
    return this.http.put<PeliculaDTO>(`${this.urlBase}/${id}`, formData).pipe(

      tap(response =>
        console.log('📥 ANTES de transformar (actualizar):', response)
      ),

      map(response => ({
        ...response,
        poster: response.poster
          ? environment.apiURL + response.poster.slice(4) + '?t=' + new Date().getTime()
          : undefined
      })),

      tap(responseTransformada =>
        console.log('📤 DESPUÉS de transformar (actualizar):', responseTransformada)
      )
    );
  }

  // ====================================
  // BORRAR PELÍCULA
  // ====================================
  public borrar(id: number): Observable<any> {
    return this.http.delete(`${this.urlBase}/${id}`).pipe(
      tap(response =>
        console.log('📤 Borrar (respuesta del servidor):', response)
      )
    );
  }


  private construirFormData(pelicula: PeliculaCreacionDTO): FormData{
    const formData = new FormData();
    formData.append('titulo', pelicula.titulo);
    formData.append('fechaLanzamiento', pelicula.fechaLanzamiento.toISOString().split('T')[0]);

    if (pelicula.poster){
      formData.append('poster', pelicula.poster);
    }

    if (pelicula.trailer){
      formData.append('trailer', pelicula.trailer);
    }

    formData.append('generosIds', JSON.stringify(pelicula.generosIds));
    formData.append('cinesIds', JSON.stringify(pelicula.cinesIds));
    formData.append('actores', JSON.stringify(pelicula.actores));
    
    return formData;

  }
}
