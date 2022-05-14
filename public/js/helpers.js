class Helpers {
    static getRandomInt(max) {
        return Math.floor(Math.random() * max);
    }

    static getRandomFromArray(array) {
        const randInt = this.getRandomInt(array.length);
        return array[randInt];
    }
}