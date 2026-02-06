import { Component, Input, numberAttribute } from '@angular/core';
import { ActorCreacionDTO, ActorDTO } from '../actores';
import { FormularioActoresComponent } from "../formulario-actores/formulario-actores.component";

@Component({
  selector: 'app-editar-actor',
  imports: [FormularioActoresComponent],
  templateUrl: './editar-actor.component.html',
  styleUrl: './editar-actor.component.css'
})
export class EditarActorComponent {
  @Input({transform: numberAttribute})
  id!: number;

  actor: ActorDTO = {id: 1, nombre: 'Tom Holland', fechaNacimiento: new Date(1999, 0, 25), foto: 'https://media.vogue.co.uk/photos/68c14fa7250c555b5d7ad32f/2:3/w_2560%2Cc_limit/Prada_25_Prototype_PR%2520Portrait_8_16x9.jpg'};

  guardarCambios(actor: ActorCreacionDTO) {
    console.log('Editando el actor', actor)
  }

}
