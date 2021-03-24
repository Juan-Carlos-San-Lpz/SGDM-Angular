export class DetallePedido {
  constructor(
    public id_detalle_pedido: number,
    public id_pedido: number,
    public id_grupo_musica: number,
    public precio_total: string,
    public fecha_evento: string
  ) {}
}
