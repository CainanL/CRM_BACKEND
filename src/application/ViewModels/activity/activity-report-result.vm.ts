export class ActivityReportResultVM {
    constructor(
        public totalActivities: number,
        public completedActivities: number,
        public pendingActivities: number,
        public overdueActivities: number,
        public inProgressActivities: number,
        public cancelledActivities: number,
        public activitiesByType: { [key: string]: number },
        public activitiesByPriority: { [key: string]: number },
        public activitiesByStatus: { [key: string]: number },
        public completionRate: number,
        public overdueRate: number,
        public averageCompletionTime: number, // em horas
        public followUpsPending: number,
        public followUpsCompleted: number
    ) { }
}