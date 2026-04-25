type DealStage = 'NEW' | 'NEGOTIATION' | 'WON' | 'LOST';

export interface Deal {
  id: number;
  stage: DealStage
  title?: string;
  customerName?: string;
  amount?: number;
}