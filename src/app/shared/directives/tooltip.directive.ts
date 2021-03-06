import { SpellDetailComponent } from "./../../spellbook/components/spellbook-detail/spell-detail.component";
import { Subscription } from "rxjs";
import {
    Directive,
    HostListener,
    OnInit,
    ComponentRef,
    Input,
    ElementRef,
    EventEmitter,
} from "@angular/core";
import {
    OverlayRef,
    Overlay,
    OverlayPositionBuilder,
} from "@angular/cdk/overlay";
import { ComponentPortal } from "@angular/cdk/portal";
import {
    ITemplateBaseItem,
    Currency,
    LootbagItem,
} from "@core/models/game-data/game-data.model";
import {
    OvertimeSpells,
    Spells,
    HealSpells,
} from "@core/models/spells/spells.model";
import { CraftDetailComponent } from "@shared/components/craftDetail/craft-detail.component";
import { SlotDetailComponent } from "@shared/components";
import { Rune } from "@core/models/runes/runes.model";
import { RunesComponent } from "@shared/components/runes/runes.component";
import { Talent } from "@core/models/talent/talent.model";
import { LootDetailComponent } from "@shared/components/lootDetail/lootDetail.component";

type TooltipType = "equipment" | "spell" | "craft" | "rune" | "lootbag";
@Directive({ selector: "[tooltip]" })
export class ToolTipDirective implements OnInit {
    @Input("tooltip") item:
        | ITemplateBaseItem
        | (Spells | OvertimeSpells | HealSpells)
        | Rune
        | LootbagItem[]
        | Talent;
    @Input("tooltip-material") material: Currency[];
    @Input("tooltip-isTalent") isTalent: boolean;
    @Input("tooltip-compare") compare: boolean = true;
    @Input("tooltip-equipped") itemEquipped: ITemplateBaseItem;
    @Input("tooltip-detach") detach: EventEmitter<boolean> = new EventEmitter<
        boolean
    >();
    @Input("tooltip-type") type: TooltipType = "equipment";
    private overlayRef: OverlayRef;
    private subscription: Subscription;

    constructor(
        private overlayPositionBuilder: OverlayPositionBuilder,
        private elementRef: ElementRef,
        private overlay: Overlay
    ) {}

    ngOnInit() {
        const positionStrategy = this.overlayPositionBuilder
            .flexibleConnectedTo(this.elementRef)
            .withPositions([
                {
                    originX: "center",
                    originY: "top",
                    overlayX: "center",
                    overlayY: "bottom",
                },
            ]);
        this.overlayRef = this.overlay.create({ positionStrategy });
    }
    @HostListener("mouseenter")
    show() {
        this.subscription = this.detach.subscribe((rtn: boolean) => {
            if (rtn) {
                this.overlayRef.detach();
                this.subscription.unsubscribe();
            }
        });
        let tooltipRef: ComponentRef<
            | SlotDetailComponent
            | SpellDetailComponent
            | CraftDetailComponent
            | RunesComponent
            | LootDetailComponent
        >;
        switch (this.type) {
            case "spell":
                tooltipRef = this.overlayRef.attach(
                    new ComponentPortal(SpellDetailComponent)
                );
                if (!this.isTalent) {
                    (tooltipRef.instance as SpellDetailComponent).spell = this
                        .item as Spells;
                } else {
                    (tooltipRef.instance as SpellDetailComponent).talent = this
                        .item as Talent;
                }
                (tooltipRef.instance as SpellDetailComponent).isTalent = this.isTalent;
                break;
            case "craft":
                tooltipRef = this.overlayRef.attach(
                    new ComponentPortal(CraftDetailComponent)
                );
                (tooltipRef.instance as CraftDetailComponent).materials = this.material;
                (tooltipRef.instance as CraftDetailComponent).itemEquipped = this.itemEquipped;
                break;
            case "rune":
                tooltipRef = this.overlayRef.attach(
                    new ComponentPortal(RunesComponent)
                );
                (tooltipRef.instance as RunesComponent).item = this
                    .item as Rune;
                break;
            case "lootbag":
                tooltipRef = this.overlayRef.attach(
                    new ComponentPortal(LootDetailComponent)
                );
                (tooltipRef.instance as LootDetailComponent).item = this
                    .item as LootbagItem[];
                break;
            default:
                // case "equipment":
                tooltipRef = this.overlayRef.attach(
                    new ComponentPortal(SlotDetailComponent)
                );
                (tooltipRef.instance as SlotDetailComponent).itemEquipped = this.itemEquipped;
                (tooltipRef.instance as SlotDetailComponent).item = this
                    .item as ITemplateBaseItem;
                (tooltipRef.instance as SlotDetailComponent).compare = this.compare;
                break;
        }
    }

    @HostListener("mouseleave")
    hide() {
        this.subscription.unsubscribe();
        this.overlayRef.detach();
    }
}
