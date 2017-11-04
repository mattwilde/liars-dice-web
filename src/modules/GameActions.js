
import Auth from './Auth';

class GameActions {
  constructor({matchId, socket}) {
    this.matchId = matchId;
    this.socket = socket;
  }

  socket = null

  onClickPass = () => {
    let data = { matchId: this.matchId, userId: Auth.getUser()._id };
    console.log('SOCKET EMIT TO SERVER:', 'player-action-pass', data);
    this.socket.emit('player-action-pass', data, (err) => {
      console.log(err);
    });
  }

  onClickBid = (bid) => {
    let data = { matchId: this.matchId, userId: Auth.getUser()._id, bid: bid };
    console.log('SOCKET EMIT TO SERVER:', 'player-action-bid', data);
    this.socket.emit('player-action-bid', data, (err) => {
      console.log(err);
    });
  }

}

export default GameActions;