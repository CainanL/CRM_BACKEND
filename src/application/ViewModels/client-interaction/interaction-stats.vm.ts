export class InteractionStatsVM {
    public totalInteractions: number;
    public interactionsByType: { type: string; count: number; percentage: number }[];
    public interactionsByStatus: { status: string; count: number; percentage: number }[];
    public interactionsByTag: { tag: string; count: number; percentage: number }[];
    public interactionsByPriority: { priority: string; count: number; percentage: number }[];
    public averageDuration: number;
    public totalCost: number;
    public interactionsThisMonth: number;
    public interactionsLastMonth: number;
    public monthOverMonthGrowth: number;
    public topEmployees: { employeeId: string; employeeName: string; count: number; percentage: number }[];
    public topClients: { clientId: string; clientName: string; count: number; percentage: number }[];

    constructor(stats: any) {
        this.totalInteractions = stats.totalInteractions;
        this.averageDuration = stats.averageDuration;
        this.totalCost = stats.totalCost;
        this.interactionsThisMonth = stats.interactionsThisMonth;
        this.interactionsLastMonth = stats.interactionsLastMonth;
        
        // Calcular crescimento mês a mês
        this.monthOverMonthGrowth = this.interactionsLastMonth > 0 
            ? ((this.interactionsThisMonth - this.interactionsLastMonth) / this.interactionsLastMonth) * 100 
            : 0;

        // Calcular percentuais para cada categoria
        this.interactionsByType = stats.interactionsByType.map((item: any) => ({
            type: item.type,
            count: item.count,
            percentage: this.totalInteractions > 0 ? (item.count / this.totalInteractions) * 100 : 0
        }));

        this.interactionsByStatus = stats.interactionsByStatus.map((item: any) => ({
            status: item.status,
            count: item.count,
            percentage: this.totalInteractions > 0 ? (item.count / this.totalInteractions) * 100 : 0
        }));

        this.interactionsByTag = stats.interactionsByTag.map((item: any) => ({
            tag: item.tag,
            count: item.count,
            percentage: this.totalInteractions > 0 ? (item.count / this.totalInteractions) * 100 : 0
        }));

        this.interactionsByPriority = stats.interactionsByPriority.map((item: any) => ({
            priority: item.priority,
            count: item.count,
            percentage: this.totalInteractions > 0 ? (item.count / this.totalInteractions) * 100 : 0
        }));

        this.topEmployees = stats.topEmployees.map((item: any) => ({
            employeeId: item.employeeId,
            employeeName: item.employeeName,
            count: item.count,
            percentage: this.totalInteractions > 0 ? (item.count / this.totalInteractions) * 100 : 0
        }));

        this.topClients = stats.topClients.map((item: any) => ({
            clientId: item.clientId,
            clientName: item.clientName,
            count: item.count,
            percentage: this.totalInteractions > 0 ? (item.count / this.totalInteractions) * 100 : 0
        }));
    }
}
