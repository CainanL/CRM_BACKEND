import { Module } from "@nestjs/common";
import { CreateOpportunityService } from "./create-opportunity/create-opportunity.service";
import { MoveOpportunityService } from "./move-opportunity/move-opportunity.service";
import { CloseOpportunityService } from "./close-opportunity/close-opportunity.service";
import { GetOpportunityByIdService } from "./get-opportunity-by-id/get-opportunity-by-id.service";
import { QueryOpportunitiesService } from "./query-opportunities/query-opportunities.service";
import { ClientInteractionModule } from "../../client-interaction/client-interaction.module";

@Module({
    imports: [ClientInteractionModule],
    providers: [
        CreateOpportunityService,
        MoveOpportunityService,
        CloseOpportunityService,
        GetOpportunityByIdService,
        QueryOpportunitiesService
    ],
    exports: [
        CreateOpportunityService,
        MoveOpportunityService,
        CloseOpportunityService,
        GetOpportunityByIdService,
        QueryOpportunitiesService
    ]
})
export class OpportunityModule { }
