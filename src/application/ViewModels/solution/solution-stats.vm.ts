export class SolutionStatsVm {
    totalSolutions: number;
    activeSolutions: number;
    conversionRate: number;
    lastMonthLeads: number;

    constructor(data: {
        totalSolutions: number;
        activeSolutions: number;
        conversionRate: number;
        lastMonthLeads: number;
    }) {
        this.totalSolutions = data.totalSolutions;
        this.activeSolutions = data.activeSolutions;
        this.conversionRate = data.conversionRate;
        this.lastMonthLeads = data.lastMonthLeads;
    }
}
