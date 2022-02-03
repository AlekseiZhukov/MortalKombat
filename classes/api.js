

export class Api {


    getAllPlayers = async () => {

        return fetch('https://reactmarathon-api.herokuapp.com/api/mk/players').then(res => res.json())
    }

    getEnemyPlayers = async () => {
            return fetch('https://reactmarathon-api.herokuapp.com/api/mk/player/choose').then(res => res.json())
    }

    postHitPlayers = async (obj) => {

         return fetch('http://reactmarathon-api.herokuapp.com/api/mk/player/fight', {
             method: 'POST',
             body: JSON.stringify({
                 hit: obj.hit,
                 defence: obj.defence,
             })

         }).then(res => res.json())

    }
}

export default Api