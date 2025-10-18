export namespace Logm {
    export type LogLevel = { name: string; value: number };

    type LoggerDoc = {
        TopElem: Logger;
    }

    export type Logger = {
        id: XmlElem<number>;
        code: XmlElem<string>;
        logLevel: XmlElem<string>;
        logLevelVal: XmlElem<number>;

        trace: (value: any) => void;
        debug: (value: any) => void;
        info : (value: any) => void;
        warn : (value: any) => void;
        error: (value: any) => void;
        fatal: (value: any) => void;

        log_message: (value: string, levelName: string, levelValue: number) => void;
    }

    export const TRACE = { name: "TRACE", value: 0 };
    export const DEBUG = { name: "DEBUG", value: 1 };
    export const INFO = { name: "INFO", value: 2 };
    export const WARN = { name: "WARN", value: 3 };
    export const ERROR = { name: "ERROR", value: 4 };
    export const FATAL = { name: "FATAL", value: 5 };

    let LOG_LEVEL: LogLevel | null = null;
    let ALERT_LEVEL: LogLevel | null = null;

    let __SRWLock: any = null;

    export function init(): void {
        __SRWLock = tools.get_srw_object("");
        LOG_LEVEL = TRACE;
        ALERT_LEVEL = WARN;
    }

    export function getLogger(logTag: string, logLevel?: LogLevel): Logger {
        if (logLevel === undefined) {
            logLevel = LOG_LEVEL!;
        }

        const loggerUniqueKey = Md5Hex(logTag + EncodeJson(logLevel))

        let logger = __SRWLock.GetOptProperty(loggerUniqueKey) as LoggerDoc | undefined;
        if (logger === undefined) {
            logger = OpenNewDoc<LoggerDoc>("./logger.xmd");

            logger.TopElem.code.Value = logTag;
            logger.TopElem.logLevel.Value = logLevel.name;
            logger.TopElem.logLevelVal.Value = logLevel.value;

            EnableLog(logTag, true);
            __SRWLock.SetProperty(loggerUniqueKey, logger);
        }

        return logger.TopElem;
    }
}