import { Module } from "@nestjs/common";
import { CreateInteractionService } from "./create-interaction/create-interaction.service";
import { GetInteractionByIdService } from "./get-interaction-by-id/get-interaction-by-id.service";
import { QueryInteractionsService } from "./query-interactions/query-interactions.service";
import { UpdateInteractionService } from "./update-interaction/update-interaction.service";
import { DeleteInteractionService } from "./delete-interaction/delete-interaction.service";
import { RecordInteractionService } from "./record-interaction/record-interaction.service";
import { GetInteractionsByClientService } from "./get-interactions-by-client/get-interactions-by-client.service";
import { GetInteractionsByEmployeeService } from "./get-interactions-by-employee/get-interactions-by-employee.service";
import { GetInteractionStatsService } from "./get-interaction-stats/get-interaction-stats.service";

@Module({
    providers: [
        CreateInteractionService,
        GetInteractionByIdService,
        QueryInteractionsService,
        UpdateInteractionService,
        DeleteInteractionService,
        RecordInteractionService,
        GetInteractionsByClientService,
        GetInteractionsByEmployeeService,
        GetInteractionStatsService
    ],
    exports: [
        CreateInteractionService,
        GetInteractionByIdService,
        QueryInteractionsService,
        UpdateInteractionService,
        DeleteInteractionService,
        RecordInteractionService,
        GetInteractionsByClientService,
        GetInteractionsByEmployeeService,
        GetInteractionStatsService
    ]
})
export class ClientInteractionModule { }
