import api from 'services/api.service';
import * as socketService from 'services/socket.service';

api.on('error', (error) => {
  if (error.status === 401) {
    // TODO: user sign out
  }
});

socketService.on('connect', () => {
  // TODO: get user
  const user = { _id: 'fakeId' };
  socketService.emit('subscribe', `user-${user._id}`);
});

socketService.on('user:updated', (user) => {
  // TODO: update user
});
