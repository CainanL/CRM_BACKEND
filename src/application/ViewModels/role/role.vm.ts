import {Rule} from ".prisma/master-client";
export class RuleVm {
    id: string;
    name: string;
    
    constructor({id, name}: Rule){
        this.id = id;
        this.name = name;
    }
}