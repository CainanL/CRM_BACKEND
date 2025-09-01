export enum LeadStatus {
    HOT = 'HOT',           // Quente - Lead muito interessado
    WARM = 'WARM',         // Morno - Lead com interesse moderado
    COLD = 'COLD',         // Frio - Lead com pouco interesse
    NEW = 'NEW',           // Novo - Lead recém capturado
    CONTACTED = 'CONTACTED', // Contatado - Lead já foi contatado
    QUALIFIED = 'QUALIFIED', // Qualificado - Lead qualificado para proposta
    PROPOSAL_SENT = 'PROPOSAL_SENT', // Proposta enviada
    NEGOTIATION = 'NEGOTIATION', // Em negociação
    WON = 'WON',           // Ganho - Lead convertido em cliente
    LOST = 'LOST'          // Perdido - Lead não convertido
}
