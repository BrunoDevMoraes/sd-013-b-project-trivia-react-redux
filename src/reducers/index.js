import { combineReducers } from 'redux';
import user from './user';
import player from './player';
import game from './game';
import cronometer from './cronometer';

const reducer = combineReducers({ user, game, player, cronometer });

export default reducer;
