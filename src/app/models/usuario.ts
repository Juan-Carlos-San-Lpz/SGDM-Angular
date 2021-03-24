export class Usuario{
  constructor(
    public id_usuario: number,
    public id_tipo_usuario: number,
    public email_usuario: string,
    public password: string,
    public appat_usuario: string,
    public apmat_usuario: string,
    public tel_usuario: number,
    public id_tarjeta: number,
    public nombre_usuario: string,
    public image: string
    // public id_direccion: number,

  ){

  }
}
