"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const json_infer_types_1 = require("@jsonhero/json-infer-types");
const globby_1 = require("globby");
const fs_extra_1 = __importDefault(require("fs-extra"));
const traverse_1 = __importDefault(require("traverse"));
const main = async () => {
    const files = await (0, globby_1.globby)(path_1.default.join(__dirname, "../exemplars/**/*.json"));
    console.log(`anonymizing ${files.length} files`);
    for (const file of files) {
        let json = await fs_extra_1.default.readJSON(file);
        json = (0, traverse_1.default)(json).map(function (value) {
            if (typeof value == "number") {
                return Math.round(value) == value ? 123 : 123.456;
            }
            else if (typeof value == "string") {
                const type = (0, json_infer_types_1.inferType)(value);
                if ("format" in type && type.format) {
                    switch (type.format.name) {
                        case "email": {
                            return "eallam@example.com";
                        }
                        case "date": {
                            return "2016-05-25";
                        }
                        case "datetime": {
                            return "2019-01-01 00:00:00.000Z";
                        }
                        case "uri": {
                            return "https://www.example.com/";
                        }
                        case "ip": {
                            return "192.168.0.1";
                        }
                    }
                }
                return "example string";
            }
            else {
                return value;
            }
        });
        await fs_extra_1.default.writeJSON(file, json, { spaces: 2 });
    }
    console.log("done");
};
void main();
