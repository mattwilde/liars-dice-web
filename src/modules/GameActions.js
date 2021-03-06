
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

  onClickBidAndReroll = (bid, diceShown) => {
    let data = { matchId: this.matchId, userId: Auth.getUser()._id, bid: bid, diceShown: diceShown };
    console.log('SOCKET EMIT TO SERVER:', 'player-action-bid-and-reroll', data);
    this.socket.emit('player-action-bid-and-reroll', data, (err) => {
      console.log(err);
    });
  }

  onClickChallengeBet = (bet) => {
    let data = { matchId: this.matchId, userId: Auth.getUser()._id, bet: bet };
    console.log('SOCKET EMIT TO SERVER:', 'player-action-challenge-bet', data);
    this.socket.emit('player-action-challenge-bet', data, (err) => {
      console.log(err);
    });
  }

}

export default GameActions;