
export class GenerateLogs {

    constructor({logs, $chat}) {

        this.text = ''
        this.el = ''
        this.date = new Date()
        this.$chat = $chat
        this.logs = logs

    }

    getRandom = (num) => Math.ceil(Math.random() * num);

    normalize = (num) => (num.toString().length > 1 ? num : `0${num}`);

    createLog = (type, {name: namePlayer1}, {name: namePlayer2, hp}, forceBlow=null) => {
        switch (type) {
            case 'start':
                this.text = this.logs['start'].replace('[time]', `${this.normalize(this.date.getHours())}:${this.normalize(this.date.getMinutes())}`)
                    .replace('[player1]', (namePlayer1).toUpperCase())
                    .replace('[player2]', (namePlayer2).toUpperCase());
                this.el = `<p>${this.text}</p>`;
                break

            case 'hit':
                this.text = this.logs['hit'][this.getRandom(this.logs['hit'].length - 1)]
                    .replace('[playerKick]', (namePlayer1).toUpperCase())
                    .replace('[playerDefence]', (namePlayer2).toUpperCase());
                this.el = `<p>${this.normalize(this.date.getHours())}:${this.normalize(this.date.getMinutes())} - ${this.text} -${forceBlow} [${hp}/100]</p>`;
                break

            case 'defence':
                this.text = this.logs['defence'][this.getRandom(this.logs['defence'].length - 1)]
                    .replace('[playerKick]', (namePlayer2).toUpperCase())
                    .replace('[playerDefence]', (namePlayer1).toUpperCase());
                this.el = `<p>${this.normalize(this.date.getHours())}:${this.normalize(this.date.getMinutes())} - ${this.text} </p>`;
                break

            case 'end':
                this.text = this.logs['end'][this.getRandom(this.logs['end'].length - 1)]
                    .replace('[playerWins]', (namePlayer1).toUpperCase())
                    .replace('[playerLose]', (namePlayer2).toUpperCase());
                this.el = `<p>${this.text}</p>`;
                break

            case 'draw':
                this.text = this.logs['draw'];
                this.el = `<p>${this.text}</p>`;
                break

            default:
                console.log('unexpected error');
                break
        }
        this.$chat.insertAdjacentHTML('afterbegin', this.el);
    }
}

export default GenerateLogs;