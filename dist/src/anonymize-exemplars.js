"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const json_infer_types_1 = require("@jsonhero/json-infer-types");
const fs = __importStar(require("fs-extra"));
const globby_1 = require("globby");
const path_1 = __importDefault(require("path"));
const traverse_1 = __importDefault(require("traverse"));
const main = async () => {
    const files = await (0, globby_1.globby)(path_1.default.join(__dirname, "../exemplars/**/*.json"));
    console.log(`anonymizing ${files.length} files`);
    for (const file of files) {
        let json = await fs.readJSON(file);
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
        await fs.writeJSON(file, json, { spaces: 2 });
    }
    console.log("done");
};
void main();
