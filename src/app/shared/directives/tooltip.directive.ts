import { SpellDetailComponent } from "./../../spellbook/components/spellbook-detail/spell-detail.component";
SpellDetailComponent;
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
import { InventorySlotDetailComponent } from "app/inventory/components";
import { ITemplateBaseItem } from "@core/models/game-data/game-data.model";
import {
    OvertimeSpells,
    Spells,
    HealSpells,
} from "@core/models/spells/spells.model";

type TooltipType = "equipment" | "spell";
@Directive({ selector: "[tooltip]" })
export class ToolTipDirective implements OnInit {
    @Input("tooltip") item:
        | ITemplateBaseItem
        | (Spells | OvertimeSpells | HealSpells);
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
            InventorySlotDetailComponent | SpellDetailComponent
        >;
        switch (this.type) {
            case "spell":
                tooltipRef = this.overlayRef.attach(
                    new ComponentPortal(SpellDetailComponent)
                );
                break;
            default:
                // case "equipment":
                tooltipRef = this.overlayRef.attach(
                    new ComponentPortal(InventorySlotDetailComponent)
                );
                break;
        }
        tooltipRef.instance.item = this.item;
    }

    @HostListener("mouseleave")
    hide() {
        this.subscription.unsubscribe();
        this.overlayRef.detach();
    }
}
