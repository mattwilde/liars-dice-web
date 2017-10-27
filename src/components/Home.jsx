import React from 'react';
import PropTypes from 'prop-types';
import { Card, CardTitle, CardText, CardActions } from 'material-ui/Card';
// import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

const styles = {
  raisedButton: {margin: 12},
};

const Home = ({ user, state, handlers }) => (
  <table align={"center"}>
    <tbody>
      <tr>
        <td>
          <Card className="container">
            <CardTitle
              title={`Welcome ${user}!`}
            />
            <CardText>
              {
                state.isFindingMatch ? state.lookingForMatchString.split('\n').map(function(line) {
                  return (
                    <span>{line}<br /></span>
                  )}
                ) : 'Bro, play some Liars Dice, breh.'
              }
            </CardText>
            {/* {secretData && <CardText style={{ fontSize: '16px', color: 'green' }}>{secretData}</CardText>} */}
          </Card>
        </td>
        <td>
          <Card className="container container-matchmaking">
            <CardTitle
              title="Matchmaking"
              subtitle="Get rekt."
            />
            <CardText>
              <SelectField align={"left"}
                floatingLabelText="Mode"
                value={state.modeValue}
                onChange={handlers.handleModeChange}
              >
                <MenuItem value={"casual"} primaryText="Casual" />
                <MenuItem value={"competetive"} primaryText="Competetive" />
              </SelectField>

              <SelectField align={"left"}
                floatingLabelText="Server"
                value={state.serverValue}
                onChange={handlers.handleServerChange}
              >
                <MenuItem value={"public"} primaryText="Public" />
                <MenuItem value={"private"} primaryText="Private" />
              </SelectField>
            </CardText>
            <CardActions>
              <RaisedButton label={state.isFindingMatch ? 'Cancel' : 'Find Match'} 
                onClick={state.isFindingMatch ?handlers.handleClickCancelMatch : handlers.handleClickFindMatch}
                primary={true} 
                style={styles.raisedButton} />
            </CardActions>
          </Card>
        </td>
      </tr>
    </tbody>
  </table>
);

Home.propTypes = {
  user: PropTypes.string.isRequired
};

export default Home;