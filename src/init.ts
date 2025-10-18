/// @xml-init
import { Logm } from ".";

var LOG_CODE = 'Logm';

EnableLog(LOG_CODE, true);
try {
    RegisterCodeLibrary('./index.js');

    Logm.init();
    LogEvent(LOG_CODE, 'INFO:     Logm module registration success');
} catch (err) {
    LogEvent(LOG_CODE, 'ERROR:    Logm module registration failed: ' + err);
    alert('[Logm]  ERROR:     Logm module registration failed: ' + err);
}