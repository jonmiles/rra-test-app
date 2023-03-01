import {client} from './apollo';

export const libs = {
  apollo: client,
};

export type Libs = typeof libs;
