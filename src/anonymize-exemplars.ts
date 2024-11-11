import path from "path";
import { inferType } from "@jsonhero/json-infer-types";
import { globby } from "globby";
import fs from "fs-extra";
import traverse from "traverse";

const main = async () => {
  const files = await globby(path.join(__dirname, "../exemplars/**/*.json"));
  console.log(`anonymizing ${files.length} files`);
  for (const file of files) {
    let json = await fs.readJSON(file);

    json = traverse(json).map(function (value) {
      if (typeof value == "number") {
        return Math.round(value) == value ? 123 : 123.456;
      } else if (typeof value == "string") {
        const type = inferType(value);
        if ("format" in type && type.format) {
          switch (type.format.name) {
            case "email": {
              return "eallam@example.com";
            }
            case "date" as any: {
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
      } else {
        return value;
      }
    });

    await fs.writeJSON(file, json, { spaces: 2 });
  }

  console.log("done");
};

void main();
