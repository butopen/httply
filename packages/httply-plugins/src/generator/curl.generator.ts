import { HttplyRequest } from "@butopen/httply-model";
import {HttplyGenerator} from "./generator";

export class CurlGenerator implements HttplyGenerator {



    generate(request: HttplyRequest): string {
        return "";
    }


}