export interface Lead {
  _id: string;
  name: string;
  email: string;
  etapa: 'live' | 'sala' | 'grupo' | 'individual';
  status: 'interesse' | 'pago';
  eventDate?: string;
  isProspect?: boolean;
}
