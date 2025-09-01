import { Injectable } from "@nestjs/common";
import { CreateInteractionRequest } from "../create-interaction/create-interaction.request";
import { CreateInteractionService } from "../create-interaction/create-interaction.service";
import { InteractionType } from "src/repos/enums/interaction-type.enum";
import { InteractionStatus } from "src/repos/enums/interaction-status.enum";
import { InteractionTag } from "src/repos/enums/interaction-tag.enum";
import { Priority } from "src/repos/enums/priority.enum";

export interface RecordInteractionData {
    clientId: string;
    interactionType: InteractionType;
    description: string;
    status: InteractionStatus;
    result: string;
    tags: InteractionTag[];
    duration?: number;
    followUpDate?: Date;
    priority?: Priority;
    cost?: number;
}

@Injectable()
export class RecordInteractionService {
    constructor(
        private readonly createInteractionService: CreateInteractionService
    ) { }

    /**
     * Registra uma interação de forma simplificada para uso interno
     */
    async recordInteraction(data: RecordInteractionData, req?: any): Promise<void> {
        const request: CreateInteractionRequest = {
            clientId: data.clientId,
            interactionType: data.interactionType,
            interactionDate: new Date().toISOString(),
            description: data.description,
            status: data.status,
            result: data.result,
            tags: data.tags,
            duration: data.duration,
            followUpDate: data.followUpDate?.toISOString(),
            priority: data.priority,
            cost: data.cost?.toString()
        };

        await this.createInteractionService.execute(request, req);
    }

    /**
     * Registra uma interação de email
     */
    async recordEmailInteraction(
        clientId: string,
        description: string,
        result: string,
        tags: InteractionTag[],
        req?: any
    ): Promise<void> {
        await this.recordInteraction({
            clientId,
            interactionType: InteractionType.EMAIL,
            description,
            status: InteractionStatus.SUCCESS,
            result,
            tags
        }, req);
    }

    /**
     * Registra uma interação de telefone
     */
    async recordPhoneCallInteraction(
        clientId: string,
        description: string,
        result: string,
        tags: InteractionTag[],
        duration: number,
        req?: any
    ): Promise<void> {
        await this.recordInteraction({
            clientId,
            interactionType: InteractionType.PHONE_CALL,
            description,
            status: InteractionStatus.SUCCESS,
            result,
            tags,
            duration
        }, req);
    }

    /**
     * Registra uma interação de reunião
     */
    async recordMeetingInteraction(
        clientId: string,
        description: string,
        result: string,
        tags: InteractionTag[],
        duration: number,
        followUpDate?: Date,
        req?: any
    ): Promise<void> {
        await this.recordInteraction({
            clientId,
            interactionType: InteractionType.MEETING,
            description,
            status: InteractionStatus.SUCCESS,
            result,
            tags,
            duration,
            followUpDate
        }, req);
    }

    /**
     * Registra uma interação de chat
     */
    async recordChatInteraction(
        clientId: string,
        description: string,
        result: string,
        tags: InteractionTag[],
        req?: any
    ): Promise<void> {
        await this.recordInteraction({
            clientId,
            interactionType: InteractionType.CHAT,
            description,
            status: InteractionStatus.SUCCESS,
            result,
            tags
        }, req);
    }
}
