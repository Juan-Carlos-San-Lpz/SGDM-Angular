export class Direccion {
  constructor(
    public id_direccion: number,
    public estado: string,
    public municipio: string,
    public colonia: string,
    public cp: string,
    public direccion: string,
    public id_usuario: number
  ) {}
}
