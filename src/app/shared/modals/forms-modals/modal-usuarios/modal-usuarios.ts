import { Component, Input, inject } from '@angular/core';
import { IUsuario, usuarioEI } from '../../../../core/interfaces/usuarios/usuarios.interface';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { TIPO_ROL, tipoRolesOpciones } from '../../../../core/enum/tipo-rol/tipo-rol';
import { tipoIdentificacionOpciones } from '../../../../core/enum/tipo-identificacion/tipo-identificacion';
import { UsuarioService } from '../../../../core/services/usuario/usuario';
import { IRespuestaServicio } from '../../../../core/interfaces/general';
import { Utilidades } from '../../../../core/services/utilidades/utilidades';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-modal-usuarios',
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './modal-usuarios.html',
  styleUrl: './modal-usuarios.scss',
})
export class ModalUsuarios {
  public modalActivo = inject(NgbActiveModal);
  private usuarioService = inject(UsuarioService);
  private utilidadesService = inject(Utilidades);
  public tiposIdentificacion = tipoIdentificacionOpciones;
  public tiposRoles = tipoRolesOpciones;
  public cargando: boolean = false;
  @Input() evento: 'EVENTO_ACTUALIZAR' | 'EVENTO_GUARDAR' = 'EVENTO_GUARDAR';
  @Input() usuarioSeleccionado: IUsuario = Object.assign({}, usuarioEI);
  @Input() concesionarios: any[] = [];
  @Input() grupos: any[] = [];


  concesionesSeleccionada: any[] = [];
  
  contrasena = {
    contrasena: '',
    confirmarContrasena: ''
  };

  errorContrasena = {
    estatus: false,
    mensaje: ''
  };

  ngOnInit() {
    console.log('grupos: ', this.grupos)
    console.log('concesionarios: ', this.concesionarios)
  }

  toggleConcesion(value: string) {
    const index: number = this.usuarioSeleccionado.concesiones.indexOf(value);

    if (index === -1) {
      this.usuarioSeleccionado.concesiones.push(value);
    } else {
      this.usuarioSeleccionado.concesiones.splice(index, 1);
    }
  }

  public seleccionaGrupo = () => {
    this.usuarioSeleccionado.concesiones = [];
    this.concesionesSeleccionada = this.concesionarios.filter(
      (concesionario: any) => concesionario.grupo == this.usuarioSeleccionado.grupo
    );
  }

  public crearUsuario = () => {
    this.usuarioService.crearUsuario(this.usuarioSeleccionado).subscribe({
      next: (respuesta: IRespuestaServicio) => {
        if (respuesta.estatus) {
          this.utilidadesService.abrirModalInfo(
            'Información',
            `Usuario ${this.usuarioSeleccionado.nombre.nombres} creado con éxito.`,
            'Aceptar'
          );
          this.usuarioSeleccionado = Object.assign({}, usuarioEI);
        } else {
          this.utilidadesService.abrirModalInfo(
            'Información',
            'No se ha podido crear el usuario.',
            'Aceptar'
          );
        }
        this.contrasena = {
          contrasena: '',
          confirmarContrasena: ''
        };
        this.cargando = false;
        this.modalActivo.close(true);
      },
      error: (error: HttpErrorResponse) => {
        this.usuarioSeleccionado = Object.assign({}, usuarioEI);
        this.utilidadesService.abrirModalInfo(
          'Información',
          error.error.resultadoOperacion,
          'Aceptar'
        )
        this.cargando = false;
      }
    })
  }

  validarContrasena(contrasena: string, confirmar: string): void {
    this.errorContrasena = {
      estatus: false,
      mensaje: ''
    };

    if (contrasena) {
      if (contrasena.length < 6) {
        this.errorContrasena = {
          estatus: true,
          mensaje: 'La contraseña debe tener al menos 6 caracteres'
        };
        return;
      }
    }

    if (contrasena && confirmar) {
      if (contrasena !== confirmar) {
        this.errorContrasena = {
          estatus: true,
          mensaje: 'Las contraseñas no coinciden'
        };
      } else {
        this.usuarioSeleccionado.contrasena = contrasena;
      }
    }
  }

  onContrasenaChange(): void {
    this.validarContrasena(this.contrasena.contrasena, this.contrasena.confirmarContrasena);
  }

  // onChangesDatosUsuarios(field: string, value: any): void {
  //   this.datosUsuario[field] = value;
  // }


  buttonActivo(): void {
    this.usuarioSeleccionado.activo = !this.usuarioSeleccionado.activo;
  }

  seleccionarRol(): string {
    if (this.usuarioSeleccionado.rol === TIPO_ROL.ADMINISTRADOR_CONCESIONARIO) {
      return 'administrador_concesionario';
    } else if (this.usuarioSeleccionado.rol === TIPO_ROL.ADMINISTRADOR_SISTEMA) {
      return 'administrador_sistema';
    } else if (this.usuarioSeleccionado.rol === TIPO_ROL.IMPORTADORA) {
      return 'importadora';
    } else {
      return 'otros';
    }
  }

  guardarUsuario(): void {
    if (this.errorContrasena.estatus) {
      return;
    }
    this.crearUsuario();
  }

  actualizarUsuario(): void {
    if (this.errorContrasena.estatus) {
      return;
    }

    if (this.contrasena.contrasena && this.contrasena.confirmarContrasena &&
        this.contrasena.contrasena === this.contrasena.confirmarContrasena) {
      this.usuarioSeleccionado.contrasena = this.contrasena.contrasena;
    }

    delete this.usuarioSeleccionado.creado;

    this.usuarioService.actualizarUsuario(this.usuarioSeleccionado).subscribe({
      next: (respuesta: IRespuestaServicio) => {
        if (respuesta.estatus) {
          this.utilidadesService.abrirModalInfo(
            'Información',
            `Usuario ${this.usuarioSeleccionado.nombre.nombres} actualizado con éxito.`,
            'Aceptar'
          );
          this.usuarioSeleccionado = Object.assign({}, usuarioEI);
        } else {
          this.utilidadesService.abrirModalInfo(
            'Información',
            'No se ha podido actualizar el usuario.',
            'Aceptar'
          );
        }
        this.contrasena = {
          contrasena: '',
          confirmarContrasena: ''
        };
        this.cargando = false;
        this.modalActivo.close(true);
      },
      error: (error: HttpErrorResponse) => {
        this.utilidadesService.abrirModalInfo(
          'Información',
          error.error.resultadoOperacion,
          'Aceptar'
        )
        this.cargando = false;
      }
    })
  }
}
