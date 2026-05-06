import { apiClient } from './api';

export interface HistorialItem {
  tipoviaje: string;
  fecha: string;
  razonSocial: string;
  movimiento: string;
  origen: string;
  destino: string;
}

export const tractorService = {
  getHistorial: (termino: string): Promise<HistorialItem[]> =>
    apiClient.get<HistorialItem[]>(`/tractores/historial?termino=${encodeURIComponent(termino)}`),
};
