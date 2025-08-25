import {  Module } from "@nestjs/common";
import { QuerySolutionService } from "./query-solution/query-solution.service";
import { AddSolutionPriceService } from "./add-solution-price/add-solution-price.service";
import { UpdateSolutionService } from "./update-solution/update-solution.service";
import { RemoveSolutionPriceService } from "./remove-solution-price/remove-solution-price.service";

@Module({
    providers: [
        QuerySolutionService,
        AddSolutionPriceService,
        UpdateSolutionService,
        RemoveSolutionPriceService
    ],
    exports: [
        QuerySolutionService,
        AddSolutionPriceService,
        UpdateSolutionService,
        RemoveSolutionPriceService
    ]
})
export class SolutionModule { }