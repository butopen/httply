import { HttplyRequest } from "@butopen/httply-model";

export interface HttplyGenerator {
  generate(request: HttplyRequest): string;
}
