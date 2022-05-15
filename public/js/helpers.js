class Helpers {
    static getRandomInt(max) {
        return Math.floor(Math.random() * max);
    }

    static getRandomFromArray(array) {
        return array[this.getRandomInt(array.length)];
    }
}