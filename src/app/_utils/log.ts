import {LogConsole} from './log-console';
import {environment} from '../../environments/environment';

export class Log implements LogConsole {
    debug(primaryMessage: string, ...supportingData: any[]): void {
        if (environment.enTest) {
            this.emitLogMessage('debug', primaryMessage, supportingData);
        }
    }

    warn(primaryMessage: string, ...supportingData: any[]): void {
        if (environment.enTest) {
            this.emitLogMessage('warn', primaryMessage, supportingData);
        }
    }

    error(primaryMessage: string, ...supportingData: any[]): void {
        if (environment.enTest) {
            this.emitLogMessage('error', primaryMessage, supportingData);
        }
    }

    info(primaryMessage: string, ...supportingData: any[]): void {
        if (environment.enTest) {
            this.emitLogMessage('info', primaryMessage, supportingData);
        }
    }

    private emitLogMessage(msgType: 'debug' | 'info' | 'warn' | 'error', msg: string, supportDetails: any []) {
        if (supportDetails.length > 0) {
            console[msgType](msg, supportDetails);
        } else {
            console[msgType](msg);
        }
    }
}