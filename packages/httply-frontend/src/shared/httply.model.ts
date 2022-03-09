import type { HttplyRequest } from '@butopen/httply-model';

export interface HttplyInput {
  httpInput: string;
  request?: HttplyRequest;
  focused: boolean;
  autoplay: boolean;
}
