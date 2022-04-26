/* eslint-disable prettier/prettier */
import * as toml from "@iarna/toml";
import {Parser} from "json2csv";

export enum TypeFile {
    JSON = "JSON",
    CSV = "CSV",
    TOML = "TOML",
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const convertFiles = (data: any, typeFile: TypeFile = TypeFile.TOML): unknown | toml.JsonMap => {
    if(typeFile === TypeFile.JSON){
        return toml.parse(data);
    }
    if(typeFile === TypeFile.CSV){
        const parser = new Parser()
        return parser.parse(data)
    }
    return toml.stringify(data).replace(/\\/g, '').replace(/"\{/i, '{').replace(/\}"/i, '}');
};

export default convertFiles;
