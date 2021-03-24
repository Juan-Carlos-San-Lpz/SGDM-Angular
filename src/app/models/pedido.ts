export class Pedido {
  constructor(
    public id_pedido: number,
    public id_usuario: number,
    public fecha_registro: string,
    public fecha_expiracion: string,
    public id_fecha_pago: number,
    public id_status_pedido: number,
    public total: string
  ) {}
}
