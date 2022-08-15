export class Log {
    counterMessage(counter) {
        return counter ? `FOUND ${counter} USER ` : "Nothing found :(";
    }
}
