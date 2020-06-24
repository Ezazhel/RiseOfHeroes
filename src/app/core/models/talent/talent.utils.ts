import { Talent } from "@core/models/talent/talent.model";
import { peasantTalentAdvance } from "./talent.data";

export const getDescription = (talent: Talent) =>
    peasantTalentAdvance // TODO : Modify when more classes
        .get(talent.id)
        .description(talent);

export const getEffect = (talent: Talent, statToUpdate: number) =>
    peasantTalentAdvance.get(talent.id).effect(talent, statToUpdate);
