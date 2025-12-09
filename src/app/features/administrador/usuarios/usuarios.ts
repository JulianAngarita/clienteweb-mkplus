import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbDropdown, NgbDropdownModule, NgbModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LoadingScreenComponent } from '../../../shared/components/loading-screen/loading-screen';
import { CommonModule } from '@angular/common';
import { ConcesionarioService } from '../../../core/services/concesionario/concesionario';
import { IRespuestaServicio } from '../../../core/interfaces/general';
import { HttpErrorResponse } from '@angular/common/http';
import { Utilidades } from '../../../core/services/utilidades/utilidades';
import { consultarUsuarioEI, IConsultarUsuario, IUsuario } from '../../../core/interfaces/usuarios/usuarios.interface';
import { UsuarioService } from '../../../core/services/usuario/usuario';
import { ModalUsuarios } from '../../../shared/modals/forms-modals/modal-usuarios/modal-usuarios';

@Component({
  selector: 'app-usuarios',
  imports: [
    CommonModule,
    FormsModule,
    NgbModule,
    LoadingScreenComponent,
    NgbDropdownModule,
  ],
  templateUrl: './usuarios.html',
  styleUrl: './usuarios.scss',
})
export class Usuarios {
  public modalService = inject(NgbModal);
  private concesionarioService = inject(ConcesionarioService);
  private utilidadesService = inject(Utilidades);
  private usuarioSerive = inject(UsuarioService);

  public modalActivo = false;
  public cargandoLoader = true;
  public cargando = false;
  public modalEliminar = false;

  public usuarioEliminar: any = '';
  public evento: string = '';
  public usuarios: IUsuario[] = [];
  public usuarioSeleccionado: any = {};
  public listaConcesionarios: Array<any> = [];
  public listaGrupos: Array<any> = [];
  public filtro: IConsultarUsuario = Object.assign({}, consultarUsuarioEI);
  public total: number = 0;
  public pagina: number = 1;

  constructor() {}

  ngOnInit(): void {
    this.consultar();
    this.consultaConcesiones();
  }

  cambiarPagina = ( pagina: number ) => {
    this.filtro.salto = (pagina - 1) * this.filtro.limite;
    this.consultar();
  }


  toggleConcesion(value: string) {
    const index: number = this.filtro.concesiones.indexOf(value);

    if (index === -1) {
      this.filtro.concesiones.push(value);
    } else {
      this.filtro.concesiones.splice(index, 1);
    }
  }

  async consultaConcesiones(): Promise<void> {
    this.concesionarioService.consultarcl().subscribe({
      next: (respuesta: IRespuestaServicio) => {
        if (respuesta.estatus) {
          const concesiones = respuesta.data;
          const prepararLista: any[] = []
          const prepararGrupos: any[] = []
          concesiones.map((i: any) => {
              prepararGrupos.push({
                  key: i.grupo,
                  text: i.grupo,
                  value: i.grupo
              })

              i.concesiones.map((j: any) => {
                prepararLista.push({
                  grupo: i.grupo,
                  key: `${i.grupo} ${j.nombre} ${j.cl}`,
                  text: `${j.nombre} ${j.cl}`,
                  value: j.cl
                })
              })
          });
          this.listaConcesionarios = prepararLista;
          this.listaGrupos = prepararGrupos;
        }
      },
      error: (error: HttpErrorResponse) => {
        this.utilidadesService.abrirModalInfo(
          'Información',
          error.error.resultadoOperacio,
          'Aceptar'
        );
      }
    })
  }

  public consultar = () => {
    this.cargando = true;
    this.usuarioSerive.consultarUsuarios(this.filtro).subscribe({
      next: (respuesta: IRespuestaServicio) => {
        if (respuesta.estatus) {
          this.usuarios = respuesta.data.usuarios;
          this.total = respuesta.data.totalUsuarios;
        }
        this.cargando = false;
      },
      error: (error: HttpErrorResponse) => {
        this.utilidadesService.abrirModalInfo(
          'Información',
          error.error.resultadoOperacion,
          'Aceptar'
        );
        this.cargando = false;
      }
    })
  }

  // CREAR
  async crear(): Promise<void> {
    const instancia = this.modalService.open(ModalUsuarios, {
      centered: true,
      size: 'xl'
    });

    instancia.componentInstance.evento = 'EVENTO_GUARDAR';
    instancia.componentInstance.grupos = this.listaGrupos;
    instancia.componentInstance.concesionarios = this.listaConcesionarios;

    const result = await instancia.result;
    if (result) {
      this.consultar()
    }
  }

  // ACTUALIZAR
  async actualizar(usuario: IUsuario): Promise<void> {
    const instancia = this.modalService.open(ModalUsuarios, {
      centered: true,
      size: 'xl'
    });

    instancia.componentInstance.evento = 'EVENTO_ACTUALIZAR';
    instancia.componentInstance.usuarioSeleccionado = usuario;
    instancia.componentInstance.grupos = this.listaGrupos;
    instancia.componentInstance.concesionarios = this.listaConcesionarios;

    const result = await instancia.result;
    if (result) {
      this.consultar()
    }
  }

  // ELIMINAR
  public eliminarUsuario = (usuario: IUsuario) => {
    this.utilidadesService.abrirModalConfirmacion(
      'Eliminar modelo',
      `Estas seguro que quieres eliminar el usuario ${usuario.nombre.nombres}?`,
      'Eliminar',
      'Cancelar'
    ).then((resultado) => {
      if (resultado) {
        this.eliminar(usuario._id ?? '');
      }
    })
  }

  private eliminar = (id: string) => {
    this.cargando = true;
    this.usuarioSerive.eliminarUsuario({id: id}).subscribe({
      next: (respuesta: IRespuestaServicio) => {
        if (respuesta.estatus) {
          this.utilidadesService.abrirModalInfo(
            'Información',
            respuesta.resultadoOperacion,
            'Aceptar'
          );
        }
        this.cargando = false;
        this.consultar();
      },
      error: (error: HttpErrorResponse) => {
        this.utilidadesService.abrirModalInfo(
          'Información',
          error.error.resultadoOperacion,
          'Aceptar'
        );
        this.cargando = false;
      }
    })
  }

  public seleccionarUsuarioParaEdicion(usuario: any) {
    this.usuarioSeleccionado = { ...usuario };
    this.evento = 'ACTUALIZAR';
    this.modalActivo = true;
  }
}
