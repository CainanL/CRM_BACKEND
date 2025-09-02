export enum MessageStatus {
  PENDING = 'PENDING',           // Aguardando envio
  SENT = 'SENT',                 // Enviada
  DELIVERED = 'DELIVERED',       // Entregue
  READ = 'READ',                 // Lida
  FAILED = 'FAILED',             // Falha no envio
  SCHEDULED = 'SCHEDULED',       // Agendada para envio
  CANCELLED = 'CANCELLED',       // Cancelada
  RECEIVED = 'RECEIVED',         // Recebida (para mensagens inbound)
  PROCESSING = 'PROCESSING'      // Processando (para IA)
}
