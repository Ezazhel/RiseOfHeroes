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

@Directive({ selector: "[tooltip]" })
export class ToolTipDirective implements OnInit {
    @Input("tooltip") item: ITemplateBaseItem;
    @Input("tooltip-detach") detach: EventEmitter<boolean> = new EventEmitter<
        boolean
    >();
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
        const tooltipRef: ComponentRef<InventorySlotDetailComponent> = this.overlayRef.attach(
            new ComponentPortal(InventorySlotDetailComponent)
        );
        tooltipRef.instance.item = this.item;
    }

    @HostListener("mouseleave")
    hide() {
        this.subscription.unsubscribe();
        this.overlayRef.detach();
    }
}
