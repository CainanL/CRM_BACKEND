import { Module } from "@nestjs/common";
import { CreateIndividualClientService } from "./create-individual-client/create-individual-client.service";
import { CreateCorporateClientService } from "./create-corporate-client/create-corporate-client.service";
import { GetClientByIdService } from "./get-client-by-id/get-client-by-id.service";
import { QueryClientsService } from "./query-clients/query-clients.service";
import { UpdateIndividualClientService } from "./update-individual-client/update-individual-client.service";
import { UpdateCorporateClientService } from "./update-corporate-client/update-corporate-client.service";
import { DeleteClientService } from "./delete-client/delete-client.service";
import { ChangeClientStatusService } from "./change-client-status/change-client-status.service";

@Module({
    providers: [
        CreateIndividualClientService,
        CreateCorporateClientService,
        GetClientByIdService,
        QueryClientsService,
        UpdateIndividualClientService,
        UpdateCorporateClientService,
        DeleteClientService,
        ChangeClientStatusService
    ],
    exports: [
        CreateIndividualClientService,
        CreateCorporateClientService,
        GetClientByIdService,
        QueryClientsService,
        UpdateIndividualClientService,
        UpdateCorporateClientService,
        DeleteClientService,
        ChangeClientStatusService
    ]
})
export class ClientModule { }
