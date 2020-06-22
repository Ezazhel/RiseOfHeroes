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

type TooltipType = "equipment" | "spell" | "craft" | "rune";
@Directive({ selector: "[tooltip]" })
export class ToolTipDirective implements OnInit {
    @Input("tooltip") item:
        | ITemplateBaseItem
        | (Spells | OvertimeSpells | HealSpells)
        | Rune;
    @Input("tooltip-material") material: Currency[];
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
        >;
        switch (this.type) {
            case "spell":
                this.overlayRef.detach();
                tooltipRef = this.overlayRef.attach(
                    new ComponentPortal(SpellDetailComponent)
                );
                (tooltipRef.instance as SpellDetailComponent).item = this
                    .item as Spells;
                break;
            case "craft":
                this.overlayRef.detach();
                tooltipRef = this.overlayRef.attach(
                    new ComponentPortal(CraftDetailComponent)
                );
                (tooltipRef.instance as CraftDetailComponent).materials = this.material;
                (tooltipRef.instance as CraftDetailComponent).itemEquipped = this.itemEquipped;
                break;
            case "rune":
                this.overlayRef.detach();
                tooltipRef = this.overlayRef.attach(
                    new ComponentPortal(RunesComponent)
                );
                (tooltipRef.instance as RunesComponent).item = this
                    .item as Rune;
                break;
            default:
                // case "equipment":
                this.overlayRef.detach();
                tooltipRef = this.overlayRef.attach(
                    new ComponentPortal(SlotDetailComponent)
                );
                (tooltipRef.instance as SlotDetailComponent).itemEquipped = this.itemEquipped;
                (tooltipRef.instance as SlotDetailComponent).item = this
                    .item as ITemplateBaseItem;
                break;
        }
    }

    @HostListener("mouseleave")
    hide() {
        this.subscription.unsubscribe();
        this.overlayRef.detach();
    }
}
