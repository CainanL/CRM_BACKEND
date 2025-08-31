import { Module } from "@nestjs/common";
import { QuerySolutionService } from "./query-solution/query-solution.service";
import { AddSolutionPriceService } from "./add-solution-price/add-solution-price.service";
import { UpdateSolutionService } from "./update-solution/update-solution.service";
import { RemoveSolutionPriceService } from "./remove-solution-price/remove-solution-price.service";
import { GetSolutionByIdService } from "./get-solution-by-id/get-solution-by-id.service";
import { CreateSolutionFieldSettingsService } from "./create-solution-field-settings/create-solution-field-settings.service";
import { DeleteSolutionService } from "./delete-solution/delete-solution.service";
import { CreateSolutionService } from "./create-solution/create-solution.service";

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
    ],
    exports: [
        QuerySolutionService,
        AddSolutionPriceService,
        UpdateSolutionService,
        RemoveSolutionPriceService,
        GetSolutionByIdService,
        CreateSolutionFieldSettingsService,
        DeleteSolutionService,
        CreateSolutionService
    ]
})
export class SolutionModule { }