import { Module } from "@nestjs/common";
import { QuerySolutionService } from "./query-solution/query-solution.service";
import { AddSolutionPriceService } from "./add-solution-price/add-solution-price.service";
import { UpdateSolutionService } from "./update-solution/update-solution.service";
import { RemoveSolutionPriceService } from "./remove-solution-price/remove-solution-price.service";
import { GetSolutionByIdService } from "./get-solution-by-id/get-solution-by-id.service";
import { CreateSolutionFieldSettingsService } from "./create-solution-field-settings/create-solution-field-settings.service";
import { DeleteSolutionService } from "./delete-solution/delete-solution.service";
import { CreateSolutionService } from "./create-solution/create-solution.service";
import { QueryLeadsService } from "./query-leads/query-leads.service";
import { GetSolutionFieldValuesService } from "./get-solution-field-values/get-solution-field-values.service";
import { GetSolutionFieldSettingsService } from "./get-solution-field-settings/get-solution-field-settings.service";
import { CreateSolutionCapturedLeadService } from "./create-solution-captured-lead/create-solution-captured-lead.service";
import { QueryRecentLeadsService } from "./query-recent-leads/query-recent-leads.service";

@Module({
    providers: [
        QuerySolutionService,
        AddSolutionPriceService,
        UpdateSolutionService,
        RemoveSolutionPriceService,
        GetSolutionByIdService,
        CreateSolutionFieldSettingsService,
        DeleteSolutionService,
        CreateSolutionService,
        QueryLeadsService,
        GetSolutionFieldValuesService,
        GetSolutionFieldSettingsService,
        CreateSolutionCapturedLeadService,
        QueryRecentLeadsService
    ],
    exports: [
        QuerySolutionService,
        AddSolutionPriceService,
        UpdateSolutionService,
        RemoveSolutionPriceService,
        GetSolutionByIdService,
        CreateSolutionFieldSettingsService,
        DeleteSolutionService,
        CreateSolutionService,
        QueryLeadsService,
        GetSolutionFieldValuesService,
        GetSolutionFieldSettingsService,
        CreateSolutionCapturedLeadService,
        QueryRecentLeadsService
    ]
})
export class SolutionModule { }