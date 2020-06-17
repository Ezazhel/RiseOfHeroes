//Inspiration : https://codepen.io/botmirp/pen/KKwqXMv?editors=0110
//https://medium.com/angular-in-depth/how-to-get-started-with-canvas-animations-in-angular-2f797257e5b4
import {
    Component,
    OnInit,
    Input,
    ViewChild,
    ElementRef,
    NgZone,
    AfterViewInit,
    OnDestroy,
    Output,
    EventEmitter,
} from "@angular/core";
import {
    Spells,
    OvertimeSpells,
    HealSpells,
} from "@core/models/spells/spells.model";
import { toNumber } from "@ngneat/transloco";
import { of, Subscription } from "rxjs";
@Component({
    selector: "combat-spell-cooldown",
    templateUrl: "./combat-spell-cooldown.component.html",
    styleUrls: ["./combat-spell-cooldown.component.scss"],
})
export class CombatSpellCooldownComponent
    implements OnInit, AfterViewInit, OnDestroy {
    @Input() index: number;
    @Input() spell: Spells | OvertimeSpells | HealSpells;
    @Input() isSkill = true;
    @Output("rdy") spellReady = new EventEmitter<boolean>();
    @ViewChild("cooldown", { static: false }) canvas: ElementRef<
        HTMLCanvasElement
    >;
    private ctx: CanvasRenderingContext2D;

    @ViewChild("action") action: ElementRef<HTMLElement>;

    subscription: Subscription;

    constructor(private ngZone: NgZone) {}

    ngOnInit(): void {}
    ngAfterViewInit(): void {
        this.ctx = this.canvas.nativeElement.getContext("2d");
        this.subscription = of(this.spell).subscribe((s) => {
            if (this.isSkill) {
                if (s?.isInCooldown) {
                    const cooldown: Cooldown = new Cooldown(
                        this.ctx,
                        this.canvas.nativeElement,
                        this.spell,
                        this.action.nativeElement
                    );
                    this.ngZone.runOutsideAngular(() =>
                        cooldown.gaugeCooldown()
                    );
                } else {
                    this.spellReady.emit(true);
                    if (this.subscription != undefined)
                        this.subscription.unsubscribe();
                }
            } else {
                const cooldown: Cooldown = new Cooldown(
                    this.ctx,
                    this.canvas.nativeElement,
                    this.spell,
                    this.action.nativeElement,
                    this.isSkill
                );
                this.ngZone.runOutsideAngular(() => cooldown.gaugeCooldown());
            }
        });
    }
    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }
}
export class Cooldown {
    cd: number;
    timer: number;
    timerStart: number;

    constructor(
        private ctx: CanvasRenderingContext2D,
        private canvas: HTMLCanvasElement,
        private spell: Spells | OvertimeSpells | HealSpells,
        private element: HTMLElement,
        private isSkill = true
    ) {}

    clearCanvas() {
        this.ctx.setTransform(1, 0, 0, 1, 0, 0);
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    endCooldown() {
        this.clearCanvas();
        this.timer = null;

        var canvas = this.canvas;
        var ctx = this.canvas.getContext("2d");
        ctx.fillStyle = "rgba(253, 255, 173, 0.5)";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        window.setTimeout(function () {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
        }, 20);
    }
    gaugeCooldown() {
        if (!this.timer) {
            this.initiateCooldown();
        }
    }
    initiateCooldown() {
        this.cd = this.isSkill
            ? this.spell.cooldown * 1000
            : (this.spell as OvertimeSpells).duration * 1000;
        if (!this.timer) {
            this.timer = window.setTimeout(
                this.endCooldown.bind(this),
                this.cd
            );
            this.timerStart = new Date().getTime();
            this.runCooldown();
        }
    }

    runCooldown() {
        if (this.timer) {
            var timeElapsed = new Date().getTime() - this.timerStart;
            var timeElapsedPercentage = timeElapsed / this.cd;
            var degrees = 360 * timeElapsedPercentage;

            var canvas = this.canvas;
            var ctx = this.canvas.getContext("2d");
            var hypoteneuse = Math.sqrt(
                Math.pow(this.element.clientWidth, 2) +
                    Math.pow(this.element.clientHeight, 2)
            );
            ctx.setTransform(1, 0, 0, 1, 0, 0);
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            canvas.height = hypoteneuse;
            canvas.width = hypoteneuse;

            canvas.style.marginLeft = -hypoteneuse / 2 + "px";
            canvas.style.marginTop = -hypoteneuse / 2 + "px";

            ctx.fillStyle = "rgba(0, 0, 0, 0.5)";

            ctx.translate(canvas.width / 2, canvas.height / 2);
            ctx.rotate(-Math.PI / 2);

            ctx.beginPath();
            ctx.moveTo(0, 0);
            ctx.lineTo(
                (hypoteneuse / 2) * toNumber(Math.cos(0).toFixed(15)),
                (hypoteneuse / 2) * toNumber(Math.sin(0).toFixed(15))
            );
            ctx.lineWidth = 2;
            ctx.strokeStyle = "rgba(255, 255, 255, 0.9)";

            ctx.shadowColor = "rgba(255, 255, 255, 0.6)";
            ctx.shadowBlur = 10;

            ctx.stroke();
            ctx.moveTo(0, 0);
            ctx.lineTo(
                (hypoteneuse / 2) *
                    toNumber(Math.cos((degrees * Math.PI) / 180).toFixed(15)),
                (hypoteneuse / 2) *
                    toNumber(Math.sin((degrees * Math.PI) / 180).toFixed(15))
            );
            ctx.stroke();

            ctx.shadowColor = null;
            ctx.shadowBlur = null;

            ctx.arc(
                0,
                0,
                hypoteneuse / 2,
                (degrees * Math.PI) / 180,
                Math.PI * 2,
                false
            );
            ctx.fill();
            ctx.closePath();

            requestAnimationFrame(this.runCooldown.bind(this));
        }
    }
}
