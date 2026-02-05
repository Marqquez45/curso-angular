import { Component, numberAttribute, Input} from '@angular/core';
import { FormularioGeneroComponent } from "../formulario-genero/formulario-genero.component";
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { RouterLink } from '@angular/router';
import { GeneroCreacionDTO, GeneroDTO } from '../generos';

@Component({
  selector: 'app-editar-genero',
  imports: [MatButtonModule, RouterLink, MatFormFieldModule, ReactiveFormsModule, MatInputModule, FormularioGeneroComponent],
  templateUrl: './editar-genero.component.html',
  styleUrl: './editar-genero.component.css'
})
export class EditarGeneroComponent {
  @Input({transform: numberAttribute})
  id!: number;
  genero: GeneroDTO = {id: 1, nombre: 'Accion'}
  guardarCambios(genero: GeneroCreacionDTO) {
    //...guardar  los cambios
    //this.router.navigate(['/generos']);
    console.log(genero);
  }
}
