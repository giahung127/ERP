import {
    MatSnackBar,
    MatSnackBarConfig,
    MatSnackBarHorizontalPosition,
    MatSnackBarVerticalPosition
} from '@angular/material/snack-bar';
import { AppInjector } from 'src/app/core/services/app-injector.service';

export class ToastService {
    static horizontalPosition: MatSnackBarHorizontalPosition = 'right';

    static verticalPosition: MatSnackBarVerticalPosition = 'top';

    static actionButtonLabel = 'Close';

    static action = true;

    static setAutoHide = true;

    static autoHide = 3000;

    static success(msg: string) {
        if (!msg || !msg.length) {
            return;
        }

        const config = new MatSnackBarConfig();
        config.verticalPosition = this.verticalPosition;
        config.horizontalPosition = this.horizontalPosition;
        config.duration = this.setAutoHide ? this.autoHide : 0;
        config.panelClass = ['toast-success', 'mat-snack-bar-container-custom'];
        const notifi = AppInjector.getService(MatSnackBar);
        notifi.open(msg, this.action ? this.actionButtonLabel : undefined, config);
    }

    static warning(msg: string, duration?: number) {
        if (!msg || !msg.length) {
            return;
        }

        const config = new MatSnackBarConfig();
        config.verticalPosition = this.verticalPosition;
        config.horizontalPosition = this.horizontalPosition;
        config.duration = duration || (this.setAutoHide ? this.autoHide : 0);
        config.panelClass = ['toast-warning', 'mat-snack-bar-container-custom'];
        const notifi = AppInjector.getService(MatSnackBar);
        notifi.open(msg, this.action ? this.actionButtonLabel : undefined, config);
    }

    static info(msg: string) {
        if (!msg || !msg.length) {
            return;
        }

        const config = new MatSnackBarConfig();
        config.verticalPosition = this.verticalPosition;
        config.horizontalPosition = this.horizontalPosition;
        config.duration = this.setAutoHide ? this.autoHide : 0;
        config.panelClass = ['toast-infor', 'mat-snack-bar-container-custom'];
        const notifi = AppInjector.getService(MatSnackBar);
        notifi.open(msg, this.action ? this.actionButtonLabel : undefined, config);
    }

    static error(msg: string) {
        if (!msg || !msg.length) {
            return;
        }

        const config = new MatSnackBarConfig();
        config.verticalPosition = this.verticalPosition;
        config.horizontalPosition = this.horizontalPosition;
        config.duration = 0;
        config.panelClass = ['toast-error', 'mat-snack-bar-container-custom'];
        const notifi = AppInjector.getService(MatSnackBar);
        notifi.open(msg, this.action ? this.actionButtonLabel : undefined, config);
    }
}
