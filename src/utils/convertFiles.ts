/* eslint-disable prettier/prettier */
import * as toml from "@iarna/toml";
import {Parser} from "json2csv";

export enum TypeFile {
    JSON = "JSON",
    CSV = "CSV",
    TOML = "TOML",
}

const convertFiles = (data: any, typeFile: TypeFile = TypeFile.TOML): string => {
    if(typeFile === TypeFile.JSON){
        return ""
    }
    if(typeFile === TypeFile.CSV){
        const parser = new Parser()
        return parser.parse(data)
    }
    return toml.stringify(data)
};

export default convertFiles;
