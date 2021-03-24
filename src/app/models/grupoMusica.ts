export class GrupoMusica{
  constructor(
    public id_grupo_musica: number,
    public nombre_grupo_musica: string,
    public no_integrantes: number,
    public id_genero_grupo: number,
    public historia_grupo: string,
    public precio_grupo: number,
    public imagen_grupo: string,
    public video_grupo: string,
    public id_usuario: number

  ){

  }
}
